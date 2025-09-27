import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Generate questions
export const generateQuestions =async(tech, level) =>{
  const prompt = `Generate 5 ${level} level ${tech} interview questions. Return only questions, numbered 1-5 but the question discription must be 1,2 lines:`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  return text.split('\n')
    .filter(line => line.match(/^\d+\./))
    .map(line => line.replace(/^\d+\.\s*/, ''))
    .slice(0, 5);
}

// NEW: Evaluate complete interview
export const evaluateCompleteInterview=async (questions, technology, difficulty)=> {
  try {
    // Prepare questions and answers for evaluation
    const qaText = questions.map((q, index) => 
      `Q${index + 1}: ${q.question}\nAnswer: ${q.answer || 'No answer provided'}`
    ).join('\n\n');
    
    const prompt = `
You are a technical interviewer evaluating a ${difficulty} level ${technology} developer interview.

Here are the interview questions and candidate's answers:

${qaText}

Please provide:
1. Overall score out of 10 (considering ${difficulty} level expectations)
2. Overall feedback in 2-3 lines covering strengths and areas for improvement

Respond ONLY in this JSON format:
{
  "score": 7.5,
  "feedback": "Shows good understanding of core concepts with practical knowledge. Answers demonstrate hands-on experience but could be more detailed in explaining advanced topics. Overall a solid ${difficulty} level performance."
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean and parse JSON
    text = text.replace(/```json|```/g, '').trim();
    const evaluation = JSON.parse(text);
    
    // Ensure score is within bounds
    evaluation.score = Math.min(Math.max(evaluation.score, 0), 10);
    
    return evaluation;
    
  } catch (error) {
    console.error('Complete interview evaluation error:', error);
    throw error;
  }
}



