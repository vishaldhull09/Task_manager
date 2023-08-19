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


import {domain} from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "id must be at least 2 characters.",
  }),
  title: z
  .string({ required_error: 'Title is required' })
  .min(2, 'Title must be at least 2 characters long'),
  status: z
    .string({
      required_error: "Please select status.",
    }),
  priority: z
    .string({
      required_error: "Please select priority",
    }),
  label: z
  .string({
    required_error: "Please select priority",
  }),



})

export function TableForm( {setOpen}) {

  const [error, setError] = useState('');

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const router = useRouter();
 
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const url = `${domain}/api/tasks`
      let res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      let result = await res.json();
      
      if(result.msg && result.msg.code == 11000){
        throw new Error("you already have this task id")
      }
      //else{
      router.refresh()
      // console.log("done")
      setOpen(false)
      setError("")
      //}
    }
    catch(error){
      setError(error.message)
    }
   

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      { error.length >0 ? (<span style={{color: "red", fontSize: 14}}>{error}</span> ) : null }
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task ID</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
               <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                    <SelectValue id="select_form" placeholder="Select status" />
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
                    <SelectValue id="select_form" placeholder="Select priority" />
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
                    <SelectValue id="select_form" placeholder="Select Label" />
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
