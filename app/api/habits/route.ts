import connectToDB from "@/app/lib/connectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      name,
      icon,
      clerkUserId,
      frequency,
      notificationTime,
      isNotificationOn, // <-- You forgot this field
      areas,
      completedDays,
    } = await req.json();

    await connectToDB();

    const habit = new HabitsCollection({
      name,
      icon,
      clerkUserId,
      frequency,
      notificationTime,
      isNotificationOn, // <-- Add this field here
      areas,
      completedDays,
    });

    const saveHabit = await habit.save();
    return NextResponse.json({ habit: saveHabit });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDB();
    const habits = await HabitsCollection.find({ clerkUserId: clerkId });
    return NextResponse.json({ habits: habits });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: any) {
  try {
    const { habitId } = await req.json(); //get projectId from the request body

    const habitToDelete = await HabitsCollection.findOneAndDelete({
      _id: habitId,
    });
    console.log("Habit deleted:", habitToDelete);

    if (!habitToDelete) {
      return NextResponse.json({ message: "habit not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Habit deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
