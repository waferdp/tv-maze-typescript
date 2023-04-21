import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockSearch from "../../mocks/mockSearch";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Search from '../Search';
import React from 'react';

jest.mock('axios');
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useSearchParams: () => [new URLSearchParams({ q: 'doctor' })],
    };
});

test('search for doctor, shows Doctor Who', async () => {
    render(<MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" Component={Search}>
            </Route>
        </Routes>
    </MemoryRouter>)

    mockSearch();
    const searchBar = screen.getByPlaceholderText(/Search for a TV series/i);
    fireEvent.change(searchBar, { target: { value: "doctor" } });
    const submitButton = screen.getByRole('button')
    fireEvent.submit(submitButton, { target: { value: submitButton } });
    const doctorWho = await waitFor(() => screen.getByText(/Doctor Who/i));
    expect(doctorWho).toBeInTheDocument();
});

test('search by entering address, shows Doctor Who', async () => {
    mockSearch();
    render(<MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" Component={Search}>
            </Route>
        </Routes>
    </MemoryRouter>)

    const doctorWho = await waitFor(() => screen.getByText(/Doctor Who/i));
    expect(doctorWho).toBeInTheDocument();
});