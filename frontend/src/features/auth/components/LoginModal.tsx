import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface IFormData {
  email: string;
  password: string;
}

const LoginModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const redirectToRegister = () => {
    navigate("/auth/register");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      toast.error("Invalid credentials");
      return;
    }

    const { accessToken } = await res.json();

    toast.success("Login successful");
    Cookies.set("accessToken", accessToken);
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  return (
    <>
      <h1 className="-title">Login</h1>
      <div className="-auth-modal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Username or Email</label>
          <input
            name="email"
            placeholder="Skibidi@gmail.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />

          <Button htmlType="submit">
            Login
            <div className="-icon">
              <ArrowRight />
            </div>
          </Button>
        </form>

        <div className="-footer">
          <p>Don't have an account?</p>

          <Button
            htmlType="submit"
            type="secondary"
            onClick={redirectToRegister}
          >
            Sign-Up
            <div className="-icon">
              <ArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
