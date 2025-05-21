import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "SolJournal has transformed how I document my life. Knowing my personal thoughts are secure and immutable gives me incredible peace of mind.",
    author: "Alex Rivera",
    role: "Tech Entrepreneur",
    rating: 5
  },
  {
    quote: "As someone who's journaled for decades, moving to blockchain feels like the natural evolution. SolJournal makes the tech invisible while providing all the benefits.",
    author: "Sophia Chen",
    role: "Author & Educator",
    rating: 5
  },
  {
    quote: "I love that I can access my journal from anywhere, knowing it's encrypted and secure. The Solana integration is seamless and fast.",
    author: "Marcus Johnson",
    role: "Digital Nomad",
    rating: 4
  },
  {
    quote: "Finally, a journaling platform that respects privacy and ownership. My memories belong to me, not a corporation's database.",
    author: "Emma Thompson",
    role: "Privacy Advocate",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className=" max-w-2xl mx-auto">
            Join thousands of writers and thinkers who trust SolJournal with their most valuable thoughts.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="rounded-2xl shadow-md p-8 md:p-10">
                    <div className="flex text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={20}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                          className={i < testimonial.rating ? "text-yellow-400" : "text-slate-300"}
                        />
                      ))}
                    </div>
                    <blockquote className=" text-lg md:text-xl italic mb-6">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold ">{testimonial.author}</p>
                        <p className=" text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-5 bg-white rounded-full p-2 shadow-md hover:bg-purple-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-purple-600" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 md:translate-x-5 bg-white rounded-full p-2 shadow-md hover:bg-purple-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-purple-600" />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-purple-600' : 'bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;