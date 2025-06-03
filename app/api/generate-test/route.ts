import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PdfReader } from 'pdfreader';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    console.log('Starting test generation...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const difficulty = formData.get('difficulty') as string;
    const questionCount = formData.get('questionCount') as string;
    const customInstructions = formData.get('customInstructions') as string;
    const topics = formData.get('topics') as string;

    console.log('File received:', file?.name, file?.size);
    console.log('Difficulty:', difficulty);
    console.log('Question count:', questionCount);
    console.log('Custom instructions received:', customInstructions);
    console.log('Custom instructions length:', customInstructions?.length || 0);
    console.log('Custom instructions type:', typeof customInstructions);

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    console.log('Converting file to buffer...');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('Buffer created, size:', buffer.length);

    // Extract text from PDF using pdfreader
    console.log('Extracting text from PDF...');
    let extractedText = '';
    
    try {
      extractedText = await new Promise<string>((resolve, reject) => {
        const textContent: string[] = [];
        let itemCount = 0;
        const maxItems = 1000; // Limit to prevent memory issues
        
        new PdfReader().parseBuffer(buffer, (err: any, item: any) => {
          if (err) {
            console.error('PDF parsing error:', err);
            reject(new Error('Failed to parse PDF file'));
            return;
          }
          
          if (!item) {
            // End of file
            const text = textContent.join(' ').trim();
            console.log('Successfully extracted text, length:', text.length);
            resolve(text);
            return;
          }
          
          if (item.text && itemCount < maxItems) {
            textContent.push(item.text);
            itemCount++;
          }
          
          if (itemCount >= maxItems) {
            const text = textContent.join(' ').trim();
            console.log('Reached max items limit, extracted text length:', text.length);
            resolve(text);
            return;
          }
        });
      });

      if (!extractedText || extractedText.length < 100) {
        throw new Error('Extracted text is too short or empty');
      }

      // Limit text length to avoid token limits
      if (extractedText.length > 6000) {
        extractedText = extractedText.substring(0, 6000) + '...';
        console.log('Text truncated to 6000 characters');
      }

    } catch (pdfError) {
      console.error('PDF text extraction failed:', pdfError);
      return NextResponse.json({ 
        error: 'Failed to extract text from PDF',
        details: 'Unable to read the PDF file. Please ensure it contains readable text and try again.'
      }, { status: 400 });
    }

    // Prepare OpenAI prompt
    const selectedTopics = topics ? JSON.parse(topics) : [];
    const topicsPrompt = selectedTopics.length > 0 
      ? `Focus specifically on these topics: ${selectedTopics.join(', ')}.` 
      : '';

    // Handle custom instructions - prioritize them
    let customFocusPrompt = '';
    let filteredText = extractedText;
    
    if (customInstructions && customInstructions.trim()) {
      customFocusPrompt = `
CRITICAL INSTRUCTION: You are REQUIRED to create questions ONLY about: ${customInstructions.trim()}

IMPORTANT CONSTRAINTS:
- You must ONLY use information from the provided PDF document content below
- Focus on "${customInstructions.trim()}" ONLY as it appears in the uploaded PDF content
- DO NOT use external knowledge or information not present in the document
- If the PDF does not contain sufficient information about "${customInstructions.trim()}", then return an error message instead of making up content
- IGNORE all other topics in the PDF that are not related to: ${customInstructions.trim()}

If you create questions using external knowledge or about topics other than "${customInstructions.trim()}" as found in the PDF, you are failing to follow instructions.
`;

      // Filter the text content to focus on the custom instructions topic
      const keywords = customInstructions.toLowerCase().split(' ').filter(word => 
        word.length > 2 && !['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'focus', 'only', 'create', 'questions'].includes(word)
      );
      
      console.log('Filtering keywords:', keywords);
      
      // Split text into sentences and keep only those containing relevant keywords
      const sentences = extractedText.split(/[.!?]+/);
      const relevantSentences = sentences.filter(sentence => {
        const lowerSentence = sentence.toLowerCase();
        return keywords.some(keyword => lowerSentence.includes(keyword));
      });
      
      if (relevantSentences.length > 0) {
        filteredText = relevantSentences.join('. ').trim();
        console.log('Filtered text to focus on topic. Original length:', extractedText.length, 'Filtered length:', filteredText.length);
      } else {
        console.log('No relevant content found for topic, using full text but will instruct AI to focus only on relevant content');
      }
    }

    console.log('Custom focus prompt:', customFocusPrompt);

    const prompt = `${customFocusPrompt}

${customInstructions ? `TOPIC FOCUS: Create questions about "${customInstructions.trim()}" ONLY using the content from the uploaded PDF document below.` : ''}

Generate exactly ${questionCount} multiple choice questions based ONLY on the following PDF document content:

PDF Document Content:
${filteredText}

${customInstructions ? `
MANDATORY REQUIREMENTS:
- Create questions ONLY about: ${customInstructions.trim()}
- Use ONLY information that appears in the PDF document content above
- Do NOT use external knowledge or make up information not present in the document
- If the PDF document does not contain enough information about "${customInstructions.trim()}", respond with: {"error": "The uploaded PDF does not contain sufficient information about ${customInstructions.trim()} to generate questions."}
- IGNORE all content in the PDF not related to: ${customInstructions.trim()}
` : ''}

Requirements:
- Difficulty Level: ${difficulty || 'Mixed'}
- Number of Questions: ${questionCount}
- Base all questions strictly on the PDF content provided above
${topicsPrompt}

For each question, provide:
1. The question text focused EXCLUSIVELY on "${customInstructions || 'the document content'}" as it appears in the PDF
2. Four answer options (A, B, C, D) based only on information from the PDF
3. The correct answer (letter)
4. A brief explanation referencing the specific PDF content

IMPORTANT: You must respond with ONLY a valid JSON array. Do not include any other text, markdown formatting, or explanations outside the JSON.

Format your response exactly like this:
[
  {
    "question": "Question text here based on PDF content?",
    "options": {
      "A": "Option A from PDF",
      "B": "Option B from PDF", 
      "C": "Option C from PDF",
      "D": "Option D from PDF"
    },
    "correctAnswer": "A",
    "explanation": "Explanation referencing the PDF content"
  }
]

${customFocusPrompt ? `FINAL REMINDER: Questions must be ONLY about ${customInstructions.trim()} as it appears in the uploaded PDF content! Do not use external knowledge!` : 'Make sure the questions are relevant to the document content and at the specified difficulty level.'}
`;

      console.log('Final prompt length:', prompt.length);
      console.log('Final prompt preview (first 500 chars):', prompt.substring(0, 500));

      console.log('Sending request to OpenAI...');
      
      // Generate test questions using OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert educator who creates high-quality practice test questions based on educational content. You MUST respond with ONLY valid JSON format - no additional text, no markdown formatting, no explanations outside the JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      const responseText = completion.choices[0].message.content;
      console.log('OpenAI Response received, length:', responseText?.length);
      
      if (!responseText) {
        return NextResponse.json({ error: 'Failed to generate test questions' }, { status: 500 });
      }

      console.log('OpenAI Response first 200 chars:', responseText.substring(0, 200));

      // Clean and parse the JSON response
      let questions;
      try {
        // Remove any potential markdown formatting
        let cleanedResponse = responseText.trim();
        
        // Remove markdown code blocks if present
        if (cleanedResponse.startsWith('```json')) {
          cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
          cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        // Parse the JSON response
        let parsedResponse;
        const jsonStartIndex = cleanedResponse.indexOf('[');
        const jsonEndIndex = cleanedResponse.lastIndexOf(']');
        
        if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
          const jsonString = cleanedResponse.substring(jsonStartIndex, jsonEndIndex + 1);
          console.log('Attempting to parse JSON array:', jsonString.substring(0, 100) + '...');
          parsedResponse = JSON.parse(jsonString);
        } else {
          // Try direct parsing (might be an error object)
          console.log('Attempting direct JSON parse...');
          parsedResponse = JSON.parse(cleanedResponse);
        }

        // Check if the response is an error from OpenAI
        if (parsedResponse && typeof parsedResponse === 'object' && parsedResponse.error) {
          console.log('OpenAI returned an error:', parsedResponse.error);
          return NextResponse.json({ 
            error: 'Insufficient content in PDF',
            details: parsedResponse.error
          }, { status: 400 });
        }

        // If it's not an error, it should be an array of questions
        questions = parsedResponse;

        // Validate the response structure
        if (!Array.isArray(questions) || questions.length === 0) {
          throw new Error('Invalid response structure - not an array or empty');
        }

        // Validate each question has required fields
        for (const question of questions) {
          if (!question.question || !question.options || !question.correctAnswer || !question.explanation) {
            throw new Error('Invalid question structure');
          }
        }

        console.log('Successfully parsed', questions.length, 'questions');

      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Response Text:', responseText);
        
        // Return a more detailed error
        return NextResponse.json({ 
          error: 'Failed to parse AI response',
          details: `The AI response was not in valid JSON format. Please try again.`,
          rawResponse: responseText.substring(0, 200) + '...'
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true,
        questions,
        message: 'Practice test generated successfully from PDF content'
      });

  } catch (error) {
    console.error('Error generating test:', error);
    return NextResponse.json({ 
      error: 'Failed to generate practice test',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 