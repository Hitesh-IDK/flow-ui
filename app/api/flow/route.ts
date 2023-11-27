import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await fetch("http://localhost:8888/api/flows", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const apiData = await response.json();
    const data = apiData.data;

    return NextResponse.json(
      {
        flows1: data[0],
        flows2: data[1],
      },
      { status: response.status }
    );
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json(
      {
        message: "There is an issue here...",
      },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const response = await fetch("http://localhost:8888/api/flows", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    const apiData = await response.json();
    const message = apiData.message;

    return NextResponse.json(
      {
        message,
      },
      { status: response.status }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "There is an issue here...",
      },
      { status: 400 }
    );
  }
}
