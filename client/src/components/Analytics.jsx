import React from "react";

// Analytics component displays key business statistics in a grid layout

const Analytics = () => {
  return (
    <>
      {/* Section for analytics statistics */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          {/* Statistic: Registered companies */}
          <div className="div1">
            <h2>50+</h2>
            <p>registered companies</p>
          </div>
          {/* Statistic: Happy Clients */}
          <div className="div1">
            <h2>10,000+</h2>
            <p>Happy Clients</p>
          </div>
          {/* Statistic: Well known developers */}
          <div className="div1">
            <h2>500+</h2>
            <p>Well known developers</p>
          </div>
          {/* Statistic: 24/7 services */}
          <div className="div1">
            <h2>24/7</h2>
            <p>services</p>
          </div>
        </div>
      </section>
    </>
  );
};

// Export the Analytics component
export default Analytics;
