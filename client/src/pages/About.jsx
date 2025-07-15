import React from 'react';

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6">
          About <span className="text-amber-500">ELARIA</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          <strong className="text-black">ELARIA</strong> is a mental wellness platform built for those navigating difficult emotional landscapes —
          whether it's anxiety, depression, or suicidal thoughts. At its heart, Amiro is a safe haven,
          where empathy and human connection meet technology.
        </p>

        <div className="mt-10 text-left space-y-6 text-gray-800">
          <div>
            <h3 className="text-2xl font-semibold text-black mb-2">🌱 What We Offer</h3>
            <ul className="list-disc list-inside text-lg space-y-1">
              <li>💬 <strong>Real-time chat</strong> with compassionate listeners and mental health allies</li>
              <li>📈 <strong>Mood tracking</strong> to help you understand your emotional patterns</li>
              <li>🚨 <strong>SOS button</strong> for emergency outreach to trusted contacts</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-black mb-2">🤝 Our Mission</h3>
            <p className="text-lg">
              To bridge the gap between <strong>peer support</strong> and <strong>professional care</strong> through compassion, anonymity,
              and proactive tools for emotional safety.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-black mb-2">💖 Our Values</h3>
            <ul className="list-disc list-inside text-lg space-y-1">
              <li><strong>Anonymity</strong> – feel safe being yourself</li>
              <li><strong>Empathy</strong> – every voice matters</li>
              <li><strong>Support</strong> – you're never alone in this</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-lg text-gray-600 italic">
          Amiro is more than a platform — it's your personal safe space to breathe, talk, and heal.
        </p>
      </div>
    </section>
  );
};

export default About;
