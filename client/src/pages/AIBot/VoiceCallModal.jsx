import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../utils/api';

const OPENING_LINE =
  "Hello! What are you feeling like today? I'm here to listen — take your time.";

const OPENING_LINE_HI =
  'नमस्ते! आज आप कैसा महसूस कर रहे हैं? मैं सुनने के लिए यहाँ हूँ — अपनी गति से बात कीजिए।';

const SWITCH_TO_EN_LINE =
  "Let's continue in English. What's on your mind? I'm listening.";

function speakText(text, lang = 'en') {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
      const preferred =
        voices.find((v) => /^hi/i.test(v.lang)) ||
        voices.find((v) => v.lang.toLowerCase().includes('hi'));
      if (preferred) utterance.voice = preferred;
    } else {
      const preferred =
        voices.find((v) => /en-GB|en-US/.test(v.lang) && v.name.toLowerCase().includes('female')) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (preferred) utterance.voice = preferred;
    }
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

const VoiceCallModal = ({ isOpen, onClose, topic }) => {
  const [phase, setPhase] = useState('idle');
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState('');
  const [videoOn, setVideoOn] = useState(false);
  const [voiceUiLang, setVoiceUiLang] = useState('en');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const activeRef = useRef(false);
  const noSpeechRetriesRef = useRef(0);
  const voiceLangRef = useRef('en');
  const switchVoiceLangRef = useRef(null);
  /** Web Speech API Hindi locale: retry with `hi` if `hi-IN` is unsupported */
  const hiRecognitionLocaleRef = useRef('hi-IN');

  const cleanupMedia = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setVideoOn(false);
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const stopVoice = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    try {
      recognitionRef.current?.abort?.();
    } catch {
      /* ignore */
    }
    recognitionRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    activeRef.current = true;
    voiceLangRef.current = 'en';
    hiRecognitionLocaleRef.current = 'hi-IN';
    setVoiceUiLang('en');
    setError(null);
    setCaption('');
    setVideoOn(false);
    noSpeechRetriesRef.current = 0;

    navigator.mediaDevices
      ?.getUserMedia?.({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => {
        if (!activeRef.current) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        setVideoOn(true);
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => {
        /* optional preview */
      });

    let cancelled = false;

    const processUserMessage = async (message) => {
      if (cancelled || !activeRef.current) return;
      setPhase('thinking');
      try {
        const res = await axios.post('/ai/text', {
          message,
          topic,
          language: voiceLangRef.current === 'hi' ? 'hi' : 'en',
        });
        const reply = res.data?.reply || 'I am here with you. Could you say that once more?';
        if (cancelled || !activeRef.current) return;
        setCaption(`Elaria: ${reply}`);
        setPhase('elaria_speaking');
        const speakLang = voiceLangRef.current === 'hi' ? 'hi' : 'en';
        await speakText(reply, speakLang);
        if (!cancelled && activeRef.current) {
          window.setTimeout(() => {
            if (!cancelled && activeRef.current) listenForUser();
          }, 500);
        }
      } catch (err) {
        const serverMsg = err.response?.data?.error;
        const fallback =
          typeof serverMsg === 'string'
            ? serverMsg
            : 'Something went wrong. Please try again in a moment.';
        if (cancelled || !activeRef.current) return;
        setCaption(`Elaria: ${fallback}`);
        setPhase('elaria_speaking');
        const speakLang = voiceLangRef.current === 'hi' ? 'hi' : 'en';
        await speakText(fallback, speakLang);
        if (!cancelled && activeRef.current) {
          window.setTimeout(() => {
            if (!cancelled && activeRef.current) listenForUser();
          }, 500);
        }
      }
    };

    const listenForUser = () => {
      const Recognition = getSpeechRecognition();
      if (!Recognition) {
        setError('Voice input works best in Chrome or Edge.');
        setPhase('idle');
        return;
      }

      if (!activeRef.current || cancelled) return;

      if (noSpeechRetriesRef.current > 8) {
        setCaption("I didn't catch that. You can try again or use the chat below.");
        setPhase('idle');
        return;
      }

      setPhase('listening');
      setCaption('');

      try {
        recognitionRef.current?.abort?.();
      } catch {
        /* ignore */
      }

      const rec = new Recognition();
      const isHi = voiceLangRef.current === 'hi';
      rec.lang = isHi ? hiRecognitionLocaleRef.current : 'en-US';
      rec.interimResults = false;
      // Hindi often needs continuous mode so short pauses inside a sentence are not cut off early
      rec.continuous = isHi;
      recognitionRef.current = rec;

      let handledFinal = false;
      rec.onresult = (event) => {
        if (handledFinal || !activeRef.current || cancelled) return;
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          if (event.results[i].isFinal) {
            text = event.results[i][0]?.transcript?.trim() || '';
            if (text) break;
          }
        }
        if (!text) return;
        handledFinal = true;
        noSpeechRetriesRef.current = 0;
        try {
          rec.stop();
        } catch {
          /* ignore */
        }
        setCaption(`You: ${text}`);
        processUserMessage(text);
      };

      rec.onerror = (e) => {
        if (e.error === 'language-not-supported' && isHi) {
          if (hiRecognitionLocaleRef.current === 'hi-IN') {
            hiRecognitionLocaleRef.current = 'hi';
            if (activeRef.current && !cancelled) {
              window.setTimeout(() => listenForUser(), 400);
            }
            return;
          }
          setError(
            'This browser does not support Hindi speech recognition. Try Chrome on desktop, or switch to English to speak.',
          );
          setPhase('idle');
          return;
        }
        if (e.error === 'no-speech') {
          noSpeechRetriesRef.current += 1;
          if (activeRef.current && !cancelled) {
            window.setTimeout(() => listenForUser(), 600);
          }
        } else if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          setError('Microphone access is needed to talk with Elaria.');
          setPhase('idle');
        } else if (e.error !== 'aborted' && activeRef.current && !cancelled) {
          window.setTimeout(() => listenForUser(), 800);
        }
      };

      try {
        rec.start();
      } catch {
        setTimeout(() => {
          if (activeRef.current && !cancelled) listenForUser();
        }, 500);
      }
    };

    const listenForUserOuter = listenForUser;
    switchVoiceLangRef.current = async (nextLang) => {
      if (!activeRef.current || cancelled) return;
      voiceLangRef.current = nextLang;
      setVoiceUiLang(nextLang);
      stopVoice();
      try {
        recognitionRef.current?.abort?.();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
      noSpeechRetriesRef.current = 0;
      hiRecognitionLocaleRef.current = 'hi-IN';
      setError(null);
      setCaption('');
      setPhase('elaria_speaking');
      const line =
        nextLang === 'hi' ? OPENING_LINE_HI : SWITCH_TO_EN_LINE;
      setCaption(`Elaria: ${line}`);
      await speakText(line, nextLang);
      if (!cancelled && activeRef.current) {
        window.setTimeout(() => {
          if (!cancelled && activeRef.current) listenForUserOuter();
        }, 500);
      }
    };

    (async () => {
      setPhase('elaria_speaking');
      await speakText(OPENING_LINE, 'en');
      if (!cancelled && activeRef.current) {
        window.setTimeout(() => {
          if (!cancelled && activeRef.current) listenForUser();
        }, 500);
      }
    })();

    return () => {
      switchVoiceLangRef.current = null;
      cancelled = true;
      activeRef.current = false;
      stopVoice();
      cleanupMedia();
      setPhase('idle');
      setCaption('');
    };
  }, [isOpen, topic, cleanupMedia, stopVoice]);

  if (!isOpen) return null;

  const statusLabel =
    phase === 'elaria_speaking'
      ? 'Elaria is speaking…'
      : phase === 'listening'
        ? 'Listening…'
        : phase === 'thinking'
          ? 'Elaria is thinking…'
          : 'Voice call';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-call-title"
    >
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900 text-white">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <h2 id="voice-call-title" className="text-sm font-semibold tracking-tight">
              Voice call with Elaria
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const next = voiceUiLang === 'hi' ? 'en' : 'hi';
                switchVoiceLangRef.current?.(next);
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors border ${
                voiceUiLang === 'hi'
                  ? 'bg-emerald-600/90 border-emerald-500 text-white'
                  : 'text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white'
              }`}
              aria-pressed={voiceUiLang === 'hi'}
              aria-label={voiceUiLang === 'hi' ? 'Switch voice to English' : 'Talk in Hindi'}
            >
              Hindi
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              End call
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-gray-700 p-px">
          <div
            className={`relative aspect-[4/3] bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-900 flex flex-col items-center justify-center p-4 ${
              phase === 'elaria_speaking' ? 'ring-2 ring-emerald-400/80 ring-inset' : ''
            }`}
          >
            <div
              className={`w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 ${
                phase === 'elaria_speaking' ? 'animate-pulse scale-105' : ''
              } transition-transform duration-300`}
            >
              <span className="text-4xl" aria-hidden>
                🌸
              </span>
            </div>
            <p className="mt-3 text-xs font-medium text-white/90 text-center">Elaria AI</p>
          </div>

          <div className="relative aspect-[4/3] bg-gray-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] ${videoOn ? 'opacity-100' : 'opacity-0'}`}
            />
            {!videoOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                <p className="text-xs text-gray-500">Camera optional</p>
              </div>
            )}
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-white/80 drop-shadow-md z-10">
              You
            </p>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 space-y-2">
          <p className="text-xs uppercase tracking-wider text-emerald-400/90 font-semibold">
            {statusLabel}
          </p>
          {error && <p className="text-sm text-amber-300">{error}</p>}
          {caption && !error && (
            <p className="text-sm text-gray-200 leading-snug line-clamp-4">{caption}</p>
          )}
          <p className="text-xs text-gray-500">
            Allow the microphone when your browser asks. Elaria will reply after you speak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallModal;
