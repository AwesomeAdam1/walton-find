import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { database } from "@/db/database";
import { v4 } from "uuid";
import { applications } from "@/db/schema";

const app = new Hono()
	.use('*', clerkMiddleware())
	.get("/", async (c) => {
			const auth = getAuth(c)
			
			if (!auth?.userId) {
				return c.json({ error: "Unauthorized" }, 401)
			}

			const data = await database
				.select()
				.from(applications);

			return c.json({ data })
		}
	)
.post("/:id", async (c) => {
			const auth = getAuth(c);
			const id = c.req.param("id")
			const values = await c.req.json(); 
	
			if (!auth?.userId) {
				return c.json({ error: "Unauthorized" }, 401)
			}
	
			const [data] = await database.insert(applications).values({
				id: v4(),
				userId: auth.userId,
				appliedPostId: id,
				...values,
			}).returning()
	
			return c.json({ data })
		}
	)	


export default app;
