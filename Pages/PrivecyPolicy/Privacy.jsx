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
                1.1. We will always keep your data safe and secure. So, you're up to speed; here is why we need your data and how we will use it.
              </p>
            </div>

            {/* Section 2: Protecting your privacy */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                2. Protecting your privacy
              </h2>
              <p className="leading-relaxed text-gray-500">
                2.1. Aaryan Sourcing, we are 100% committed to protecting the privacy and security of our customers and site visitors. The Aaryan Sourcing team is aware of the importance of your privacy. If you have any questions about how we protect your privacy, please get in touch with us at contact@aaryansourcing.com.
              </p>
              <p className="leading-relaxed text-gray-500">
                2.2. For all our services, the data controller —the company responsible for your privacy —is Aaryan Sourcing.
              </p>
            </div>

            {/* Section 3: Navigating this page */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                3. Navigating this page
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Our legal basis for processing your personal information;</li>
                <li>What sorts of personal information do we hold?</li>
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
                <li>Consent:You have told us you are happy for us to process your personal information for a specific purpose (s)</li>
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
              We are required by law to process your personal information.
              </p>
            </div>

            {/* Section 6: What sorts of personal information do we hold */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                6.What sorts of personal information do we hold
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Information that you provide to us, such as your name, address, phone number, email address, and any feedback you give to us, including by phone, email, post, or when you communicate with us via social media;</li>
                <li>Information about the services we provide you (including the things we offer you, when and where, and the way you use our products and services)</li>
                <li>Information required to make decisions about your applications for products and services we offer</li>
                <li>Information about whether or not you want to receive marketing communications from us</li>
                <li>Information about any device you have used to access our services (such as your device's make and model, browser, or IP address), and also how you use our services</li>
                <li>Your contact details, emails, and other electronic communications you receive from us, and how you interact with them. For example, whether the communication has been opened, if you have clicked on any links within that communication, and the device you used. We do this to ensure our communications are relevant to you. If you don't open them or click on any links, we know we need to improve our services.</li>
              </ol>
            </div>

            {/* Section 7: How do we use your information */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                7. How do we use your information
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Identify you when you visit our website or contact us;</li>
                <li>Send you account and service updates, such as updates to our Terms and Conditions and appointment confirmations;</li>
                <li>Understand our customers to provide a great user experience, personalized offers, and online advertising;</li>
                <li>We try to understand our customers to provide you with a great user experience, personalized offers, shopping ideas, and online advertising. Understanding how you use our platform, how you interact with our website, where and when you shop, the products and services you purchase, and how you use and browse our websites helps us improve our services.;</li>
                <li>We use your personal information for statistical analysis and to help us understand more about our customers. That includes understanding the products and services you buy. Analysis enables us to serve you better and identify areas for improvement in our services;</li>
                <li>We use your personal information to provide relevant marketing communications (including email, phone, SMS, post, or online advertising) relating to our products and services. As part of this, online advertising may be displayed on websites across Aaryan Sourcing and other organizations’ websites, as well as on online media channels. We may also use information about how you shop with us to measure the effectiveness of these campaigns..</li>
              </ol>
            </div>

            {/* Section 8: Sharing your information */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                8. Sharing your information
              </h2>
              <p className="leading-relaxed text-gray-500">
               We do not, and will not, sell any of your data to any third party –including your name, gender, address, email address, and phone number. We want to earn and maintain your trust, and we believe this is essential. For some campaigns, we may collaborate with various companies to provide the products and services you need or that we think you may be interested in. These third parties include:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>Advertising companies, which help us place Aaryan Sourcing adverts online and on other media</li>
                <li>Social media providers -such as Facebook, Instagram, Twitter, LinkedIn, and many more</li>
                <li>Market research partners, who help us analyze customer behavior</li>
                <li>Companies that deploy our email campaigns because they need to know your email address to carry out these services</li>
                <li>Companies that provide insights and analytics services to stock the right products, send the relevant marketing campaigns, and understand our business and customers better.</li>
                <li>Third-party vendors who help us manage and maintain Aaryan Sourcing's IT infrastructure</li>
                <li>Where relevant, our professional advisors, such as lawyers and consultants.</li>
                <li>Security and fraud prevention companies to ensure the safety and security of our customers, colleagues, and business.</li>
                <li>Companies that enable us to collect your reviews and comments, both online and offline;</li>
                <li>Companies that help us with our community and social goals;</li>
              </ol>
            </div>

            {/* Section 9: Your rights */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                9. Your rights
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>If you want to exercise your rights, have a complaint, or have questions, don't hesitate to contact us. As a starting point, we have 30 days in which to respond to you. You have many rights relating to your personal information; these are:</li>
                <li>The right to be informed about how your personal information is being used (like this notice!);</li>
                <li>The right to access the personal information we hold about you;</li>
                <li>The right to request the correction of inaccurate personal information we hold about you;</li>
                <li>The right to request that we delete your data, or stop processing it or collecting it, in some circumstances;</li>
                <li>The right to discontinue direct marketing messages, which you can do through email.</li>
                <li>The right to withdraw consent for any consent-based processing at any time;</li>
                <li>The right to request that we transfer or port elements of your data either to you or another service provider;</li>
                <li>The right to ask us to explain any computer-system decision about you;</li>
              </ol>
            </div>

            {/* Section 10: How do we protect your privacy */}
            <div className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                10. How do we protect your privacy
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-500">
                <li>We may change this page from time to time to reflect how we are processing your data. If we make significant changes, we will clearly communicate this on the Aaryan Sourcing website, in other Aaryan Sourcing services, or through alternative contact methods, such as email, to allow you to review the changes before proceeding.</li>
                <li>We take protecting your personal information seriously. Some of the controls we have in place are:</li>
                <li>We limit physical access to our buildings and user access to our systems to only those that we believe are entitled to be there.</li>
                <li>We use technology controls for our information systems, such as firewalls, user verification, strong data encryption, and separation of roles, systems & data.</li>
                <li>Systems are proactively monitored through a “detect and respond" information security function;</li>
                <li>We utilize industry "good practice" standards to support the maintenance of a robust information security management system;</li>
                <li>We enforce a "need to know" policy for access to any data or systems;</li>
              </ol>
            </div>

            {/* Section 11: How to contact us */}
            <div>
              <h2 className="text-base font-bold text-gray-800 mb-2">
                11. How to contact us
              </h2>
              <p className="leading-relaxed text-gray-500">
                11.1. We always want to hear from our customers (especially if you feel we have let you down or could do better).
              </p>
              <p className="leading-relaxed text-gray-500">
                11.2. If you: Have any questions or feedback about this notice; Would like us to stop using your information; Want to exercise any of your rights as set out above, or have a complaint;
              </p>
              <p className="leading-relaxed text-gray-500">
                11.3. Please do not hesitate to contact our Customer Care team via email at contact@aaryansourcing.com; we will be happy to answer any questions you may have. 
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Privacy;