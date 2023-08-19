"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { redirect, useRouter } from "next/navigation";

import Router from "next/router";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

const formSchema = z.object({
  title: z
  .string()
  .min(2, 'Title must be at least 2 characters long').optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  label: z.string().optional()
})

export function EditTaskForm({setOpen, task}) {
    console.log(setOpen)

  const [error, setError] = useState('');
  const axios = require('axios')
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const router = useRouter();
 
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
        const url = `https://task-manager0910.fly.dev/api/tasks/${task.id}`
       
        const res = await axios.patch(url, data)   
        if(res.statusText!="OK"){
          console.log("update error", res)
          throw(res.msg)
        } 
      }
      catch(error){
        alert(error)
      }
      setOpen(false);
      router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      { error.length >0 ? (<span style={{color: "red", fontSize: 14}}>{error}</span> ) : null }
          <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
               <FormLabel>Title</FormLabel>
              <FormControl>
                <Input  defaultValue={task.value} placeholder={task.title} {...field} />
              </FormControl>
              </FormItem>
          )}
          />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
               <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue id="select_form" placeholder={task.status}  defaultValue={task.status} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="In progress">In progress</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
                      </FormItem>
           )}
        />
         <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue id="select_form" defaultValue={task.priority} placeholder={task.priority} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              </FormItem>
          )}
          />

<FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Label</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue id="select_form" defaultValue={task.label} placeholder={task.label} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Documentation">Documentation</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                </SelectContent>
              </Select>
              </FormItem>
          )}
          />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
