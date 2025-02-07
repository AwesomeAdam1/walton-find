import { Hono } from "hono"
import { handle } from "hono/vercel"

import jobs from "./jobs"
import applications from "./applications"

export const runtime = "edge"

const app = new Hono().basePath('/api')

const routes = app
  .route("/jobs", jobs)
  .route("/applications", applications)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;