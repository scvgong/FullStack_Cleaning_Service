const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      comment: "Amazing service! My house has never looked better.",
    },
    {
      name: "John Smith",
      comment: "Friendly staff and super professional cleaning.",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Clients Say
      </h2>
      <div className="grid md:grid-cols-2 gap-6 px-4 max-w-4xl mx-auto">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic">"{t.comment}"</p>
            <p className="mt-2 font-semibold text-right">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
