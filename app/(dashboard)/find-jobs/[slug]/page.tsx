import { SubmitApplicationForm } from "@/components/submit-application-form"
import { database } from "@/db/database"
import { jobs } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function ApplyJobPage({ params }: any) {
	const { slug } = await params
	const [job] = await database.select().from(jobs).where(eq(jobs.id, slug))

  return (
		<div className="m-4">
			<div className="flex flex-col items-center justify-center my-10">
				<p className="text-5xl font-bold mb-10">
					Apply for Job
				</p>
				<div className="max-w-screen-md ">
					<p className="text-2xl font-bold">{job.company}</p>
					<p className="text-md text-slate-500">{job.position}</p>
					<p className="font-semibold text-xl	mt-2">Job Description</p>
					<p className="overflow-auto hyphens-auto"> {job.description}</p>
					<div className="flex justify-left mt-4 gap-x-10">
						<p><span className="font-semibold">Hourly Pay:</span> {job.pay} </p>
						<p><span className="font-semibold">Weekly Hours</span>: {job.hours} </p>
					</div>
				</div>
			</div>
			<hr className="my-4 max-w-screen-xl mx-auto"/>
			<div className="flex justify-center">	
				<div className="w-full max-w-screen-lg">
					<SubmitApplicationForm id={slug} />
				</div>
			</div>
		</div>
	)
}