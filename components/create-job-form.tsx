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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  position: z.string(),
	description: z.string(),
	contact: z.string(),
	pay: z.string(),
	hours: z.string(),
	company: z.string(),
})

export const CreateJobForm = () => {
	const [disabled, setDisabled] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
			description: "",
			contact: "",
			pay: "",
			hours: "",
			company: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
		setDisabled(true)

		const response = await client.api.jobs.$post({ json: values })

		if (!response.ok) {
			toast("Failed to create job post. Try again.")
		} else {
			toast("Job post created.")
		}
		setDisabled(false)
  }

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Apple, Nvidia, etc." {...field} />
							</FormControl>
							<FormDescription>
								This is your company name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Position</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Cashier, Waiter, etc." {...field} />
							</FormControl>
							<FormDescription>
								This is your position name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pay"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hourly Pay</FormLabel>
							<FormControl>
								<Input placeholder="e.g. 8, 15, etc." {...field} />
							</FormControl>
							<FormDescription>
								The average or expected hourly pay for the job.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="hours"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hours Per Week</FormLabel>
							<FormControl>
								<Input placeholder="e.g. 10, 20, etc." {...field} />
							</FormControl>
							<FormDescription>
								The hours per week you require or expect.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="e.g. Requirements, Skills, Expectations, etc."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Describe aspects of the job that the student would be doing.
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
								Contact info if student have questions or concerns.
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
