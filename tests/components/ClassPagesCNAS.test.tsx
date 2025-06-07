// tests/ClassPagesCNAS.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassPageCNAS from '@/app/classpages/cnas/[courses]/page';
import { useParams } from 'next/navigation';

// Mock useParams
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock ClassReviews component
jest.mock('@/components/ClassReviews', () => ({
  __esModule: true,
  default: ({ collegeId, classCode }: any) => (
    <div data-testid="mock-class-reviews">
      Mock ClassReviews for {collegeId} - {classCode}
    </div>
  ),
}));

describe('ClassPageCNAS', () => {
  it('renders course data and all sections correctly', () => {
    (useParams as jest.Mock).mockReturnValue({ courses: 'CHEM001' });

    render(<ClassPageCNAS />);

    expect(screen.getByText((_, node) => node?.textContent === '← Back to CNAS')).toBeInTheDocument();
    expect(screen.getByText('CHEM001 Resource Page')).toBeInTheDocument();
    expect(screen.getByText('General Chemistry: Atomic structure, stoichiometry, and bonding.')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '⭐ Rate My Course')).toBeInTheDocument();
    expect(screen.getByText('Rate This Course')).toBeInTheDocument();
    expect(screen.getByTestId('mock-class-reviews')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '📚 Course Resources')).toBeInTheDocument();
    expect(screen.getByText('View Course Resources')).toBeInTheDocument();
  });

  it('renders fallback message when course is not found', () => {
    (useParams as jest.Mock).mockReturnValue({ courses: 'INVALID123' });

    render(<ClassPageCNAS />);

    expect(screen.getByText((_, node) =>
      node?.textContent === 'No detailed resources available for this course yet.'
    )).toBeInTheDocument();
  });
});
