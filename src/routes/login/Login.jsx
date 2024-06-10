import "./login.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Real-time validation for username
    if (formData.username && formData.username.length < 3) {
      setErrors((prev) => ({ ...prev, username: "Username must be at least 3 characters long" }));
    } else {
      setErrors((prev) => {
        const { username, ...rest } = prev;
        return rest;
      });
    }
    
    // Real-time validation for password
    if (formData.password && formData.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters long" }));
    } else {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Check for errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const res = await apiRequest.post("auth/login", formData);
      setErrors({});
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        setErrors({ general: "Error logging in user" });
      }
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          {errors.general && <p className="error">{errors.general}</p>}
          <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
          <button type="submit" disabled={isLoading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/newbg7.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
