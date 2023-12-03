import { NextResponse } from "next/server";
import ApiPort from "../ApiPort";

export async function GET(req: Request) {
  try {
    const response = await fetch(process.env.APIFLOWS!, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        {
          message: data.message,
        },
        { status: response.status }
      );
    }

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
    const response = await fetch(process.env.APIFLOWS!, {
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

// {
//   itemType: "start",
//   label: "Start of a Request",
//   desc: "Info: Starting a request now",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "node",
//   label: "New Request 1",
//   desc: "Info: Request Service",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "node",
//   label: "New Request 2",
//   desc: "Info: Request Service",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "end",
//   label: "End of a request",
//   desc: "Info: Request Service has been ended",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },

//

// {
//   itemType: "start",
//   label: "Start of a Request",
//   desc: "Info: Starting a request now",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "node",
//   label: "New Request 1",
//   desc: "Info: Request Service",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "node",
//   label: "New Request 2",
//   desc: "Info: Request Service",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "node",
//   label: "New Request 3",
//   desc: "Info: Request Service",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
// {
//   itemType: "end",
//   label: "End of a request",
//   desc: "Info: Request Service has been ended",
//   id: 0,
//   listId: 0,
//   isActive: false,
// },
