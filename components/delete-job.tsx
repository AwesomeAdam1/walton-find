"use client"

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { client } from "@/lib/hono"
import { useRouter } from "next/navigation"

export const DeleteJob = ({ id, flag, setFlag }: { id: string, flag: boolean, setFlag: (param: boolean) => void }) => {
	const router = useRouter()

	const onSubmit = async () => {
		const response = await client.api.jobs[":id"]["$delete"]({ 
			param: { id },
		 })
		const data = await response.json()
		console.log("delete data:", data)
		setFlag(!flag)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="submit" className="bg-red-500 hover:bg-red-500/80">
					Delete
				</Button>	
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your job post
						and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="submit" className="bg-red-500 hover:bg-red-500/80" onClick={onSubmit}>
							Delete
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>	
	)
}