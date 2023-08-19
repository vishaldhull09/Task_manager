"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "../../data/data"
import { taskSchema } from "../../data/schema"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation";
import { EditTaskForm } from "./edit-task-form"
import { EditTask } from "./edit-task"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

function getNextCopy(inputString) {
  const regex = /\((\d+)\)$/;
  const matches = inputString.match(regex);

  if (matches) {
    const currentNumber = parseInt(matches[1]);
    const nextNumber = currentNumber + 1;
    return inputString.replace(regex, `(${nextNumber})`);
  } else {
    return `${inputString}(1)`;
  }
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const axios = require('axios')
  let [open,setOpen] = useState(false);
  let [openmenu, setOpenmenu] = useState(true);

  const router = useRouter();

  async function handleDelete(){
    try {
      console.log("delete")
      const url = `https://task-manager0910.fly.dev/api/tasks/${task.id}`
      console.log(task)
      const res = await axios.delete(url)   
      console.log(res)
      if(res.statusText!="OK"){
        console.log("delete error", res.ok, res.statusText)
        throw(res.msg)
      } 
    }
    catch(error){
      alert(error)
    }
    router.refresh()
  }

  async function updateTask(data){
    try {
      const url = `http://localhost:3000/api/tasks/${task.id}`
      console.log(task)
      const res = await axios.patch(url, data)   
      if(res.statusText!="OK"){
        console.log("update error", res)
        throw(res.msg)
      } 
    }
    catch(error){
     
      alert(error)
    }
    router.refresh()
  }



  async function handleMakeCopy(){
    try {
      const url = 'https://task-manager0910.fly.dev/api/tasks'

      task.id = getNextCopy(task.id)
      let res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      let result = await res.json();
      
      if(result.msg && result.msg.code == 11000){
        console.log(result.msg)
        throw new Error("you already have this task id")
      }
      //else{
      router.refresh()
      // console.log("done")
      setOpen(false)
    
      //}
    }
    catch(error){
      alert(error)
    }
  }
  return (
    <>

    { openmenu &&
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={()=>{
          setOpen(!open);
          setOpenmenu(!openmenu);
          }}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={()=>handleMakeCopy()}>Make a copy</DropdownMenuItem>
        <DropdownMenuItem onSelect={()=>updateTask({"favorite": !task.favorite})}>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value} onClick={() => updateTask({"label":label.value})}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={()=> handleDelete()}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> }
    {open && <EditTask open={open} setOpen={setOpen} setOpenmenu={setOpenmenu} task={task} />}
    </>
  )
}
