import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle input changes for all form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(e);
  
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/images/register.png"
                alt="Person registering"
                width={400}
                height="auto"
              />
            </div>

            {/* Registration Form */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your Username"
                    id="username"
                    autoComplete="username"
                    required
                    value={user.username}
                    onChange={handleInput}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    id="email"
                    autoComplete="email"
                    required
                    value={user.email}
                    onChange={handleInput}
                  />

                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your Phone"
                    id="phone"
                    autoComplete="tel"
                    required
                    value={user.phone}
                    onChange={handleInput}
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    id="password"
                    autoComplete="new-password"
                    required
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Register;
