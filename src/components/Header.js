import React from "react";
import { Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <div>
      <Navbar className="navbar mb-3">
        <Navbar.Brand href="#home">
          <h3 className="text-white">Qlue App</h3>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
