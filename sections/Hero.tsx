export const Hero = () => {
    return (
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Your Subjects with <span className="text-blue-600">StudyHub</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access personalized study tools, upload your notes, and learn more efficiently—all in one place.
          </p>
  
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/nav"    
              className="bg-black text-white px-6  py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition"
            >
              Get Started
            </a>
            <a
              href="https://quizlet.com" 
              className="border border-black text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    );
  };
  