import { NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/node";

const privy = new PrivyClient({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_APP_SECRET!,
});

// Temporary in-memory store
const stamps = new Map<string, number>();

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing authorization token" },
      { status: 401 }
    );
  }

  const accessToken = authorization.slice("Bearer ".length);

  try {
    // Verify the token BEFORE doing any write.
    const verified = await privy.utils().auth().verifyAccessToken(accessToken);

    // This identity comes from the VERIFIED token.
    const userId = verified.user_id;

    const currentStamps = stamps.get(userId) ?? 0;
    const newStampCount = currentStamps + 1;

    stamps.set(userId, newStampCount);

    return NextResponse.json({
      success: true,
      stamps: newStampCount,
    });
  } catch (error) {
    console.error("Privy token verification failed");

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
