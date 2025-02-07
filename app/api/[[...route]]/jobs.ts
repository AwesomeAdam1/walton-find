import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { jobs } from '@/db/schema';

import { database } from "@/db/database";
import { v4 } from "uuid";

const app = new Hono()
	.use('*', clerkMiddleware())
	.get("/", async (c) => {
			const auth = getAuth(c)
			
			if (!auth?.userId) {
				return c.json({ error: "Unauthorized" }, 401)
			}

			const data = await database
				.select()
				.from(jobs)
				//@ts-ignore
				.where(eq(auth.userId, jobs.userId));

			return c.json({ data })
		}
	)
	.post("/", async (c) => {
			const auth = getAuth(c);
			const values = await c.req.json(); 
	
			if (!auth?.userId) {
				return c.json({ error: "Unauthorized" }, 401)
			}
	
			const [data] = await database.insert(jobs).values({
				id: v4(),
				userId: auth.userId,
				...values,
			}).returning()
	
			return c.json({ data })
		}
	)	
	.delete("/:id", async (c) => {
		const auth = getAuth(c);
		const id = c.req.param("id")

		if (!auth?.userId) {
			return c.json({ error: "Unauthorized" }, 401)
		}

		const [data] = await database
				.delete(jobs)
				.where(
					and(
						eq(jobs.userId, auth.userId),
						eq(jobs.id, id)
					)
				)
				.returning({
					id: jobs.id
				})

			if (!data) {
				return c.json({ error: "Not found"}, 404)
			}

		return c.json({ data })
	}
)	


export default app;
