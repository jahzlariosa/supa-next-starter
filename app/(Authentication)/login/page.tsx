import Image from 'next/image';
import { login } from '../auth/actions/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-12 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12 lg:col-span-4'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>Enter your email below to login to your account</p>
          </div>
          <form
            className='grid gap-4'
            action={login}
          >
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email:</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password:</Label>
                <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id='password'
                name='password'
                type='password'
                required
              />
            </div>
            <Button
              type='submit'
              className='w-full'
            >
              Log in
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='underline'
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className='hidden bg-muted lg:block lg:col-span-8'>
        <Image
          src='/placeholder.svg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
