'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import OAuthLoginForm from './OAuthLoginForm';

export default function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<string>('Weak');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handleSignup = async () => {
      const supabase = createClient();

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          toast({
            title: 'Oops! Something went wrong!',
            variant: 'destructive',
            description: "We couldn't sign you up. Please try again later.",
          });
          throw error;
        }

        toast({
          title: 'Success!',
          description: 'Please check your email for a verification link.',
          action: <ToastAction altText='Confirm Verification Link'>Ok</ToastAction>,
        });
      } catch (error: any) {
        setError(error.message);
        toast({
          title: 'Oops! Something went wrong!',
          variant: 'destructive',
          description: "We couldn't sign you up. Please try again later.",
        });
        console.log(error);
        router.push('/sign-up?error');
      } finally {
        setLoading(false);
        setSubmitted(false);
      }
    };

    const checkEmailExists = async () => {
      const supabase = createClient();

      try {
        const { data, error } = await supabase.from('profiles').select('id').eq('email', email).single();

        if (data) {
          toast({
            title: 'Email Already Exists',
            variant: 'destructive',
            description: 'The email address is already registered. Please use a different email.',
          });
          setLoading(false);
          setSubmitted(false);
          return false;
        }

        return true;
      } catch (error: any) {
        setError(error.message);
        toast({
          title: 'Oops! Something went wrong!',
          variant: 'destructive',
          description: 'There was an error checking the email address. Please try again later.',
        });
        console.log(error);
        setLoading(false);
        setSubmitted(false);
        return false;
      }
    };

    const performSignup = async () => {
      const emailExists = await checkEmailExists();
      if (emailExists) {
        await handleSignup();
      }
    };

    if (submitted) {
      performSignup();
    }
  }, [submitted, email, password, router, toast]);

  const checkPasswordStrength = (value: string) => {
    if (value.length > 8 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) {
      setPasswordStrength('Strong');
    } else if (value.length > 6 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    if (newPassword !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className='flex justify-center items-center'>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg p-6 min-w-full'
      >
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='m@example.com'
              required
              onChange={handleEmailChange}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              name='password'
              required
              onChange={handlePasswordChange}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              required
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className='text-center font-light text-sm'>
            Password Strength:
            <div className='flex mt-2'>
              <div className={`w-1/3 h-2 ${passwordStrength === 'Weak' ? 'bg-red-500' : 'bg-gray-300'} mx-1`}></div>
              <div className={`w-1/3 h-2 ${passwordStrength === 'Medium' ? 'bg-yellow-500' : 'bg-gray-300'} mx-1`}></div>
              <div className={`w-1/3 h-2 ${passwordStrength === 'Strong' ? 'bg-green-500' : 'bg-gray-300'} mx-1`}></div>
            </div>
            <div className='text-xs mt-2'>{passwordStrength}</div>
          </div>
        </div>
        <div className='mt-4'>
          <Button
            type='submit'
            className='w-full'
            disabled={loading || !passwordsMatch}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </div>
        <div className='block w-full text-center font-light text-sm mt-4'>
          {`Already have an account?`}{' '}
          <Link
            href='/login'
            className='text-primary'
          >
            Login
          </Link>
          <div className='mt-2 mb-4'>{`or login with`}</div>
          <OAuthLoginForm />
        </div>
      </form>
    </div>
  );
}
