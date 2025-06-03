import { FlashcardCarousel } from "@/sections/Flashcards";
import { render, screen, waitFor } from '@testing-library/react';

import { AuthProvider } from '@/dependencies/AuthContext';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      // simple mock for <Image />
      return <img {...props} />;
    },
  }));
  
  describe('FlashcardCarousel UI', () => {
    it('renders flashcard 1 from data', async () => {
      render(
        <>

          <FlashcardCarousel />

        </>
      );
  
      // Test that the first flashcard title is rendered
        expect(screen.getByText('Learn')).toBeInTheDocument();
    });


    it('renders flashcard 2 from data', async () => {
        render(
          <>
  
            <FlashcardCarousel />
  
          </>
        );
    
          expect(screen.getByText('Study Guides')).toBeInTheDocument();

      });

      it('renders flashcard 3 from data', async () => {
        render(
          <>
  
            <FlashcardCarousel />
  
          </>
        );
    
          expect(screen.getByText('Flashcards')).toBeInTheDocument();

      });

      it('renders flashcard 4 from data', async () => {
        render(
          <>
  
            <FlashcardCarousel />
  
          </>
        );
    

          expect(screen.getByText('Practice Tests')).toBeInTheDocument();
      });
  
    // it('renders left and right scroll buttons', () => {
    //   render(
    //     <AuthProvider>
    //       <FlashcardCarousel />
    //     </AuthProvider>
    //   );
  
    //   const leftButton = screen.getByRole('button', { name: /scroll left/i });
    //   const rightButton = screen.getByRole('button', { name: /scroll right/i });
  
    //   expect(leftButton).toBeInTheDocument();
    //   expect(rightButton).toBeInTheDocument();
    // });
  
    // it('clicking scroll buttons triggers scrollBy', () => {
    //   const scrollByMock = jest.fn();
    //   const scrollRef = { scrollBy: scrollByMock };
      
    //   // Replace useRef with a mock version
    //   jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: scrollRef });
  
    //   render(
    //     <AuthProvider>
    //       <FlashcardCarousel />
    //     </AuthProvider>
    //   );
  
    //   fireEvent.click(screen.getByRole('button', { name: /scroll right/i }));
    //   expect(scrollByMock).toHaveBeenCalledWith({ left: 320, behavior: 'smooth' });
  
    //   fireEvent.click(screen.getByRole('button', { name: /scroll left/i }));
    //   expect(scrollByMock).toHaveBeenCalledWith({ left: -320, behavior: 'smooth' });
    // });
  });