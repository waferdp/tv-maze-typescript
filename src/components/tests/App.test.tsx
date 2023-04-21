import { render, screen } from '@testing-library/react';
import App from '../../App';

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

