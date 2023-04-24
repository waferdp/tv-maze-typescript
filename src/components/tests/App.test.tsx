import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { mockSearchWithResult } from '../../mocks/mockSearch';

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

  mockSearchWithResult();
  const searchBar = screen.getByPlaceholderText(/Search for a TV series/i);
  fireEvent.change(searchBar, { target: { value: "doctor" } });
  const submitButton = screen.getByRole('button')
  fireEvent.submit(submitButton, { target: { value: submitButton } });

  const doctorWho = await waitFor(() => screen.findByText(/Doctor Who/i));
  expect(doctorWho).toBeInTheDocument();
});

