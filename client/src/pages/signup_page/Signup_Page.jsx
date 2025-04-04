import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../reducers/users.reducer";
import "./Signup_Page.css";
import { Link } from "react-router-dom";

const Signup_Page = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", formData.image);
    console.log("33",data);

    dispatch(register(data));
  };

  return (
    <div className="auth_page_container">
      {/* <div className="entry_container">
    <button>Sign up</button>
    <button>Login</button>

  </div> */}

      <div className="signup_container ">
        <h1>YouTube</h1>
        <h3>Create new account</h3>
        <div className="auto_login_btns">
          <button>Google</button>
        </div>
        {error && <p style={{ color: "darkred"}}>{error}</p>}
        {user && (
          <p style={{ color: "green" }}>User registered successfully!</p>
        )}
        <form id="signup" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Sign up"}
          </button>

          
        </form>

        <h4>Forgot your password?</h4>

        <div>
          <span>Already member?</span>
          <h4>
            <Link to={"/login"}>Log in</Link>
          </h4>
        </div>
        <span>
          By creating an account, you agree to youtube Terms of Service and
          Privacy Policy
        </span>
      </div>
    </div>
  );
};

export default Signup_Page;
