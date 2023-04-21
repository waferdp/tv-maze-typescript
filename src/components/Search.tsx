import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Show } from "../types";
import List from "./List";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearchEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();
    if (searchParams.get("q")! !== searchTerm) {
      navigate(`/?q=${searchTerm}`);
    }
  }

  useEffect(() => {

    const filterResults = (unfiltered: Show[]): Show[] => {
      const noImages = unfiltered.filter(show => !show.image);
      const noSummary = unfiltered.filter(show => !show.summary);
      const noGenre = unfiltered.filter(show => show.genres == null || show.genres.length === 0)
      const badShows = [...noImages, ...noSummary, ...noGenre];

      const filtered = unfiltered.filter(show => !badShows.includes(show));

      return filtered;
    }

    const handleSearch = async (search: string): Promise<void> => {
      setIsLoading!(true);
      setIsSearched!(true);
      try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
        const allShows = response.data.map((result: any) => result.show);
        setShows!(filterResults(allShows));
        setIsLoading!(false);
        setError!("");
      } catch (error) {
        setError!(
          "An error occurred while fetching search results. Please try again later."
        );
        setIsLoading!(false);
      }
    };

    if (searchParams && searchParams.get("q")) {
      const searchParam = searchParams.get("q")!;
      setSearchTerm(searchParam);
      handleSearch(searchParam);
    }
  }, [searchParams]);

  return (
    <>
      <Row className="mt-4">
        <Col xs={12}>
          <Form onSubmit={handleSearchEvent}>
            <Row>
              <Col xs={9} md={10} lg={11}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search for a TV series"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={3} sm={2} md={2} lg={1} className="d-flex flex-row-reverse">
                <Button id="search-button" type="submit" className="mb-auto" disabled={!searchTerm}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {(isLoading || error || shows.length === 0) && (
        <Row className="mt-4">
          <Col>
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            {error && (
              <Alert variant="danger" className="mt-4">
                {error}
              </Alert>
            )}
            {shows.length === 0 && isSearched && (
              <Alert variant="info" className="mt-4">
                No shows found!
              </Alert>
            )}
          </Col>
        </Row>
      )}
      {shows.length > 0 && <List shows={shows} />}
    </>
  );
};

export default Search;
