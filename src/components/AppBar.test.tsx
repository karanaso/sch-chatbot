import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppBar } from './AppBar';

describe('AppBar', () => {
  test('renders AppBar with navigation links', () => {
    render(
      <MemoryRouter>
        <AppBar />
      </MemoryRouter>
    );

    // Check if the navigation links are present
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Explain/i)).toBeInTheDocument();
  });
});
