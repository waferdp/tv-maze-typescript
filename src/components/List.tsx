import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ListProps } from "../types";
import { stripHTML, truncateString } from "../utils/helpers";
import noImage from "../no-image.jpeg";

const List: React.FC<ListProps> = ({ shows }) => {
  return (
    <Row className="mt-5">
      {shows.map((show) => (
        /*For equal height hack add these classes: d-flex align-items-stretch */
        <Col key={show.id} xs={6} md={3} className="d-flex align-items-stretch">
          <Card className="mb-3">
            <Card.Img
              variant="top"
              src={show.image ? show.image.medium : noImage}
              alt={show.name}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{show.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {show.genres.join(", ")}
              </Card.Subtitle>
              <Card.Text className="d-none d-sm-block">
                {truncateString(stripHTML(show.summary), 180)}
              </Card.Text>
              <Container fluid className="d-flex flex-row-reverse mt-auto pe-0">
                <Link to={`/detail/${show.id}`} className="btn btn-primary">
                    Details
                  </Link>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default List;
