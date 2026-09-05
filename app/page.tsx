"use client";

// import Image from "next/image";
import {usePrivy} from '@privy-io/react-auth';
import LoginWithEmail from './login-email';
import AwardStamp from './award-stamp';

export default function Home() {
  const {ready, authenticated, user} = usePrivy();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <LoginWithEmail />;
  }

  // Now it's safe to use other Privy hooks and state
  // return <div>Privy is ready!</div>;

  return (
    <main>
      <h1>Welcome!</h1>
      <p>Logged in as: {user?.email?.address ?? "User"}</p>
      <p>Loyalty stamps: 0</p>

      <AwardStamp />
    </main>
  );
}
