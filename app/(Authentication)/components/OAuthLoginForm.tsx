// Import necessary components and utilities
'use client';
import { Button } from '@/components/ui/button'; // Importing the Button component for UI
import { SiGithub, SiDiscord, SiGoogle } from 'react-icons/si'; // Importing the GitHub and Discord icons from react-icons
import { createClient } from '@/utils/supabase/client';
import { useSearchParams, useRouter } from 'next/navigation'; // Next.js hooks for handling search parameters and routing
import { useEffect, useState } from 'react'; // React hooks for managing state and side effects

// Main component for handling OAuth logins
export default function OAuthLoginForm() {
  // State to store the 'next' query parameter from the URL
  const [next, setNext] = useState('/');
  // Hook to access the URL's search parameters
  const searchParams = useSearchParams();
  // Hook to access the Next.js router
  const router = useRouter();

  // Effect hook to update the 'next' state when the search parameters change
  useEffect(() => {
    // Extract the 'next' parameter from the search parameters
    const urlNext = searchParams.get('next');
    // If 'next' exists, update the state
    if (urlNext) {
      setNext(urlNext);
    }
  }, [searchParams]); // Re-run this effect when 'searchParams' changes

  // Async function to handle sign-in with OAuth providers
  const handleSignIn = async (provider: 'google' | 'github' | 'discord') => {
    // Create a Supabase client
    const supabase = createClient();

    // Attempt to sign in with the specified OAuth provider
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider, // Use the provider passed as a parameter
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${next}`, // Redirect URL after successful sign-in
      },
    });

    // Check for errors
    if (error) {
      console.error(error); // Log the error
      // Optionally, display an error message to the user
    } else {
      // If successful, redirect the user to the URL specified in 'data.url'
      router.push(data.url);
    }
  };

  // Render the login buttons
  return (
    <div className='flex flex-col items-center justify-center w-full space-y-4 rounded-lg'>
      <Button
        onClick={() => handleSignIn('google')}
        variant='outline'
        className='flex items-center gap-2 w-full'
      >
        <SiGoogle className='inline' /> Login with Google
      </Button>
    </div>
  );
}
