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



  import { EditTaskForm } from "./edit-task-form"
import { useState } from "react"

export function EditTask({open, setOpen, setOpenmenu, task}) {
    //let [open,setOpen] = useState(setOpen);
   
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Edit Task</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-4">
          <EditTaskForm setOpen={setOpen} task={task}/>
          {setOpenmenu(true)}
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}
