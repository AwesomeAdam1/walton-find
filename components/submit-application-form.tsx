"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { client } from "@/lib/hono"

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
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  name: z.string(),
	age: z.string(),
	contact: z.string(),
	info: z.string(),
})

export const SubmitApplicationForm = ({ id }: { id: string }) => {
	const [disabled, setDisabled] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
			age: "",
			contact: "",
			info: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
		setDisabled(true)

		//@ts-ignore
		const response = await client.api.applications[":id"]["$post"]({ param: { id }, json: values })

		if (!response.ok) {
			toast("Failed to submit job application. Try again.")
		} else {
			toast("Job application created.")
		}
		setDisabled(false)
  }

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Adam Wang" {...field} />
							</FormControl>
							<FormDescription>

							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Age</FormLabel>
							<FormControl>
							<Input placeholder="e.g. 18" {...field} />
							</FormControl>
							<FormDescription>
						
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="contact"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contact Info</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Email, Phone Number, etc." {...field} />
							</FormControl>
							<FormDescription>
								Contact info for the company to contact you.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="info"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional Info</FormLabel>
							<FormControl>
								<Textarea
									placeholder="e.g. Qualifications, Skills, Experience, etc."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Provide additional info about you to the company.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button type="submit" disabled={disabled}>Submit</Button>
				</div>
			</form>
		</Form>
  )
}
