import { Navigation } from "@/components/navigation"
import { UserButton, ClerkLoading, ClerkLoaded, SignedOut, SignInButton, SignedIn } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export const Header = () => {
	return (
		<header className="px-4 py-4 bg-gradient-to-b from-blue-600 to-blue-500">
			<div className="w-full flex items-center justify-between aboslute">
				<div className="flex items-center gap-x-4">
					<Link href={"/"}>
						<Image 
							src={"/favicon.png"}
							width={28}
							height={28}
							alt={"Walton High School Logo"}
						/>
					</Link>
					<Navigation />
				</div>
				<ClerkLoaded>
					<SignedOut>
						<SignInButton>
							<Button
								size="sm"
								variant="outline"
								className={
									"w-full lg:w-auto justify-between font-normal hover:bg-white/20	hover:text-white border-none focus-visible:ring-offset-0" + 
									"focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition bg-transparent"
								}
							>							
								Sign In
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</ClerkLoaded>
				<ClerkLoading>
					<Loader2 className="size-8 animate-spin text-slate-400"/>
				</ClerkLoading>
			</div>
		</header>
	)
}