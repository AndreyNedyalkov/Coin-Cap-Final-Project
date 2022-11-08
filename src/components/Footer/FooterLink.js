import React from "react";
import { Col } from "react-bootstrap";
import "./FooterLinks.css";

export default function FooterLink(props) {
  return (
    <Col className="Footer-Links">
      <a href={props.link}>{props.children}</a>
    </Col>
  );
}
