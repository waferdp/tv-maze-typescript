import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockSearch from "../../mocks/mockSearch";
import App from "../../App";

jest.mock('axios');

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
  
  test('', async() => {
    
  });