import React from 'react';
import { Section } from './ui/Section';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "AlumniOne transformed how we engage with our graduates. Event attendance is up 40% and donations via bKash have doubled in just six months.",
      author: "Farhana Ahmed",
      role: "Director of Alumni Relations",
      institution: "BRAC University",
      image: "https://picsum.photos/seed/farhana/100/100"
    },
    {
      quote: "Finally, a platform that understands the local context. Our alumni actually love logging in and connecting with each other.",
      author: "Tanvir Hasan",
      role: "President",
      institution: "Dhaka College Alumni Association",
      image: "https://picsum.photos/seed/tanvir/100/100"
    },
    {
      quote: "The support team is incredible, and the platform is so intuitive. We launched our portal in less than a week.",
      author: "Dr. Rafiqul Islam",
      role: "Dean of Student Affairs",
      institution: "Independent University, Bangladesh",
      image: "https://picsum.photos/seed/rafiqul/100/100"
    }
  ];

  return (
    <Section background="white" id="testimonials">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Loved by Alumni Managers
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="flex gap-1 mb-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
            <div className="flex items-center gap-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.author} 
                className="w-12 h-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
                <p className="text-xs text-blue-600 font-medium">{testimonial.institution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
