import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import Search from "./components/Search";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" className="m-2">
          TV Series Search
        </Navbar.Brand>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
