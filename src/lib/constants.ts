// API Configuration
export const API_URL = 'https://bookstore-backend-1-ccbv.onrender.com/books';
export const USE_MOCK_DATA = false;

// Gemini API Configuration
export const GEMINI_API_KEY = "";
export const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

// Mock data for testing
export const mockBooks = [
  { _id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishYear: 1925 },
  { _id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', publishYear: 1960 },
  { _id: '3', title: '1984', author: 'George Orwell', publishYear: 1949 },
  { _id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', publishYear: 1813 },
];
