"use client";

import {useState} from 'react';
import {useLoginWithEmail} from '@privy-io/react-auth';

export default function LoginWithEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const {sendCode, loginWithCode} = useLoginWithEmail();

  async function handleSendCode() {
    try {
      setError("");
      await sendCode({ email });
    } catch (err) {
      setError("Could not send verification code.");
      console.error(err);
    }
  }

  async function handleLogin() {
    try {
      setError("");
      await loginWithCode({ code });
    } catch (err) {
      setError("Invalid or expired verification code.");
      console.error(err);
    }
  }

  return (
    <div>
      <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
      <button onClick={() => handleSendCode()}>Send Code</button>
      <input onChange={(e) => setCode(e.currentTarget.value)} value={code} />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}