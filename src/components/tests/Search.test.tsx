import { render, screen, waitFor } from '@testing-library/react';
import { mockSearchWithResult, mockSearchNoResult, mockSearchNoGenres } from "../../mocks/mockSearch";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Search from '../Search';

jest.mock('axios');
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useSearchParams: () => [new URLSearchParams({ q: 'doctor' })],
    };
});

test('search by entering address, shows Doctor Who', async () => {
    mockSearchWithResult();

    render(<MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" Component={Search}>
            </Route>
        </Routes>
    </MemoryRouter>)

    const doctorWho = await waitFor(() => screen.getByText(/Doctor Who/i));
    expect(doctorWho).toBeInTheDocument();
});

test('Search returning show with no genres, doesn\'t display that show', async () => {
    mockSearchNoGenres();

    render(<MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" Component={Search}>
            </Route>
        </Routes>
    </MemoryRouter>)

    const saknad = await waitFor(() => screen.getByText(/Saknad/i))
    const missingMilions = screen.queryByText(/Missing Millions/i);
    expect(saknad).toBeInTheDocument();
    expect(missingMilions).not.toBeInTheDocument();
})

test('Search returning show with no genres, displays filtered search results', async () => {
    mockSearchNoGenres();

    render(<MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" Component={Search}>
            </Route>
        </Routes>
    </MemoryRouter>)

    const saknad = await waitFor(() => screen.getByText(/Saknad/i))
    const filteredResults = screen.getByText(/shows were filtered/i);
    expect(saknad).toBeInTheDocument();
    expect(filteredResults).toBeInTheDocument();
})

test('Search returning no results, dispalys no shows found', async () => {
    mockSearchNoResult();

    render(<MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" Component={Search}>
            </Route>
        </Routes>
    </MemoryRouter>)

    const doctorWho = await waitFor(() => screen.getByText(/No shows found/i));
    expect(doctorWho).toBeInTheDocument();
});