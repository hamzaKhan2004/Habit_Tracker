/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDB from "@/app/lib/connectToDB";
import Area from "@/app/Models/AreaSchema";
import { NextResponse } from "next/server";

//saving area to db
export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, icon, clerkUserId } = await req.json();
    const area = new Area({ name, icon, clerkUserId });
    console.log(area);

    const savedArea = await area.save();
    return NextResponse.json({ area: savedArea });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

//getting area from db
export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDB();
    const areas = await Area.find({ clerkUserId: clerkId });
    return NextResponse.json({ areas: areas });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
