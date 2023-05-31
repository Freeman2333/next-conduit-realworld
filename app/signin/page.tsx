'use client';
import Link from 'next/link';
import SigninForm from '@modules/auth/components/SigninForm';

const Signin: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto">
      <h1 className="text-4xl mb-3">Sign in</h1>
      <Link href="signin" className="text-green-500 mb-3 text-sm  ">
        Have an account?
      </Link>
      <SigninForm />
    </div>
  );
};

export default Signin;
