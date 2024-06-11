import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {

  const [isLoading,setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
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

    // Real-time validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Email is invalid" }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }

    // Real-time validation for phone
    if (formData.phone && formData.phone.length < 10) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must be at least 10 digits long" }));
    } else {
      setErrors((prev) => {
        const { phone, ...rest } = prev;
        return rest;
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors("")

    // Check for errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const res = await apiRequest.post("auth/register", formData);
      setErrors({});
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        setErrors({ general: "Error registering user" });
      }
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {errors.general && <p className="error">{errors.general}</p>}
          <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
          <input name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Property Owner">Property Owner</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
          <button type="submit" disabled={isLoading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/newbg7.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
