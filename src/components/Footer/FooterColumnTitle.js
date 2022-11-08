import React from "react";
import { Col } from "react-bootstrap";
import "./FooterColumnTitle";

export default function FooterColumnTitle(props) {
  return <Col className="Footer-Column-Title">
          {props.children}
         </Col>;
}
