import React from "react";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";
import MainGreenButton from "../../components/MainGreenButton";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404 Error Page</h1>
      <p className="zoom-area">
        <b>Oops,</b> looks like someting went wrong.
      </p>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div className="link-container">
        <MainGreenButton
          text={"Go Back"}
          function={() => navigate(-1)}
        ></MainGreenButton>
      </div>
    </div>
  );
}
