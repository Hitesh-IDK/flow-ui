import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json(
    {
      message: "You cannot access this end point",
    },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  const data = await req.json();

  const response = await fetch("localhost:8888");

  return NextResponse.json(
    {
      message: "Save successful",
    },
    { status: 200 }
  );
}
