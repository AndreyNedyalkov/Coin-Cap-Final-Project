import React from "react";
import { Col } from "react-bootstrap";

export default function LogoLinkComponent(props) {
  return (
    <Col>
      <a href={props.link} className={props.className}>
        <img src={props.logo} alt={props.alt}></img>
      </a>
    </Col>
  );
}
