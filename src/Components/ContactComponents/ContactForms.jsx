import React from "react";

export default function ContactMap() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 rounded-xl overflow-hidden shadow-lg">
        {/* Map Section */}
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8470152289816!2d85.31245207505564!3d27.717245982798225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1907e0327b41%3A0x6f5f0e8ee0f1b028!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="500"
          className="border-0 w-full rounded-lg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}