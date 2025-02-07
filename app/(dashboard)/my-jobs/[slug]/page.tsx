import { SubmitApplicationForm } from "@/components/submit-application-form"
import { database } from "@/db/database"
import { jobs } from "@/db/schema"
import { eq, InferSelectModel } from "drizzle-orm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type jobType = InferSelectModel<typeof jobs>

export default async function ManageJobApplicationsPage({ params }: any) {
	const { slug } = await params
	const applications = await database.query.jobs.findFirst({
		where: (jobs, { eq }) => eq(jobs.id, slug),
		with: {
			applications: true,
		},
	})

  return (
		<div className="m-4 text-center">
			<div className="flex flex-col items-center justify-center my-10">
				<p className="text-5xl font-bold mb-10">
					Current Job Applications
				</p>
				<p className="italic">
					View people who have applied for your job.
				</p>
			</div>
			<hr className="my-8 max-w-screen-xl mx-auto"/>
			{
				applications?.applications.map((applicant) => (
					<Card key={applicant.id} className="border m-2 h-[300px] flex justify-between flex-col">
					<div>
						<CardHeader className="-mb-2">
							<CardTitle className="text-2xl -mb-2">{applicant.name}</CardTitle>
							<CardDescription className="text-md">Age: {applicant.age}</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="font-semibold text-xl">Additional Applicant Info</p>
							<p className="overflow-auto hyphens-auto h-[100px]">{applicant.info}</p>
							<p><span className="font-semibold">Contact:</span> {applicant.contact}</p>
						</CardContent>
					</div>
					<div>
					<CardFooter className="flex justify-end">
					</CardFooter>
					</div>
				</Card>
				))
			}
		</div>
	)
}