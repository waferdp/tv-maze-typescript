import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import mockDetails from './mocks/mockDetails';
import mockSearch from './mocks/mockSearch';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Detail from './components/Detail';

jest.mock('axios');

test('renders TV Series search', () => {
  render(<App />);
  const linkElement = screen.getByText(/TV Series Search/i);
  expect(linkElement).toBeInTheDocument();
});


test('shows search bar', async () => {
  render(<App />);
  const searchBar = screen.getByPlaceholderText(/Search for a TV series/i);
  expect(searchBar).toBeInTheDocument();
});

test('search for doctor, shows Doctor Who', async () => {
  render(<App />);

  mockSearch();
  const searchBar = screen.getByPlaceholderText(/Search for a TV series/i);
  fireEvent.change(searchBar, { target: { value: "doctor" } });
  const submitButton = screen.getByRole('button')
  fireEvent.submit(submitButton, { target: { value: submitButton } });
  const doctorWho = await waitFor(() => screen.getByText(/Doctor Who/i));
  expect(doctorWho).toBeInTheDocument();
});

test('show details for Doctor Who, shows it\'s made by BBC', async () => {

  mockDetails();

  render(<MemoryRouter initialEntries={['/detail/210']}>
    <Routes>
      <Route path="/detail/:id" Component={Detail}>
      </Route>
    </Routes>
  </MemoryRouter>)

  
  const bbcOne = await waitFor(() => screen.getByText(/BBC One/i));
  expect(bbcOne).toBeInTheDocument();
});