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
import { Input } from "./input"
import { Label } from "./label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/registry/new-york/ui/dropdown-menu"


  import { TableForm } from "./add-task-form"
import { useState } from "react"

export function AddTask() {
    let [open,setOpen] = useState(false);
   
    const handleModalOpen = () => {
        setOpen(false);
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Add Task</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
        <DialogDescription>
        Add your tasks here
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-4">
          <TableForm setOpen={setOpen} />
        </div>
      </div>
    </DialogContent>
  </Dialog>
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant="destructive">Add Task</Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Add Task</DialogTitle>
    //       <DialogDescription>
    //        <b style={{color: "black"}}>You can add your tasks here</b>
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className="grid gap-4 py-4">
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label htmlFor="name" className="text-right">
    //           Name
    //         </Label>
    //         <Input id="name" placeholder="Pedro Duarte" className="col-span-3"  />
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label htmlFor="title" className="text-right">
    //           Title
    //         </Label>
    //         <Input id="title" placeholder="@peduarte" className="col-span-3" />
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label htmlFor="Status" className="text-right">
    //           Status
    //         </Label>
    //         <Input id="title" placeholder="@peduarte" className="col-span-3" />
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label htmlFor="priority" className="text-right">
    //           Priority
    //         </Label>
    //         <DropdownMenu>
    //             <DropdownMenuTrigger asChild>

    //         <Input id="priority" placeholder="Low" className="col-span-3" />
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent className="w-56" align="end" forceMount>
    //     <DropdownMenuLabel className="font-normal">
    //         choose priority
    //     </DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuGroup>
    //       <DropdownMenuItem>
    //         Low
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //         Medium
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //         High
    //       </DropdownMenuItem>
    //     </DropdownMenuGroup>
    //     <DropdownMenuSeparator />
    //   </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     </div>
    //     <DialogFooter>
    //       <Button type="submit">Add Task</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  )
}
