import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Detail from '../Detail';
import mockDetails from '../../mocks/mockDetails';
import React from 'react';

jest.mock('axios');

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