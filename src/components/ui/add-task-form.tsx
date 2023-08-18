"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation";

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

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      status: "in progress",
      priority: "Low",
      label: "Bug"
    },
  })

  const router = useRouter();
 
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("formdata", data)
    try {
      const url = 'http://localhost:3000/api/tasks'
      let res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data)
      }).then(response => {
        response.text()
      }).then(data => console.log(data)
      )
    }
    catch(e){
      alert(e)
    }
    setOpen(false)
   

    router.refresh();

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <SelectItem value="in progress">in progress</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
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
             <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue id="select_form" placeholder="Select status" />
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
