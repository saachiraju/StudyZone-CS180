// tests/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from '@/sections/Hero'; // adjust path if needed

describe('Hero component', () => {
  it('renders the headline and description', () => {
    render(<Hero />);
    
    expect(
      screen.getByRole('heading', {
        name: /Master Your Subjects with/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Access personalized study tools/i)
    ).toBeInTheDocument();
  });

  it('has "Get Started" and "Learn More" buttons', () => {
    render(<Hero />);
    
    expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '/nav');
    expect(screen.getByRole('link', { name: 'Learn More' })).toHaveAttribute('href', 'https://quizlet.com');
  });
});
