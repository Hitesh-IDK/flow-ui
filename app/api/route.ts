import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({
    status: "405",
    message: "You cannot access this end point",
  });
}

export async function POST(req: Request) {
  return NextResponse.json({
    status: "405",
    message: "You cannot access this end point",
  });
}
