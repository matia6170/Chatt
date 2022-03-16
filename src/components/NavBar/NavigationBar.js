import React from "react";
import { Link, useParams } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/*
 */
