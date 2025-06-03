// tests/components/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/sections/Header';


jest.mock('@/dependencies/firebase', () => ({
  auth: {}, // mock auth object
  googleProvider: {}, // mock provider
}));

jest.mock('@/dependencies/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null, // or mock a user for signed-in scenarios
  }),
}));

describe('Header component', () => {
  it('renders guest message when user is not signed in', () => {
    render(<Header />);
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

  it('shows dropdown buttons', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /Colleges/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Study Tools/i })).toBeInTheDocument();
  });

  it('opens Colleges dropdown on click', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /Colleges/i }));
    expect(screen.getByText('BCOE')).toBeInTheDocument();
    expect(screen.getByText('CNAS')).toBeInTheDocument();
  });


});