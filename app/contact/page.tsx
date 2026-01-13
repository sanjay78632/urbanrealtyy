export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-10 md:grid-cols-2 items-start">
        {/* LEFT: CONTACT DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold text-rose-600 mb-4">
            Contact Us
          </h1>

          <p className="mb-4 text-gray-700">
            Questions? Feedback? We want to hear from you!
          </p>

          <p className="mb-6 text-gray-700">
            If you have any questions, concerns, or would like to reach out to
            us, please feel free to use the following contact details:
          </p>

          <div className="space-y-3 text-gray-800">
            <p>
              <strong className="text-rose-600">Email:</strong>{" "}
              deepakurbanrealty@gmail.com
            </p>

            <p>
              <strong className="text-rose-600">Phone:</strong>{" "}
              7990900080
            </p>

            <p className="leading-relaxed">
  <strong className="text-rose-600">Office Location:</strong>{" "}
  Ahmedabad<br />
  <span className="text-sm text-gray-600">
    We currently operate on-site and by appointment only.
  </span>
</p>

          </div>

          <p className="mt-6 text-gray-700">
            We value your feedback and inquiries, and we’ll do our best to
            respond promptly.
          </p>
        </div>

        {/* RIGHT: MAP */}
        <div className="w-full h-[360px] rounded-xl overflow-hidden border">
          <iframe
            title="UrbanRealtyy Location"
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
