import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PracticeTests from '@/app/practice-tests/page'; 
import { useAuth } from '@/dependencies/AuthContext';

jest.mock('@/dependencies/AuthContext', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    currentUser: { uid: '123', email: 'test@ucr.edu' },
  });
});

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: '',
      json: () =>
        Promise.resolve({
          originalText: 'Test material',
          questions: [
            {
              question: 'What is 2 + 2?',
              options: { A: '3', B: '4', C: '5', D: '6' },
              correctAnswer: 'B',
              explanation: 'Because 2 + 2 = 4.',
            },
          ],
        }),
    } as Response)
  );
  
  

describe('Practice Test Generator', () => {
  it('validates file upload type and size', async () => {
    render(<PracticeTests />);
    const fileInput = screen.getByLabelText(/upload pdf document/i);

    const invalidFile = new File(['hello'], 'note.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });
    expect(await screen.findByText(/please select a pdf file/i)).toBeInTheDocument();
  });

  it('displays uploaded file info', async () => {
    render(<PracticeTests />);
    const fileInput = screen.getByLabelText(/upload pdf document/i);

    const pdfFile = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [pdfFile] } });

    expect(await screen.findByText(/selected: test.pdf/i)).toBeInTheDocument();
  });

  it('generates and renders the first question', async () => {
    render(<PracticeTests />);

    const fileInput = screen.getByLabelText(/upload pdf document/i);
    const pdfFile = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [pdfFile] } });

    const button = screen.getByRole('button', { name: /generate ai practice test/i });
    fireEvent.click(button);

    expect(await screen.findByText(/question 1 of 1/i)).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('lets user select an answer and submit test', async () => {
    render(<PracticeTests />);

    const fileInput = screen.getByLabelText(/upload pdf document/i);
    const pdfFile = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [pdfFile] } });

    fireEvent.click(screen.getByRole('button', { name: /generate ai practice test/i }));
    await screen.findByText('What is 2 + 2?');

    const answerOption = screen.getByLabelText(/b:/i);
    fireEvent.click(answerOption);

    fireEvent.click(screen.getByRole('button', { name: /submit test/i }));

    expect(await screen.findByText(/your score/i)).toBeInTheDocument();
    expect(screen.getByText(/you answered 1 out of 1 questions correctly/i)).toBeInTheDocument();
    expect(screen.getByText(/because 2 \+ 2 = 4\./i)).toBeInTheDocument();
  });
});
