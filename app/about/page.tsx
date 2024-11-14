import React from 'react';

const LearnMore = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-6 sm:p-12">
      {/* Header Section */}
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">You GO Church Community Identification</h1>
        <p className="text-lg text-gray-600">
          Building Connections, Tracking Attendance, and Growing Together
        </p>
      </header>

      {/* Why Identification Matters Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Why Identification Matters</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-500 text-2xl">💬</span>
            <p>With our identification system, we ensure that every member feels recognized and valued, helping build meaningful relationships within the You GO Church family.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 text-2xl">📅</span>
            <p>Regular attendance tracking allows us to reach out and support members who may need encouragement, ensuring that everyone feels they belong.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-purple-500 text-2xl">📢</span>
            <p>Stay connected with the community, whether you’re a new visitor or a long-standing member, and ensure that no one is left out.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="my-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
        <ol className="space-y-4 list-decimal list-inside text-gray-700">
          <li><strong>Register</strong>: Sign up at any of our Sunday services or through our online portal to get started.</li>
          <li><strong>Check-In at Services</strong>: Easily log your attendance weekly, helping us track growth and involvement.</li>
          <li><strong>Connect with Us</strong>: Receive occasional updates, event invitations, and support from our ministry team.</li>
        </ol>
      </section>

      {/* Benefits Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Benefits of Joining the Identification Program</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="text-pink-500 text-2xl">❤️</span>
            <p>Our pastors and ministry team can connect with you personally, offer prayers, and provide guidance.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-yellow-500 text-2xl">🎉</span>
            <p>Be the first to know about community events, volunteer opportunities, and social gatherings.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-indigo-500 text-2xl">🤗</span>
            <p>Enjoy the feeling of being a valued part of the You GO Church family.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">What Our Members Say</h2>
        <div className="space-y-6 text-gray-700">
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            “Joining the community identification program made me feel seen and supported in my faith journey.”
          </blockquote>
          <blockquote className="border-l-4 border-green-500 pl-4 italic">
            “The You GO Church feels more like family now. I always know what’s happening and feel like I belong.”
          </blockquote>
        </div>
      </section>

      {/* Footer CTA Section */}
      <footer className="my-12 text-center">
        <h3 className="text-2xl font-semibold mb-2">Ready to Become Part of the You GO Family?</h3>
        <p className="text-gray-600 mb-6">Join us today and experience the power of community.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Learn More About Joining
        </button>
      </footer>
    </div>
  );
};

export default LearnMore;
