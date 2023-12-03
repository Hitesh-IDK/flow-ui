import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const data = await req.json();

  if (!data.email)
    return NextResponse.json(
      { message: "Email not found, make sure you are logged in" },
      { status: 404 }
    );

  const response = await fetch(`${process.env.APIAUTH!}/update`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const apiData = await response.json();

  if (!response.ok) {
    return NextResponse.json({ message: apiData.message }, { status: 401 });
  }

  return NextResponse.json(
    {
      message: "Updated password successfully",
    },
    {
      status: 200,
    }
  );
}

export async function GET(req: Request, res: Response) {
  return NextResponse.json(
    { message: "end point not implemented" },
    { status: 404 }
  );
}
