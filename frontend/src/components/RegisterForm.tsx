'use client';

import React, { useState } from 'react';
import InputComponent from './ui/InputComponent';
import ButtonComponent from './ui/ButtonComponent';
import LinkComponent from './ui/LinkComponent';
import { useRouter } from 'next/navigation';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // validation errors
    if (!email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push('Email is invalid');
    }

    if (!password) {
      newErrors.push('Password is required');
    } else if (password.length < 8) {
      newErrors.push('Password must be at least 8 characters');
    }

    if (confirmedPassword !== password) {
      newErrors.push('Password does not match');
    }

    if (newErrors.length > 0) {
      // do not proceed further since validation errors exist
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setErrors([data.message || 'Failed to register']);
      }
    } catch {
      setErrors(['An unexpected error occurred']);
    }
  };

  return (
    <form
      className="flex w-[320px] flex-col gap-[8px] rounded-[8px] bg-foreground px-[24px] py-[24px] text-black shadow-[0px_2px_2px_rgba(0,0,0,0.15)]"
      onSubmit={handleSubmit}
    >
      <InputComponent
        name={'email'}
        label="Email"
        placeholder="john@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputComponent
        name={'password'}
        label="Password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputComponent
        name={'confirmed_password'}
        label="Confirm Password"
        placeholder="password"
        type="password"
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      <ButtonComponent
        title="Register"
        className="border-[1px] border-primary-subtle bg-primary"
        type="submit"
      />
      {errors.length > 0 && (
        <ul className="w-full list-disc space-y-2 rounded-lg bg-[#fed7d7] px-[28px] py-[12px] text-xs text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <p className="pt-4 text-center text-sm">
        Already have an account? <LinkComponent title="Login" href="login" />{' '}
      </p>
    </form>
  );
}

export default RegisterForm;
