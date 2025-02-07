import { CreateJobForm } from "@/components/create-job-form"

export default function CreateJobsPage() {
	return (
		<div className="mx-4">
			<div className="flex flex-col items-center justify-center my-10 gap-y-10">
				<p className="text-5xl font-semibold">
					Post a Listing
				</p>
			</div>
			<hr className="my-4 max-w-screen-xl mx-auto"/>
			<div className="flex justify-center m-4">
				<div className="w-full max-w-screen-lg">
					<CreateJobForm />
				</div>
			</div>
		</div>
  )
}
