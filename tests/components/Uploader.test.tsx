// tests/components/Uploader.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Uploader from '@/components/uploader' // adjust path as needed
import { upload as mockUpload } from '@vercel/blob/client'

jest.mock('@vercel/blob/client', () => ({
  upload: jest.fn(),
}))

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    dismiss: jest.fn(),
    // Use a simple function that returns JSX for success
    __esModule: true,
    default: (message: any) => message,
  },
}))

// Mock ProgressBar to avoid testing its internal logic here
jest.mock('@/components/progress-bar', () => () => <div data-testid="progress-bar">Progress Bar</div>)

describe('Uploader', () => {
  const testFile = new File(['hello'], 'hello.png', { type: 'image/png' })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders upload UI', () => {
    render(<Uploader folder="test-folder" />)
    expect(screen.getByText('Upload a file')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument()
  })

  it('handles file input and shows preview', async () => {
    render(<Uploader folder="test-folder" />)

    const input = screen.getByLabelText('Photo upload').parentElement?.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(input, { target: { files: [testFile] } })

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument()
    })
  })

  it('handles upload error', async () => {
    (mockUpload as jest.Mock).mockRejectedValueOnce(new Error('Upload failed'))

    render(<Uploader folder="test-folder" />)

    const input = screen.getByLabelText('Photo upload').parentElement?.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(input, { target: { files: [testFile] } })

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }))

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalled()
      expect(require('react-hot-toast').default.error).toHaveBeenCalledWith('Upload failed')
    })
  })

  it('disables buttons during upload', async () => {
    (mockUpload as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ url: 'https://blob.vercel.com/delay.png' }), 500)
        )
    )

    render(<Uploader folder="test-folder" />)

    const input = screen.getByLabelText('Photo upload').parentElement?.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(input, { target: { files: [testFile] } })

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }))

    expect(screen.getByRole('button', { name: 'Upload' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled()
  })
})
