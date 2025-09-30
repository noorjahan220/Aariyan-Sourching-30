import CommonBanner from "../../components/CommonBanner";

const CookiePage = () => {
  const cookiebanner = "/cookie-policy-banner.jpg";

  return (
    <main>
      <CommonBanner breadcrumb="cookie policy" backgroundImage={cookiebanner} />

      <section className="py-6 lg:py-10 px-4 lg:px-2 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="prose lg:prose-lg max-w-none text-gray-900 py-6">
            <h1 className="text-center font-bold mb-10 text-2xl md:text-3xl">
              Cookie Policy – Aaryan Sourcing
            </h1>

            <div className="mb-10">
              <h2 className="text-base  font-bold text-gray-900 mb-2">
                1. Manage Your Cookies
              </h2>
              <p className="leading-relaxed text-gray-900">
                1.1 We use cookies when you visit the Aaryan Sourcing website,
                but you can control these through your browser settings. You can
                find out how to manage cookies on your devices below
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-base  font-bold text-gray-900 mb-2">
                2. What are cookies?
              </h2>
              <p className="leading-relaxed text-gray-900">
                2.1 Cookies are data files that can hold small amounts of
                information stored on your device (computer, smartphone, and
                other similar devices) when you first visit a website.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-base  font-bold text-gray-900 mb-2">
                3. How do we use them
              </h2>
              <p className="mb-4 leading-relaxed text-gray-900">
                We use cookies for:
              </p>
              <ol>
                <li>3.1 Essential operations, like site navigation;</li>
                <li>
                  3.2 Allowing you to add items to your Wishlist or your Saved
                  Items;
                </li>
                <li>
                  3.3 Analyzing visitor numbers and behaviors, such as what
                  pages are frequently visited;
                </li>
                <li>
                  3.4 Assessing the success of our advertising campaigns,
                  offers, and communications;
                </li>
                <li>3.5 Targeting suitable advertising messages;</li>
                <li>
                  3.6 Understanding which Affiliates have helped us reach out to
                  new customers or have promoted our products on their websites;
                </li>
              </ol>
            </div>

            <div className="mb-10">
              <h2 className="text-base  font-bold text-gray-900 mb-2">
                4. What types of cookies do we use
              </h2>
              <p className="mb-4 leading-relaxed text-gray-900">
                There are four main types.
              </p>
              <ol className="list-decimal list-inside space-y-4 pl-2">
                <li>
                  <strong className="font-semibold text-gray-900">
                    Site functionality cookies
                  </strong>{" "}
                  – these allow you to navigate the site and use our features,
                  such as "Add to Wishlist" and "Contact Us".
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Site analytics cookies
                  </strong>{" "}
                  – These cookies allow us to measure and analyze how our
                  customers use the site to improve both its functionality and
                  your shopping experience.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Customer preference cookies
                  </strong>{" "}
                  – when you're browsing or contacting on AA Sourcing LTD
                  website, these cookies will remember your preferences (like
                  your language or location), so we can make your user
                  experience as seamless as possible and more personal to you.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Targeting or advertising cookies
                  </strong>{" "}
                  – These are used to deliver ads relevant to you. They also
                  limit the number of times that you see an ad and help us
                  measure the effectiveness of our marketing campaigns.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-base  font-bold text-gray-900 mb-2">
                5. How to manage cookies
              </h2>
              <p className="leading-relaxed text-gray-900">
                5.1 Most browsers allow you to manage cookies saved on your
                device – just head to the help section of your browser. But do
                not forget, that if you modify your settings to block all
                cookies, you may not be able to access parts of our site or our
                service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiePage;
