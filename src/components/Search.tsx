import React, { useEffect, useState } from "react";
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

  const search = (search: string) : void => {
    console.log("adding to history");
    navigate(`/?search=${search}`);
  }

  const handleSearchEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();
    if(searchParams && searchParams.get("search")) {
      if (searchParams.get("search")! !== searchTerm) {
        search(searchTerm)
      }
      else {
        handleSearch(searchTerm);
      }
    }
  }

  const handleSearch = async (search: string) : Promise<void> => {
    setIsLoading(true);
    setIsSearched(true);
    try {
      const response = await fetch(
        `http://api.tvmaze.com/search/shows?q=${search}`
      );
      const data = await response.json();
      const allShows = data.map((result: any) => result.show);
      setShows(filterResults(allShows));
      setIsLoading(false);
      setError("");
    } catch (error) {
      setError(
        "An error occurred while fetching search results. Please try again later."
      );
      setIsLoading(false);
    }
  };

  const filterResults = (unfiltered : Show[]) : Show[] => {
    const noImages = unfiltered.filter(show => !show.image);
    const noSummary = unfiltered.filter(show => !show.summary);
    const noGenre = unfiltered.filter(show => show.genres == null || show.genres.length === 0)
    const badShows = [...noImages, ...noSummary, ...noGenre];

    const filtered = unfiltered.filter(show => !badShows.includes(show));

    return filtered;
  }
  
  useEffect(() =>{
    if(searchParams && searchParams.get("search")) {
      const searchParam = searchParams.get("search")!;
      setSearchTerm(searchParam);
      handleSearch(searchParam);
    }
  }, [searchParams]);

  return (
    <>
      <Row className="mt-4">
        <Col>
          <Form onSubmit={handleSearchEvent}>
            <Row className="mx-auto">
              <Col xs={8} md={11}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search for a TV series"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={2} md={1}>
                <Button type="submit" disabled={!searchTerm}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
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
          {shows.length > 0 && <List shows={shows} />}
        </Col>
      </Row>
    </>
  );
};

export default Search;
