import React, { useEffect, useState } from "react";
import "./Login_Page.css";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/users.reducer";

const Login_Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user,accessToken } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });

  

  useEffect(()=>{
    if(accessToken){
      navigate("/")
    }

  },[accessToken]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="auth_page_container">
      {/* <div className="entry_container">
    <button>Sign up</button>
    <button>Login</button>

  </div> */}
      <div className="login_container ">
        <h1>YouTube</h1>
        <h3>Login to your account</h3>
        <div className="auto_login_btns">
          <button>Google</button>
        </div>
        {error && <p style={{ color: "darkred" }}>{error}</p>}
        {user &&accessToken&&console.log(accessToken)}
        <form id="login" onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <h4>Forgot your password?</h4>

        <div>
          <span>Don't have an account?</span>
          <h4>
            <Link to={"/signup"}>Create an account</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login_Page;
