import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Show } from "../types";
import { stripHTML } from "../utils/helpers";
import noImage from "../no-image.jpeg";

const Detail: React.FC = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Show | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        console.log(`Getting details for ${id} : http://api.tvmaze.com/shows/${id}`)
        const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(
          "An error occurred while fetching the show. Please make sure to check the show id and try again."
        );
        setIsLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

  const renderDetails = () => {
    if (isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="mt-5">
          {error}
        </Alert>
      );
    }

    if (!show) {
      return (
        <Alert variant="info" className="mt-5">
          No show found.
        </Alert>
      );
    }

    return (
      <>
        <Row>
          <Col md={3} xs={12} className="d-flex pb-2">
            <Card>
              <Card.Img variant="top" src={show.image ? show.image.medium : noImage} alt={show.name} />
              <Card.Body>
                <Card.Title>{show.name}</Card.Title>
                <ListGroup variant="flush">
                  {show.genres.length > 0 && (
                    <ListGroupItem>
                      <strong>Genres: </strong> {show.genres.join(", ")}
                    </ListGroupItem>
                  )}
                  {show.rating && (
                    <ListGroupItem>
                      <strong>Rating: </strong>
                      {show.rating.average ? show.rating.average : "N/A"}
                    </ListGroupItem>
                  )}
                  {show.network && (
                    <ListGroupItem>
                      <strong>Network: </strong> {show.network.name}
                    </ListGroupItem>
                  )}
                  {show.runtime && (
                    <ListGroupItem>
                      <strong>Runtime: </strong> {show.runtime} minutes
                    </ListGroupItem>
                  )}

                  {show.language && (
                    <ListGroupItem>
                      <strong>Language: </strong> {show.language}
                    </ListGroupItem>
                  )}
                  {show.officialSite && (
                    <ListGroupItem>
                      <Link to={`${show.officialSite}`} target="_blank">
                        Visit Official Site
                      </Link>
                    </ListGroupItem>
                  )}
                  {show.externals?.imdb && (
                    <ListGroupItem>
                      <Link to={`https://www.imdb.com/title/${show.externals?.imdb}`} target="_blank">
                        Visit IMDB
                      </Link>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} xs={12} className="px-4">

            <p>{stripHTML(show.summary)}</p>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <div className="my-5">
        <Button onClick={goBack} className="btn btn-secondary">
          &larr; Go back
        </Button>
      </div>
      {renderDetails()}
    </>
  );
};

export default Detail;
