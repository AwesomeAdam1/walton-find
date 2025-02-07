"use client"

import { jobs } from "@/db/schema"
import { client } from "@/lib/hono"
import { InferSelectModel } from "drizzle-orm"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteJob } from "@/components/delete-job"
import { Loader2 } from "lucide-react"

type jobType = InferSelectModel<typeof jobs>

export default function ManageJobsPage() {
	const [myJobs, setMyJobs] = useState<jobType[]>()
	const [flag, setFlag] = useState(false)

	//@ts-ignore
	useEffect(() => {
		async function fetchData() {
			const response = await client.api.jobs.$get()

			if (!response.ok) {
				throw new Error("Failed to fetch account")
			}
			
			const { data } = await response.json()
			setMyJobs(data)
		}
		fetchData()
	}, [flag])

	if (myJobs == undefined) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Loader2 className="size-8 animate-spin text-slate-400"/>
			</div>
		)
	}

	return (
		<div>
			<div className="flex flex-col justify-center items-center">
				<p className="text-5xl font-bold my-10">
					Manage Your Job Listings
				</p>
				<p className="italic text-xl -mt-2">
					View your job or delete your applications here!
				</p>
			</div>
			<hr className="my-8 max-w-screen-xl mx-auto"/>
			{
				myJobs == undefined ? 
				<div className="flex justify-center items-center min-h-screen">
					<Loader2 className="size-8 animate-spin text-slate-400"/>
				</div> 
			:
				//@ts-ignore
				myJobs.length > 0 ?
					myJobs?.map((job) => (
						<Card key={job.id} className="border m-2">
							<CardHeader className="-mb-2">
								<CardTitle className="text-2xl -mb-2">{job.company}</CardTitle>
									<CardDescription className="text-md">{job.position}</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="font-semibold text-xl">Job Description</p>
									<p className="overflow-auto h-[100px] hyphens-auto"> {job.description}</p>
									<div className="flex justify-left mt-4 gap-x-10">
										<p><span className="font-semibold">Hourly Pay:</span> {job.pay} </p>
										<p><span className="font-semibold">Weekly Hours</span>: {job.hours} </p>
									</div>
								</CardContent>
							<CardFooter className="flex justify-end gap-3">
								<DeleteJob id={job.id} flag={flag} setFlag={setFlag} />
								<Link href={"/my-jobs/" + job.id}>
									<Button type="submit">
											Manage
									</Button>			
								</Link>
							</CardFooter>
						</Card>
					))
				:
				<div className="flex justify-center items-center min-h-screen">
					<p className="text-3xl font-semibold">
						You have no open jobs.
					</p>
				</div>
			}
		</div>
	) 
}