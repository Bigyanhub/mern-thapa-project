import React from "react";

const About = () => {
  return (
    <>
      <main className="container about-page">
        <section className="grid grid-two-cols ">
          {/* -------------------------------------------------------------------------- */
          /*                             About text section                             */
          /* -------------------------------------------------------------------------- */}
          <article className="about-text-content">
            <p className="welcome-text">Welcome, Basnet Technical</p>
            <h1>Why Choose Us?</h1>
            <p>
              Expertise: Our team consists of experienced IT professionals who
              are passionate about staying up-to-date with the latest industry
              trends.
            </p>

            <p>
              Customization: We understand that every business is unique. That's
              why we create solutions that are tailored to your specific needs
              and goals.
            </p>

            <p>
              Customer-Centric Approach: We prioritize your satisfaction and
              provide top-notch support to address your IT concerns.
            </p>

            <p>
              Affordability: We offer competitive pricing without compromising
              on the quality of our services.
            </p>

            <p>
              Reliability: Count on us to be there when you need us. We're
              committed to ensuring your IT environment is reliable and
              available 24/7
            </p>
          </article>

          {/* ------------------------------------------------------------------------- */
          /*                             About image section                            */
          /* -------------------------------------------------------------------------- */}
          <div className="about-image-section">
            <img
              src="/images/about.png"
              alt="coding together"
              width={400}
              height={500}
              className="about-image"
            />
          </div>
        </section>

        {/* ------------------------------------------------------------------------- */
        /*                            About action buttons                            */
        /* -------------------------------------------------------------------------- */}
        <div className="about-actions">
          <a href="/contact">
            <button className="btn primary-btn">connect now</button>
          </a>
          <a href="/services">
            <button className="btn secondary-btn">Learn more</button>
          </a>
        </div>

        {/* ------------------------------------------------------------------------- */
        /*                           About Analytics section                          */
        /* -------------------------------------------------------------------------- */}
        <div className="section-analytics">
          <div className="container grid grid-four-cols">
            <div className="div1">
              <h2>50+</h2>
              <p>company registers</p>
            </div>
            <div className="div1">
              <h2>150+</h2>
              <p>projects done</p>
            </div>
            <div className="div1">
              <h2>250+</h2>
              <p>Happy clients</p>
            </div>
            <div className="div1">
              <h2>650+</h2>
              <p>Youtube Subscriber</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
