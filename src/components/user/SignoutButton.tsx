'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import TextButton from '../shared/buttons/TextButton';

type SignOutButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SignOutButton(props: SignOutButton) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return (
    <TextButton.Light {...props} onClick={handleSignOut} size="hf">
      {props.children}
    </TextButton.Light>
  );
}
