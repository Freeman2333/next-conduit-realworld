'use client';
import Link from 'next/link';
import SignupForm from '@modules/auth/components/SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto">
      <h1 className="text-4xl mb-3">Sign up</h1>
      <Link href="signin" className="text-green-500 mb-3 text-sm  ">
        Have an account?
      </Link>
      <SignupForm />
    </div>
  );
};

export default Signup;
