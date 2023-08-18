import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, title, label, status, priority } = await request.json();
  console.log("data posting", { id, title, label, status, priority } )
  await connectMongoDB();
  await Task.create({ id, title, label, status, priority });
  return NextResponse.json({ message: "Task Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const tasks = await Task.find();
  return NextResponse.json({ tasks });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}