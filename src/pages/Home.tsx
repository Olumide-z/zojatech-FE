import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/portfolio");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Home</p>;
};

export default Home;