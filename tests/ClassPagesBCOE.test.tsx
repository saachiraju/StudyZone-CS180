// tests/ClassPagesBCOE.test.tsx
import { render, screen } from '@testing-library/react';
import ClassPageBCOE from '@/app/classpages/bcoe/[courses]/page';
import '@testing-library/jest-dom';
import React from 'react';

// Mock next/navigation for useParams
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Import the mocked useParams
import { useParams } from 'next/navigation';

describe('ClassPageBCOE', () => {
  it('shows fallback when course is not found', () => {
    (useParams as jest.Mock).mockReturnValue({ courses: 'INVALID101' });

    render(<ClassPageBCOE />);

    expect(
      screen.getByText(/no detailed resources available for this course yet/i)
    ).toBeInTheDocument();
  });

  it('renders course information when course is valid', () => {
    (useParams as jest.Mock).mockReturnValue({ courses: 'CS101' });

    render(<ClassPageBCOE />);

    expect(screen.getByText(/CS101 Class Page/i)).toBeInTheDocument();
    // expect(screen.getByText(/Rate My Course/i)).toBeInTheDocument();
    // expect(screen.getByText(/Join This Quarter's Discord/i)).toBeInTheDocument();
    // expect(screen.getByText(/View Course Resources/i)).toBeInTheDocument();
  });
});
