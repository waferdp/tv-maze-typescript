import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Show } from "../types";
import List from "./List";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchCallbacks, handleSearch } from "../utils/searcher";



const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const search = (search: string): void => {
    console.log("adding to history");
    navigate(`/?search=${search}`);
  }

  const callbacks : SearchCallbacks = {
    setShows: setShows,
    setError: setError,
    setIsLoading: setIsLoading,
    setIsSearched: setIsSearched
  };

  const handleSearchEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();
    if (searchParams.get("search")! !== searchTerm) {
      console.log("navigating")
      search(searchTerm)
    }
    else {
      console.log("staying")
      handleSearch(searchTerm, callbacks);
    }
  }
  
  useEffect(() => {
    const callbacks = {
      setShows: setShows,
      setError: setError,
      setIsLoading: setIsLoading,
      setIsSearched: setIsSearched
    };

    if (searchParams && searchParams.get("search")) {
      const searchParam = searchParams.get("search")!;
      console.log(`search param: ${searchParam}`);
      setSearchTerm(searchParam);
      handleSearch(searchParam, callbacks);
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
                <Button type="submit" className="mb-auto" disabled={!searchTerm}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      { (isLoading || error || shows.length === 0) && (
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
