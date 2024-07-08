import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface IFormData {
  username: string;
  email: string;
  password: string;
}

const RegisterModal = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/auth/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error);
      return;
    }

    toast.success("Register successful");

    setTimeout(() => {
      navigate("/auth/login");
    }, 1500);
  };

  return (
    <>
      <h1 className="-title">Register</h1>
      <div className="-auth-modal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            name="name"
            placeholder="jonathan"
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });
            }}
          ></input>

          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="jonathan123@gmail.com"
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
          ></input>

          <label htmlFor="password">Password</label>
          <input
            name="password"
            placeholder="password"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          ></input>

          <Button htmlType="submit">
            Register
            <div className="-icon">
              <ArrowRight />
            </div>
          </Button>
        </form>

        <div className="-footer">
          <p>Already have an account?</p>

          <Button htmlType="submit" type="secondary" onClick={redirectToLogin}>
            Sign-in
            <div className="-icon">
              <ArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
