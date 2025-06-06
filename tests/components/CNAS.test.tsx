import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CNAS from '@/app/cnas/page'; // Adjust this path as needed
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('CNAS Page', () => {
  it('renders CNAS header and subtitle', () => {
    render(<CNAS />);
    expect(screen.getByText('College of Natural & Agricultural Sciences')).toBeInTheDocument();
    expect(screen.getByText(/one-stop hub for CNAS study resources/i)).toBeInTheDocument();
  });

  it('displays the search input and ratings link', () => {
    render(<CNAS />);
    expect(screen.getByPlaceholderText(/search classes/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view all cnas class ratings/i })).toBeInTheDocument();
  });

  it('renders at least one department and course by default', () => {
    render(<CNAS />);
    expect(screen.getByText('Biology')).toBeInTheDocument();
    expect(screen.getByText('BIOL100')).toBeInTheDocument();
  });

  it('filters class cards based on search input', () => {
    render(<CNAS />);
    const input = screen.getByPlaceholderText(/search classes/i);
    fireEvent.change(input, { target: { value: 'chem112' } });

    expect(screen.getByText('Chemistry')).toBeInTheDocument();
    expect(screen.getByText('CHEM112')).toBeInTheDocument();
    expect(screen.queryByText('BIOL100')).not.toBeInTheDocument();
  });

  it('hides departments with no matching results after filtering', () => {
    render(<CNAS />);
    const input = screen.getByPlaceholderText(/search classes/i);
    fireEvent.change(input, { target: { value: 'CBNS' } });

    expect(screen.getByText('Neuroscience')).toBeInTheDocument();
    expect(screen.getByText('CBNS101')).toBeInTheDocument();
    expect(screen.queryByText('Chemistry')).not.toBeInTheDocument();
    expect(screen.queryByText('CHEM001')).not.toBeInTheDocument();
  });

  it('displays nothing if no classes match the search term', () => {
    render(<CNAS />);
    const input = screen.getByPlaceholderText(/search classes/i);
    fireEvent.change(input, { target: { value: 'XYZ123' } });

    expect(screen.queryByText('Biology')).not.toBeInTheDocument();
    expect(screen.queryByText('BIOL100')).not.toBeInTheDocument();
  });
});
