import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Row className="mt-5">
      <Col>
        <h2>Oops! You seem to be lost.</h2>
        <Link to="/" className="btn btn-secondary">
          &larr; Back to Home
        </Link>
      </Col>
    </Row>
  );
};

export default NotFound;
