import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = ({ title }) => {
  return (
    <Navbar bg="light" className="justify-content-center footer">
      <Navbar.Text>{title}</Navbar.Text>
    </Navbar>
  );
};
export default Footer;
