const ServicesSection = () => {
  const services = [
    {
      title: "Home Cleaning",
      description: "Thorough cleaning for your living spaces",
    },
    {
      title: "Office Cleaning",
      description: "Clean and fresh workplaces every day",
    },
    {
      title: "Move-in/Move-out",
      description: "Stress-free transitions with our deep clean",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
