import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassPageCNAS from '@/app/classpages/cnas/[courses]/page'; // adjust path
import { useRouter } from 'next/router';

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

const mockCourse = {
  description: 'An introductory course to chemistry topics.',
};
describe('ClassPageCNAS', () => {
    // it('renders course page with course data', () => {
    //   render(<ClassPageCNAS courseId="CHEM001" course={mockCourse} />);
  
    //   expect(screen.getByText('CHEM001 Resource Page')).toBeInTheDocument();
    //   expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
  
    //   // Sections
    //   expect(screen.getByText('⭐ Rate My Course')).toBeInTheDocument();
    //   expect(screen.getByText('💬 Class Live Chat')).toBeInTheDocument();
    //   expect(screen.getByText("💬 Join This Quarter's Discord")).toBeInTheDocument();
    //   expect(screen.getByText('📚 Course Resources')).toBeInTheDocument();
  
    //   // ClassReviews
    //   expect(screen.getByTestId('mock-class-reviews')).toBeInTheDocument();
    //   expect(screen.getByText(/Mock ClassReviews for cnas - CHEM001/)).toBeInTheDocument();
    // });
  
    it('renders fallback message if course data is missing', () => {
      render(<ClassPageCNAS />);
      expect(screen.getByText('No detailed resources available for this course yet.')).toBeInTheDocument();
    });

    
    // it('renders back button with proper styling and text', () => {
    //   render(<ClassPageCNAS courseId="MATH005" course={mockCourse} />);
    //   const backLink = screen.getByText('← Back to CNAS');
    //   expect(backLink).toBeInTheDocument();
    //   expect(backLink.closest('a')).toHaveAttribute('href', '/cnas');
    // });
  
    // it('renders links to all sections', () => {
    //   render(<ClassPageCNAS courseId="BIO010" course={mockCourse} />);
    //   expect(screen.getByText('Rate This Course').closest('a')).toHaveAttribute('href', '/cnas/ratings');
    //   expect(screen.getByText('Open Class Chat').closest('a')).toHaveAttribute('href', '/chat/BIO010');
    //   expect(screen.getByText('Join Discord').closest('a')).toHaveAttribute('href', 'https://discord.com/invite/your-server-id');
    //   expect(screen.getByText('View Course Resources').closest('a')).toHaveAttribute('href', '/classpages/cnas/BIO010/resources');
    // });
  });
  