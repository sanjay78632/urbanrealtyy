export default function FAQsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Help & FAQs</h1>

      <div className="space-y-6 text-muted-foreground">
        <div>
          <h3 className="font-semibold text-black">
            How can I book a site visit?
          </h3>
          <p>
            You can book a site visit directly via the WhatsApp button or by
            contacting us through the Contact page.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-black">
            Do you charge any brokerage?
          </h3>
          <p>
            No. UrbanRealtyy follows a zero-brokerage model for most listings.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-black">
            Are the listings verified?
          </h3>
          <p>
            Yes, all properties listed on UrbanRealtyy are verified by our team
            before publishing.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-black">
            Which cities do you operate in?
          </h3>
          <p>
            Currently, we operate in Ahmedabad and nearby cities. More locations
            will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
}
