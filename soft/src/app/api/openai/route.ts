import { SendMessage } from "src/utils/openai";
import { ipAddress } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(3, "20 s"),
});

const dailylimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(50, "1 d"),
});

export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  // Convert to NextRequest
  let ip = "127.0.0.1";
  try {
    ip = ipAddress(req) ?? ip;
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Unable to assign IP address. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const ratelimitresult = await ratelimit.limit(ip);
  const dailylimitresult = await dailylimit.limit(ip);

  if (ratelimitresult.remaining === 0) {
    return new Response(
      JSON.stringify({
        error:
          "Rate limit exceeded. Please wait 20 seconds before trying again. You’ve sent too many requests in a short period.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else if (dailylimitresult.remaining === 0) {
    return new Response(
      JSON.stringify({
        error:
          "Daily limit exceeded. You’ve reached your daily quota of requests. Please try again tomorrow.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const body = await req.json();
    console.log("Body: " + body);
    let MessageResponse = await SendMessage(body);
    return new Response(JSON.stringify(MessageResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error: " + error);
    return new Response(
      JSON.stringify({
        error: "Failed to process your request. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
