import React from "react";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppStoreLogo from "../Icons/Footer/App_Store.png";
import GooglePlayLogo from "../Icons/Footer/Google_Play.png";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import FooterLink from "./FooterLink";
import FooterColumnTitle from "./FooterColumnTitle";
import "./FooterColumnTitle.css";
import LogoLinkComponent from "./LogoLinkComponent";

export default function Footer() {
  return (
    <Container className="Footer-Body">
      <Row className="Footer-Container" xs="auto">
        <FooterColumnTitle>COINCAP.IO</FooterColumnTitle>
        <FooterLink link="https://coincap.io/methodology">
          Methodology
        </FooterLink>
        <FooterLink link="https://shapeshift.zendesk.com/hc/en-us/requests/new">
          Support
        </FooterLink>
        <FooterLink link="https://docs.coincap.io/">Our API</FooterLink>
        <FooterLink link="https://coincap.io/rate-compare">
          Rate Comparison
        </FooterLink>
        <FooterLink link="https://shapeshift.com/contribute">
          Careers
        </FooterLink>
      </Row>
      <Row className="Footer-Container" xs="auto">
        <Col className="Footer-Column-Title">LEGALS</Col>
        <div className="Footer-Links">
          <FooterLink link="https://assets.coincap.io/documents/terms_of_service.pdf">
            Terms of Service
          </FooterLink>
          <FooterLink link="https://shapeshift.com/privacy?_ga=2.236483841.1051153332.1665657039-1607975974.1663429789">
            Privacy Policy
          </FooterLink>
        </div>
        <Col className="Disclaimer">DISCLAIMER</Col>
        <Col>
          Neither ShapeShift AG nor CoinCap are in any way associated with
          CoinMarketCap, LLC or any of its goods and services.
        </Col>
      </Row>
      <Row className="Footer-Container" xs="auto">
        <FooterColumnTitle>FOLLOW US</FooterColumnTitle>
        <Col className="Social-Media-Icons">
          <a href="https://twitter.com/CoinCap_io">
            <FaTwitter />
          </a>
          <a href="https://www.facebook.com/watch/?v=365220420785166">
            <FaFacebookSquare />
          </a>
        </Col>
      </Row>
      <Row className="Footer-Container" xs="auto">
        <Col className="Footer-Column-Title">COINCAP APP AVAILABLE ON</Col>
        <LogoLinkComponent
          link={"https://play.google.com/store/apps/details?id=io.coinCap.coinCap"}
          logo={GooglePlayLogo}
          className="Logo-Footer"
          alt="Google-play-logo"
        ></LogoLinkComponent>
        <LogoLinkComponent
          link={"https://apps.apple.com/us/app/coincap/id1074052280?ign-mpt=uo%3D4"}
          logo={AppStoreLogo}
          className="Logo-Footer"
          alt="App-store-logo"
        ></LogoLinkComponent>
      </Row>
    </Container>
  );
}
