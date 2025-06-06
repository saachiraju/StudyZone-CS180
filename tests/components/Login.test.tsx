import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import {Hero} from '@/sections/Hero';
import { AuthProvider } from '@/dependencies/AuthContext';

test('calls handleGoogleSignIn when button is clicked', async () => {
  const handleGoogleSignIn = jest.fn();  // create a mock function

  render(
    <>
    <AuthProvider>
        <Hero handleGoogleSignIn={handleGoogleSignIn} />
    </AuthProvider>
    </>
  );

  const button = await waitFor(() =>screen.getByRole('button', { name: /get started/i }));
  fireEvent.click(button);

  expect(handleGoogleSignIn).toHaveBeenCalledTimes(1);
});
