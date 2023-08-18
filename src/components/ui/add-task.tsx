"use client"

import { Button } from "./button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



  import { TableForm } from "./add-task-form"
import { useState } from "react"

export function AddTask() {
    let [open,setOpen] = useState(false);
   
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Add Task</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-4">
          <TableForm setOpen={setOpen} />
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}
