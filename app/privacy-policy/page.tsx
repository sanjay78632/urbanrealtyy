export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="text-sm text-muted-foreground">
        UrbanRealtyy values your privacy. This Privacy Policy explains how we
        collect, use, and protect your information.
      </p>

      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold">Information We Collect</h3>
          <p className="text-muted-foreground">
            We may collect your name, phone number, and email address when you
            contact us or submit inquiries.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">How We Use Your Information</h3>
          <p className="text-muted-foreground">
            Information is used only to respond to inquiries, schedule visits,
            and improve our services. We do not sell your data.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Data Security</h3>
          <p className="text-muted-foreground">
            We take reasonable measures to protect your information but cannot
            guarantee absolute security.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Third-Party Links</h3>
          <p className="text-muted-foreground">
            Our website may contain links to third-party sites. We are not
            responsible for their privacy practices.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Updates</h3>
          <p className="text-muted-foreground">
            This policy may be updated occasionally. Continued use of the
            website means acceptance of changes.
          </p>
        </div>
      </div>
    </div>
  );
}
