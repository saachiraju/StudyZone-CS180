import { render,act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassReviews from '@/components/ClassReviews'; // adjust path if needed
import { getRatings } from '@/dependencies/firebase';

// Mock getRatings from Firebase
jest.mock('@/dependencies/firebase', () => ({
  getRatings: jest.fn(),
}));

const mockRatings = [
  { classCode: 'CHEM001', rating: 4, comment: 'Challenging but rewarding', userId: 'user1' },
  { classCode: 'CHEM001', rating: 5, comment: 'Great professor!', userId: 'user2' },
  { classCode: 'CHEM002', rating: 3, comment: 'Okay class.', userId: 'user3' },
];

describe('ClassReviews Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders reviews and average rating for matching class code', async () => {
    (getRatings as jest.Mock).mockResolvedValue(mockRatings);
  
    await act(async () => {
      render(<ClassReviews collegeId="cnas" classCode="CHEM001" />);
    });
  
    await waitFor(() => {
      expect(screen.getByText('📝 Class Reviews (2)')).toBeInTheDocument();
      expect(screen.getByText(/Overall Rating:/)).toBeInTheDocument();
      expect(screen.getByText('(4.5 out of 5)')).toBeInTheDocument();
    });
  });

  it('renders reviews and average rating for matching class code', async () => {
    (getRatings as jest.Mock).mockResolvedValue(mockRatings);

    await act(async () => {render(<ClassReviews collegeId="cnas" classCode="CHEM001" />);});
    
    await waitFor(() => {
      expect(screen.getByText('📝 Class Reviews (2)')).toBeInTheDocument();
      expect(screen.getByText(/Overall Rating:/)).toBeInTheDocument();
      expect(screen.getByText('(4.5 out of 5)')).toBeInTheDocument();
      expect(screen.getByText(/Challenging but rewarding/)).toBeInTheDocument();
      expect(screen.getByText(/Great professor!/)).toBeInTheDocument();
    });
  });

  it('displays fallback message if no reviews for class', async () => {
    (getRatings as jest.Mock).mockResolvedValue([
      { classCode: 'BIOL100', rating: 5, comment: 'Fun class!', userId: 'u' },
    ]);

    await act (async () => {render(<ClassReviews collegeId="cnas" classCode="PHYS001" />);});
    
    await waitFor(() => {
      expect(screen.getByText('📝 Class Reviews (0)')).toBeInTheDocument();
      expect(screen.getByText(/No reviews yet for PHYS001/i)).toBeInTheDocument();
      expect(screen.getByText(/Be the first to rate this class!/i)).toBeInTheDocument();
    });
  });

  it('handles absence of comments gracefully', async () => {
    (getRatings as jest.Mock).mockResolvedValue([
      { classCode: 'CHEM001', rating: 4, userId: 'userX' },
    ]);

    await act (async () => {render(<ClassReviews collegeId="cnas" classCode="CHEM001" />);});
    
    await waitFor(() => {
      expect(screen.getByText('📝 Class Reviews (1)')).toBeInTheDocument();
      expect(screen.queryByText(/"/)).not.toBeInTheDocument(); // no comment quotes
    });
  });

//   it('does not crash if getRatings throws', async () => {
//     (getRatings as jest.Mock).mockRejectedValue(new Error('Firebase error'));

//     await act (async () => {render(<ClassReviews collegeId="cnas" classCode="BIOL102" />);});
    
//     await waitFor(() => {
//       expect(screen.getByText('📝 Class Reviews (0)')).toBeInTheDocument();
//     });
//   });
});
