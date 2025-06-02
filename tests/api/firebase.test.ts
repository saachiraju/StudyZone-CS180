import {
    submitRating,
    getRatings,
    RatingEntry,
  } from '../../dependencies/firebase'
  import {
    setDoc,
    getDocs,
    collection,
    doc,
    query,
    where,
    serverTimestamp,
  } from 'firebase/firestore'
  
  // Mock Firestore functions
  jest.mock('firebase/firestore', () => {
    const actual = jest.requireActual('firebase/firestore') // Keep real types
  
    return {
      __esModule: true,
      ...actual,
      getFirestore: jest.fn(() => ({})),
      collection: jest.fn(),
      doc: jest.fn(),
      setDoc: jest.fn(),
      getDocs: jest.fn(),
      query: jest.fn(),
      where: jest.fn(),
      serverTimestamp: jest.fn(() => 'mock-timestamp'),
    }
  })
  
  
  describe('Firebase rating functions', () => {
    const mockCollection = 'ratings'
    const mockDocRef = {}
    const mockSnapshot = {
      docs: [
        {
          data: () => ({
            collegeId: 'UCLA',
            classCode: 'CS180',
            userId: 'user123',
            rating: 5,
            comment: 'Great class!',
            timestamp: 'mock-timestamp',
          }),
        },
      ],
    }
  
    beforeEach(() => {
      jest.clearAllMocks()
      ;(collection as jest.Mock).mockReturnValue(mockCollection)
      ;(doc as jest.Mock).mockReturnValue(mockDocRef)
    })
  
    it('submits a rating to Firestore', async () => {
      await submitRating('UCLA', 'CS180', 'user123', 5, 'Great class!')
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'ratings')
      expect(setDoc).toHaveBeenCalledWith(mockDocRef, {
        collegeId: 'UCLA',
        classCode: 'CS180',
        userId: 'user123',
        rating: 5,
        comment: 'Great class!',
        timestamp: 'mock-timestamp',
      })
    })
  
    it('retrieves ratings for a specific class', async () => {
      ;(getDocs as jest.Mock).mockResolvedValue(mockSnapshot)
  
      const result = await getRatings('UCLA', 'CS180')
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'ratings')
      expect(where).toHaveBeenCalledWith('collegeId', '==', 'UCLA')
      expect(where).toHaveBeenCalledWith('classCode', '==', 'CS180')
      expect(getDocs).toHaveBeenCalled()
      expect(result).toEqual([
        {
          collegeId: 'UCLA',
          classCode: 'CS180',
          userId: 'user123',
          rating: 5,
          comment: 'Great class!',
          timestamp: 'mock-timestamp',
        },
      ])
    })
  
    it('throws an error when collegeId is missing', async () => {
      await expect(getRatings('')).rejects.toThrow('collegeId is required')
    })
  })
  