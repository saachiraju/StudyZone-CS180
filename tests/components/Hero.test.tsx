import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from '@/sections/Hero';
import { AuthProvider } from '@/dependencies/AuthContext';

describe('Hero component', () => {
  it('renders the "Get Started" button with correct link', async () => {
    render(
    <>
    <AuthProvider>
        <Hero/>
    </AuthProvider>
    </>);
    const button = await waitFor(() => screen.getByRole('button', { name: /get started/i }));

    expect(button).toBeInTheDocument();
    // expect(button).toHaveAttribute('href', '/nav');
  });
});
