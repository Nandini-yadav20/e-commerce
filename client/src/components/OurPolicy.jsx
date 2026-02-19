import React from "react";

const OurPolicy = () => {
  const policies = [
    {
      title: "Premium Quality",
      description:
        "Every product is crafted using high-quality fabrics and strict quality control to ensure durability and comfort.",
    },
    {
      title: "Free Shipping",
      description:
        "Enjoy complimentary shipping on all orders above ₹999 with reliable and fast delivery services.",
    },
    {
      title: "Easy Returns",
      description:
        "Not satisfied? Return or exchange your order within 7 days with our hassle-free return policy.",
    },
    {
      title: "Secure Payments",
      description:
        "All transactions are protected with advanced encryption ensuring safe and secure payments.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Our Commitment to You
        </h2>
        <p className="mt-4 text-gray-600">
          We prioritize quality, reliability, and customer satisfaction in
          every order you place with us.
        </p>
      </div>

      {/* Policies Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {policy.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {policy.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default OurPolicy;
