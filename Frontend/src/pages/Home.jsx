import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 10,000+ job seekers
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Ace Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                Interview
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Practice with AI-powered interviews, get instant feedback, and land your dream job with confidence. 
              <span className="text-yellow-300 font-semibold"> Join thousands of successful candidates!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/register" 
                className="group relative bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-8 py-3.5 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25"
              >
                <span className="relative z-10 flex items-center">
                  Get Started 
                  <span className="ml-2 text-xl group-hover:animate-bounce">🚀</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </Link>
              
              <Link 
                to="/interview" 
                className="group border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center">
                  Start Free 
                  <span className="ml-2 text-xl group-hover:animate-pulse">🎤</span>
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <span className="text-xl mr-2">⭐</span>
                <span className="font-semibold text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-2">👥</span>
                <span className="font-semibold text-sm">10,000+ Users</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-2">🏆</span>
                <span className="font-semibold text-sm">95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">InterviewPrep</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of interview preparation with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors text-sm">
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who landed their dream jobs
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600 text-sm">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Practice',
    description: 'Realistic interview simulations with intelligent feedback and scoring system that adapts to your skill level.'
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Monitor your improvement with detailed analytics, performance metrics, and personalized insights.'
  },
  {
    icon: '💼',
    title: 'Industry Specific',
    description: 'Tailored questions for tech, business, healthcare, finance, and 20+ other industries.'
  },
  {
    icon: '⚡',
    title: 'Instant Feedback',
    description: 'Get immediate, detailed feedback on your answers with suggestions for improvement.'
  },
  {
    icon: '🎯',
    title: 'Personalized Learning',
    description: 'AI-driven recommendations based on your performance and career goals.'
  },
  {
    icon: '📱',
    title: 'Mobile Ready',
    description: 'Practice anywhere, anytime with our responsive design and mobile app.'
  }
];

const testimonials = [
  {
    quote: "InterivePrep helped me land my dream job at Google! The AI feedback was incredibly detailed and helped me identify my weak areas. I went from failing interviews to getting multiple offers.",
    name: "Sarah Chen",
    role: "Software Engineer at Google"
  },
  {
    quote: "The practice sessions are so realistic! I felt completely prepared for my actual interviews. The progress tracking showed me exactly where I needed to improve.",
    name: "Michael Rodriguez",
    role: "Product Manager at Microsoft"
  },
  {
    quote: "As a career changer, I was nervous about technical interviews. InterviewPrep industry-specific questions and feedback gave me the confidence I needed to succeed.",
    name: "Emily Johnson",
    role: "Data Scientist at Amazon"
  },
  {
    quote: "The AI interviewer is incredibly smart and asks follow-up questions just like a real interviewer would. It's like having a personal interview coach available 24/7.",
    name: "David Kim",
    role: "Full Stack Developer at Netflix"
  }
];

export default Home;