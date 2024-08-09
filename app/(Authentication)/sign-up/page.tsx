import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from '../components/SignUpForm';
export default function SignUpPage() {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-12 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12 lg:col-span-4'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <p className='text-balance text-muted-foreground'>Enter your details below to create a new account</p>
          </div>
          <SignUpForm />
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
