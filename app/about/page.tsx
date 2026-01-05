export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">About Us</h1>

      <p className="mb-6 text-gray-700">
        UrbanRealtyy is not just a real estate service — we are your trusted
        property partners, focused on helping you find the right property at the
        right price with complete transparency.
      </p>

      <p className="mb-10 text-gray-700">
        We deal in residential and commercial properties, including buying,
        selling, and renting. Whether you’re a first-time buyer, an investor, or
        someone looking for a perfect home, we make the process simple, fast, and
        stress-free.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">
          Our Mission
        </h2>
        <p className="text-gray-700">
          To provide honest, transparent, and customer-focused real estate
          solutions, helping clients make confident property decisions with
          complete peace of mind.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">
          Our Vision
        </h2>
        <p className="text-gray-700">
          To become a reliable and trusted real estate brand, known for ethical
          dealings, real-time support, and long-term client relationships.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">
          Our Commitment
        </h2>

        <ul className="space-y-4 text-gray-700">
          <li>
            <strong>⏱ Timely Service</strong>
            <p>
              We understand the value of time in real estate. Every inquiry and
              site visit is handled promptly.
            </p>
          </li>

          <li>
            <strong>🤝 Customer First</strong>
            <p>
              Your requirements come first. We listen carefully and suggest
              properties that truly match your needs and budget.
            </p>
          </li>

          <li>
            <strong>🔑 End-to-End Support</strong>
            <p>
              From property search to final documentation, we support you at
              every step with clarity and honesty.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-red-600">
          Meet Our Team
        </h2>
        <p className="text-gray-700">
          Founder – UrbanRealtyy
        </p>
      </section>
    </main>
  );
}
