import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newLabel: label, newStatus: status, newPriority: priority } = await request.json();
  await connectMongoDB();
  await Task.findByIdAndUpdate(id, { title, label, status, priority });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const task = await Task.findOne({ _id: id });
  return NextResponse.json({ task }, { status: 200 });
}