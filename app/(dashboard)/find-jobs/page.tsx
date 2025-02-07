import { database } from "@/db/database";
import { jobs } from '@/db/schema';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FindJobsPage() {
	const jobListings = await database.select().from(jobs);

	return (
		<div className="mx-4">
			<div className="flex flex-col items-center justify-center my-10 gap-y-[5px]">
				<p className="text-5xl font-bold mb-10">
					Find Available Jobs
				</p>
				<p className="font-semibold text-2xl">
					Gain Real-World Experience
				</p>
				<p className="italic">
					Apply your skills in professional settings and build a strong resume.
				</p>
				<p className="font-semibold text-2xl">
				  Exclusive Opportunities
				</p>
				<p className="italic">
					Apply your skills in professional settings and build a strong resume.
				</p>
				<p className="font-semibold text-2xl">
					Flexible Work Options
				</p>
				<p className="italic">
					Find positions that fit around your class schedule.
				</p>
				<p className="font-semibold text-2xl">
					Career Growth
				</p>
				<p className="italic">
					Network with professionals and open doors for future opportunities.
				</p>
				<p className="font-semibold text-2xl">
					Easy & Convenient
				</p>
				<p className="italic">
					A simple way to connect with employers who value student talent.
				</p>
			</div>
			<hr className="my-4 max-w-screen-xl mx-auto"/>
			{
				jobListings?.length > 0 ? 
				<div className="grid grid-cols-1 lg:grid-cols-2">
					{	
						jobListings?.map((job) => (
							<Card key={job.id} className="border m-2 h-[450px] flex justify-between flex-col">
								<div>
									<CardHeader className="-mb-2">
										<CardTitle className="text-2xl -mb-2">{job.company}</CardTitle>
										<CardDescription className="text-md">{job.position}</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="font-semibold text-xl">Job Description</p>
										<p className="overflow-auto h-[200px] hyphens-auto"> {job.description}</p>
										<div className="flex justify-left mt-4 gap-x-10">
											<p><span className="font-semibold">Hourly Pay:</span> {job.pay} </p>
											<p><span className="font-semibold">Weekly Hours</span>: {job.hours} </p>
										</div>
									</CardContent>
								</div>
								<div>
								<CardFooter className="flex justify-end">
									<Link href={"/find-jobs/" + job.id}>
										<Button type="submit">
												Apply
										</Button>			
									</Link>
								</CardFooter>
								</div>
							</Card>
						))
					}
				</div>
				:
				<div className="flex justify-center items-center min-h-screen">
					<p className="text-3xl font-semibold">
						No current jobs are open.
					</p>
				</div>	
			}
		</div>
	)
}