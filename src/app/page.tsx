
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { useTheme } from "next-themes"

import { columns } from "@/components/ui/columns"
import { DataTable } from "@/components/ui/data-table"
import { UserNav } from "@/components/ui/user-nav"
import { taskSchema } from "../data/schema"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}



async function getTasks(){
  try {
    const url = 'https://task-manager0910.fly.dev/api/tasks'
    let res = await fetch(url, {
        method: 'GET',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json'
        }
    })

   
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = await res.json()
    console.log("getting data", data)


    return z.array(taskSchema).parse(data.tasks);
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};


export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}