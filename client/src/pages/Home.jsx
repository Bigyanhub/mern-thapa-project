import React from "react";

const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to Basnet Technical</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Basnet Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">Learn more</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width={400}
                height={500}
              />
            </div>
          </div>
        </section>

        <div className="section-analytics">
          <div className="container grid grid-four-cols">
            <div className="div1">
              <h2>50+</h2>
              <p>registered companies</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
