// utils/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyD5VvFd6khurW7TxjqoZKKGW52q3cDgmrk';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const compareTexts = async (text1: string, text2: string): Promise<boolean> => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Compare the following two texts and determine if they are similar in meaning:\n\nText 1: ${text1}\n\nText 2: ${text2}\n\nAnswer with "true" if they are similar, otherwise "false".`;

    try {
        const result = await model.generateContent(prompt);
        console.log(result.response);
        const response = await result.response;
        const text = response.text().trim().toLowerCase();
        return text === 'true';
    } catch (error) {
        console.error('Error comparing texts with Gemini API:', error);
        return false;
    }
};