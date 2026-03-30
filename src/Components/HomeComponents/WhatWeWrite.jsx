import React from "react";

export default function WhatWeWrite() {
  const nepaliStories = [
    {
      id: 1,
      title: "प्रधानमन्त्री बालेन्द्र शाह",
      message: "बालेन्द्र ‘बालेन’ शाह ३५ वर्षका उमेरमा नेपालको प्रधानमन्त्री बनेका छन्।",
      image: "/images/images.jpg",
    },
    {
      id: 2,
      title: "सत्ता परिवर्तन",
      message: "रास्ट्रिय स्वातन्त्र पार्टीले विशाल बहुमत पाउँदै सरकार गठन गर्‍यो।",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "स्वास्थ्य योजना",
      message: "नयाँ सरकारले राष्ट्रिय स्वास्थ्य कार्यक्रम विस्तार गर्ने घोषणा गर्‍यो।",
      image: "https://images.pexels.com/photos/433267/pexels-photo-433267.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      title: "खेलकुद समाचार",
      message: "नेपाली टीमले अन्तर्राष्ट्रिय खेलमा उत्कृष्ट प्रदर्शन गर्‍यो।",
      image: "https://images.pexels.com/photos/3991877/pexels-photo-3991877.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      title: "सहर अपडेट",
      message: "काठमाण्डौमा ट्राफिक व्यवस्थापन सुधारका लागि नयाँ योजना लागु।",
      image: "https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          हामीले लेखेका समाचार
        </h2>

        {/* Carousel Container */}
        <div className="overflow-hidden relative">
          <div className="flex animate-slide space-x-6">
            {nepaliStories.concat(nepaliStories).map((story, index) => (
              <div
                key={index}
                className="relative min-w-[270px] md:min-w-[320px] h-72 rounded-xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-110 hover:shadow-3xl hover:brightness-110 group"
              >
                {/* Image with fade overlay */}
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-opacity duration-1000 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-50"></div>
                
                {/* Text */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">{story.title}</h3>
                  <p className="text-sm drop-shadow-lg">{story.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 25s linear infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}