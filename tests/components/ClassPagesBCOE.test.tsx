// tests/ClassPagesBCOE.test.tsx
import { render, screen } from '@testing-library/react';
import ClassPageBCOE from '@/app/classpages/bcoe/[courses]/page';
import '@testing-library/jest-dom';
import React from 'react';

// Mock useParams from next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock ClassReviews
jest.mock('@/components/ClassReviews', () => ({
  __esModule: true,
  default: ({ collegeId, classCode }: any) => (
    <div data-testid="mock-class-reviews">
      Mock ClassReviews for {collegeId} - {classCode}
    </div>
  ),
}));

import { useParams } from 'next/navigation';

describe('ClassPageBCOE', () => {
  it('shows fallback when course is not found', () => {
    (useParams as jest.Mock).mockReturnValue({ courses: 'INVALID101' });

    render(<ClassPageBCOE />);

    expect(screen.getByText((_, node) =>
      node?.textContent === 'No detailed resources available for this course yet.'
    )).toBeInTheDocument();
  });

  it('renders course information and sections when course is valid', () => {
    (useParams as jest.Mock).mockReturnValue({ courses: 'CS180' });

    render(<ClassPageBCOE />);

    expect(screen.getByText('CS180 Class Page')).toBeInTheDocument();
    expect(screen.getByText('Software Engineering: requirements, architecture, design patterns, testing, and project management.')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '⭐ Rate My Course')).toBeInTheDocument();
    expect(screen.getByText('Rate This Course')).toBeInTheDocument();
    expect(screen.getByTestId('mock-class-reviews')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '📚 Course Resources')).toBeInTheDocument();
    expect(screen.getByText('View Course Resources')).toBeInTheDocument();
  });
});
