import Image from "next/image";

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

      {/* Mission */}
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

      {/* Vision */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">
          Our Vision
        </h2>
        <p className="text-gray-700">
          To become a reliable and trusted real estate brand, known for ethical
          dealings, real-time support, and long-term client relationships.
        </p>
      </section>

      {/* Commitment */}
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

      {/* Founder */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 flex justify-center">
          <Image
            src="/founder.jpg"
            alt="Founder - UrbanRealtyy"
            width={280}
            height={360}
            className="rounded-xl object-cover shadow-md"
            priority
          />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">
            Meet the Founder
          </h2>
          <p className="text-gray-700 mb-2 font-medium">
            Founder – UrbanRealtyy
          </p>
          <p className="text-gray-700">
            With a strong understanding of the real estate market and a
            customer-first mindset, UrbanRealtyy was founded with a clear goal —
            to make property buying, selling, and renting simple, transparent,
            and trustworthy for everyone.
          </p>
        </div>
      </section>
    </main>
  );
}
