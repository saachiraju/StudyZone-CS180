export default function ClassesPage() {
    const classes = ['Math', 'Science', 'History', 'English', 'Computer Science', 'Biology', 'Physics'];
  
    return (
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose a Class</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Select a subject to explore learning tools and resources tailored to that topic.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {classes.map((subject) => (
              <a
                key={subject}
                href={`/classes/${subject.toLowerCase().replace(/\s+/g, '-')}`}
                className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg hover:border-blue-500 transition text-lg font-medium"
              >
                {subject}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
  