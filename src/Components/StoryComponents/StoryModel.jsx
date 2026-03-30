import React, { useState, useEffect } from "react";

// Single Story Modal with next/prev functionality
function StoryModal({ stories, currentIndex, isOpen, onClose, setCurrentIndex }) {
  const story = stories[currentIndex];
  const [progress, setProgress] = useState(0);

  // Auto-progress
  useEffect(() => {
    if (!isOpen) return;
    setProgress(0); // reset progress on story change
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1; // adjust speed here
      });
    }, 50); // ~5s for full progress

    return () => clearInterval(interval);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose(); // close if last story
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-4 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full mb-3">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Story Image */}
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />

        {/* Story Title & Message */}
        <h2 className="text-xl font-bold mb-2">{story.title}</h2>
        <p className="text-gray-700">{story.message}</p>

        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
          >
            &#8592;
          </button>
        )}
        {currentIndex < stories.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
          >
            &#8594;
          </button>
        )}
      </div>
    </div>
  );
}

// Main Story Component
export default function StoryModel() {
  const stories = [
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openStory = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeStory = () => {
    setIsOpen(false);
  };

  return (
    <div className="py-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-center">हामीले लेखेका स्टोरीहरू</h2>

      {/* Stories Horizontal Scroll */}
      <div className="flex space-x-4 overflow-x-auto px-4 py-2">
        {stories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => openStory(index)}
            className="flex-shrink-0 w-20 h-20 rounded-full border-4 border-blue-500 cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-110"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Story Modal */}
      <StoryModal
        stories={stories}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isOpen}
        onClose={closeStory}
      />
    </div>
  );
}