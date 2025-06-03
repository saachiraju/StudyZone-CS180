import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BCOE from '@/app/bcoe/page'; // Update path if needed
import { useRouter } from 'next/navigation';

// Mock Next.js router (if needed for Link behavior)
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('BCOE Page', () => {
  it('renders the BCOE header and intro text', () => {
    render(<BCOE />);
    expect(screen.getByText('Bourns College of Engineering')).toBeInTheDocument();
    expect(screen.getByText(/one‑stop hub/i)).toBeInTheDocument();
    expect(screen.getByText(/engineering students/i)).toBeInTheDocument();
  });

  it('displays the search input and "View All BCOE Class Ratings" link', () => {
    render(<BCOE />);
    expect(screen.getByPlaceholderText(/search classes/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view all bcoe class ratings/i })).toBeInTheDocument();
  });

  it('renders at least one department and class by default', () => {
    render(<BCOE />);
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('CS010A')).toBeInTheDocument();
  });

  it('filters class cards when typing in the search input', () => {
    render(<BCOE />);
    const searchInput = screen.getByPlaceholderText(/search classes/i);
    fireEvent.change(searchInput, { target: { value: 'cs153' } });

    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('CS153')).toBeInTheDocument();
    expect(screen.queryByText('CS010A')).not.toBeInTheDocument();
    expect(screen.queryByText('EE100A')).not.toBeInTheDocument();
  });

  it('hides departments with no matching classes after filtering', () => {
    render(<BCOE />);
    const searchInput = screen.getByPlaceholderText(/search classes/i);
    fireEvent.change(searchInput, { target: { value: 'bime' } });

    expect(screen.getByText('Bioengineering')).toBeInTheDocument();
    expect(screen.queryByText('Computer Science')).not.toBeInTheDocument();
    expect(screen.queryByText('CS010A')).not.toBeInTheDocument();
  });

  it('shows nothing if no classes match the search term', () => {
    render(<BCOE />);
    const searchInput = screen.getByPlaceholderText(/search classes/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.queryByText('Computer Science')).not.toBeInTheDocument();
    expect(screen.queryByText('Bioengineering')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'CS153' })).not.toBeInTheDocument();
  });
});
