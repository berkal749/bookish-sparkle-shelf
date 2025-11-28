import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Book Store</h1>
        <p className="text-muted-foreground">
          {isSignUp ? 'Create an account to get started' : 'Sign in to manage your books'}
        </p>
      </div>

      <div className="w-full max-w-md">
        {isSignUp ? (
          <SignUp 
            routing="hash"
            signInUrl="/auth"
            afterSignUpUrl="/"
          />
        ) : (
          <SignIn 
            routing="hash"
            signUpUrl="/auth"
            afterSignInUrl="/"
          />
        )}
      </div>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-6 text-primary hover:text-primary/80 underline"
      >
        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
      </button>
    </div>
  );
};

export default Auth;
