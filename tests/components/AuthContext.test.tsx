// AuthProvider.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../dependencies/AuthContext'; // adjust path as needed
import { onAuthStateChanged } from 'firebase/auth';

// Mock Firebase Auth
jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    onAuthStateChanged: jest.fn(),
  };
});

describe('AuthProvider', () => {
  it('provides user and loading state correctly', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' } as any;

    // Mock implementation of onAuthStateChanged
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(mockUser); // simulate user signed in
      return () => {}; // return unsubscribe function
    });

    const TestComponent = () => {
      const { currentUser, loading } = useAuth();

      return (
        <div>
          <div>Loading: {loading ? 'true' : 'false'}</div>
          <div>User: {currentUser?.email || 'none'}</div>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText('Loading: false')).toBeInTheDocument();
    });

    expect(screen.getByText('User: test@example.com')).toBeInTheDocument();
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    const ConsoleError = console.error;
    console.error = jest.fn(); // suppress React error boundary logs

    const TestComponent = () => {
      useAuth(); // should throw
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useAuth must be used within an AuthProvider'
    );

    console.error = ConsoleError;
  });
});
