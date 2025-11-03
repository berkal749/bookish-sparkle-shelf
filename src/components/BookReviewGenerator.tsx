import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Spinner from './Spinner';
import { GEMINI_API_KEY, GEMINI_API_URL } from '@/lib/constants';

interface BookReviewGeneratorProps {
  title: string;
  author: string;
}

const BookReviewGenerator = ({ title, author }: BookReviewGeneratorProps) => {
  const [blurb, setBlurb] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBlurb = async () => {
    if (!title || !author) {
      setError("Title and Author are required to generate a blurb.");
      return;
    }

    setLoading(true);
    setError(null);
    setBlurb('');
    
    const userQuery = `Write a compelling, short marketing blurb (maximum 50 words) for a book titled "${title}" by the author ${author}. The blurb should entice a reader to buy the book. Do not include a title or introduction in your response.`;
    
    const systemPrompt = "You are a professional book copywriter and marketing expert. Your task is to generate highly engaging, concise descriptions for literary works.";

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };
    
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

    try {
        let response = null;
        for (let i = 0; i < 3; i++) {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) break;

            if (response.status === 429 && i < 2) {
                const delay = Math.pow(2, i) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw new Error(`API call failed with status ${response.status}`);
            }
        }

        if (!response.ok) {
            throw new Error(`Failed to generate content after retries.`);
        }

        const result = await response.json();
        const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No blurb generated.';
        
        setBlurb(generatedText);
        
    } catch (err) {
        setError("Error generating blurb. The LLM might not be able to generate content for this book.");
        console.error("Gemini API Error:", err);
        toast.error("AI Generation failed.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="mt-6 pt-4 border-t border-border">
      <h3 className="text-xl font-semibold text-primary mb-3">AI-Powered Blurb Generator</h3>
      <button
        onClick={generateBlurb}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 mb-4 transition-all"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div>
            <span>Generating...</span>
          </div>
        ) : (
          <>
            <Sparkles size={18} />
            <span>Generate Book Blurb</span>
          </>
        )}
      </button>

      {error && <p className="text-destructive p-3 bg-destructive/10 rounded-lg text-sm">{error}</p>}
      
      {blurb && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-foreground italic leading-relaxed text-lg">{blurb}</p>
        </div>
      )}
    </div>
  );
};

export default BookReviewGenerator;
