// src/components/Footer/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-light text-center py-3">
      <Container>
        <span>Task Manager © {currentYear}</span>
      </Container>
    </footer>
  );
};

export default Footer;
