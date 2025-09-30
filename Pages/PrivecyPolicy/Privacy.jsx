import React from 'react';
import { FaHome } from 'react-icons/fa';
import CommonBanner from '../../components/CommonBanner';

const Privacy = () => {
  return (
    <main>
      <CommonBanner backgroundImage={'/privacy-policy.jpg'} breadcrumb={'privecy'}></CommonBanner>

      {/* Main content section for the Privacy policy */}
      <section className="py-6 lg:py-10 bg-white px-4 lg:px-2">
        <div className="max-w-6xl mx-auto">
          <div className="prose lg:prose-lg max-w-none text-gray-700 py-6">

            {/* Section 1: Privacy */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                1. Privacy
              </h2>
              <p className="leading-relaxed text-gray-500">
                1.1. We will always keep your data safe and secure. So, you are clued up; here is why we need your data and how we will use it.
              </p>
            </div>

            {/* Section 2: Protecting your privacy */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                2. Protecting your privacy
              </h2>
              <p className="leading-relaxed text-gray-500">
                2.1. AA Sourcing LTD, we are 100% committed to protecting the privacy and security of our customers and site visitors. The AA Sourcing LTD team is aware of how critical your privacy is. If you have any questions about how we protect your privacy, drop us a line at contact@aasourcingltd.com.
              </p>
              <p className="leading-relaxed text-gray-500">
                2.2. For all our services, the data controller —the company responsible for your privacy —is AA Sourcing LTD.
              </p>
            </div>

            {/* Section 3: Navigating this page */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                3. Navigating this page
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Our legal basis for processing your personal information;</li>
                <li>What sorts of personal information do we hold;</li>
                <li>How we would like to use your information;</li>
                <li>Sharing your information;</li>
                <li>Your Rights;</li>
                <li>How we protect your privacy;</li>
                <li>How to contact us</li>
              </ol>
            </div>

            {/* Section 4: Legal basis */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                4. Legal basis
              </h2>
              <p className="leading-relaxed text-gray-500">
                Whenever we process your personal information, we have to have something called a "legal basis" for what we do. The different legal bases we rely on are:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Consent: You have told us you are happy for us to process your personal information for a specific purpose(s)</li>
                <li>Legitimate interests: Processing is necessary to conduct our business, but not where your interests or rights override our interests.</li>
                <li>Performance of a contract: We must process your personal information to be able to provide you with one of our products or services.</li>
                <li>Vital interests: The processing of your personal information is necessary to protect your or someone else's life.</li>
              </ol>
            </div>

            {/* Section 5: Legal obligation */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                5. Legal obligation
              </h2>
              <p className="leading-relaxed text-gray-500">
                We are required to process your personal information by law.
              </p>
            </div>

            {/* Section 6: What sorts of personal information do we hold */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                6. What sorts of personal information do we hold
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Information that you provide to us such as your name, address, phone number, email address, and any feedback you give to us, including by phone, email, post, or via social media;</li>
                <li>Information about the services we provide you (including the things we offer you, when and where, and the way you use our products and services)</li>
                <li>Information required to make decisions about your applications for products and services we offer</li>
                <li>Information about whether or not you want to receive marketing communications from us</li>
                <li>Information about any device you have used to access our services (such as your device's make and model, browser, or IP address) and also how you use our services</li>
                <li>Your contact details, emails, and other electronic communications you receive from us, and how you interact with them.</li>
              </ol>
            </div>

            {/* Section 7: How do we use your information */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                7. How do we use your information
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Identify you when you visit our website or contact us;</li>
                <li>Send you account and service updates;</li>
                <li>Understand our customers to provide a great user experience, personalized offers, and online advertising;</li>
                <li>Use your personal information for statistical analysis to improve our services;</li>
                <li>Contact you regarding services, market research, or feedback;</li>
                <li>Provide relevant marketing communications.</li>
              </ol>
            </div>

            {/* Section 8: Sharing your information */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                8. Sharing your information
              </h2>
              <p className="leading-relaxed text-gray-500">
                We do not, and will not, sell any of your data to any third party. We work with some companies to help provide products and services, which include:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Advertising companies</li>
                <li>Social media providers</li>
                <li>Market research partners</li>
                <li>Email campaign companies</li>
                <li>Analytics service providers</li>
                <li>Third-party vendors for IT infrastructure</li>
                <li>Professional advisors</li>
                <li>Security and fraud prevention companies</li>
                <li>Review and comment collection companies</li>
                <li>Community and social goal partners</li>
              </ol>
            </div>

            {/* Section 9: Your rights */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                9. Your rights
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>If you want to exercise your rights, have a complaint, or questions, contact us within 30 days.</li>
                <li>The right to be informed about how your personal information is being used;</li>
                <li>The right to access the personal information we hold about you;</li>
                <li>The right to request correction of inaccurate personal information;</li>
                <li>The right to request deletion or stop processing in some circumstances;</li>
                <li>The right to discontinue direct marketing messages;</li>
                <li>The right to withdraw consent for consent-based processing;</li>
                <li>The right to request data transfer;</li>
                <li>The right to ask us to explain any computer-system decision about you;</li>
              </ol>
            </div>

            {/* Section 10: How do we protect your privacy */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                10. How do we protect your privacy
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>We may update this page to reflect changes in data processing.</li>
                <li>We limit physical and system access to authorized personnel only;</li>
                <li>Use technology controls like firewalls, encryption, and access separation;</li>
                <li>Proactively monitor systems for security;</li>
                <li>Follow industry best practices for information security;</li>
                <li>Enforce a "need to know" policy for data access.</li>
              </ol>
            </div>

            {/* Section 11: How to contact us */}
            <div>
              <h2 className="text-base font-bold text-gray-800 mb-2">
                11. How to contact us
              </h2>
              <p className="leading-relaxed text-gray-500">
                11.1. We always want to hear from our customers.
              </p>
              <p className="leading-relaxed text-gray-500">
                11.2. For questions, feedback, to stop using your information, exercise rights, or complaints:
              </p>
              <p className="leading-relaxed text-gray-500">
                11.3. Contact our Customer Care team via email at <a href="mailto:contact@aasourcingltd.com" className="text-blue-600">contact@aasourcingltd.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Privacy;