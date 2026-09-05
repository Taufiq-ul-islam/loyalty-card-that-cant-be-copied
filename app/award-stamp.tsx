"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function AwardStamp() {
  const { getAccessToken } = usePrivy();

  const [stamps, setStamps] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function awardStamp() {
    try {
      setError("");

      const accessToken = await getAccessToken();

      if (!accessToken) {
        setError("You are not authenticated.");
        return;
      }

      const response = await fetch("/api/award-stamp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to award stamp");
      }

      setStamps(data.stamps);
    } catch (error) {
      console.error(error);
      setError("Could not award stamp.");
    }
  }

  return (
    <div>
      <button onClick={awardStamp}>
        Award Stamp
      </button>

      {stamps !== null && (
        <p>Loyalty stamps: {stamps}</p>
      )}

      {error && (
        <p>{error}</p>
      )}
    </div>
  );
}
