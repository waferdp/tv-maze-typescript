import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
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
        const response = await fetch(`http://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
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
        <h1 className="my-4">{show.name}</h1>
        <Row>
          <Col md={3} xs={12} className="d-flex pb-2">
            <img
              src={show.image ? show.image.medium : noImage}
              alt={show.name}
              className="mx-auto img-thumbnail"
            />
          </Col>
          <Col md={8} xs={12} className="px-4">
            <p>{stripHTML(show.summary)}</p>
            {show.genres.length > 0 && (
              <p>
                <strong>Genres: </strong> {show.genres.join(", ")}
              </p>
            )}
            {show.rating && (
              <p>
                <strong>Rating: </strong>
                {show.rating.average ? show.rating.average : "N/A"}
              </p>
            )}
            {show.network && (
              <p>
                <strong>Network: </strong> {show.network.name}
              </p>
            )}
            {show.runtime && (
              <p>
                <strong>Runtime: </strong> {show.runtime} minutes
              </p>
            )}
            {show.language && (
              <p>
                <strong>Language: </strong> {show.language}
              </p>
            )}
            {show.officialSite && (
              <p>
                <Link to={`${show.officialSite}`} target="_blank">
                  Visit Official Site
                </Link>
              </p>
            )}
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <div className="my-5">
        <Link to="/" className="btn btn-secondary">
          &larr; Back to Home
        </Link>
      </div>
      {renderDetails()}
    </>
  );
};

export default Detail;
