const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Terms of Service</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700">
            These Terms of Service govern your use of our website and services.
            By accessing or using our service, you agree to be bound by these
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700">
            You agree not to misuse the service or help anyone else do so. This
            includes not violating any laws, not spamming, and not trying to
            hack our systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Content</h2>
          <p className="text-gray-700">
            You retain ownership of any content you submit, but you grant us a
            license to use it to provide our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Changes to Terms</h2>
          <p className="text-gray-700">
            We may modify these terms at any time. We'll notify you of
            significant changes, but it's your responsibility to review them
            periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at
            support@example.com.
          </p>
        </section>

        <div className="pt-6 text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
