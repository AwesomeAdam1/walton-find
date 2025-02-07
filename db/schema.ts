import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
	id: text("id").primaryKey(),
	company: text("company").notNull(),
	position: text("position").notNull(),
	pay: text("pay").notNull(),
	hours: text("hours").notNull(),
	description: text("description").notNull(),
	contact: text("contact").notNull(),
	userId: text("user_id").notNull()
});

export const jobRelations = relations(jobs, ({ many }) => ({
	applications: many(applications)
}))

export const applications = pgTable("applications", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	age: text("age").notNull(),
	contact: text("contact").notNull(),
	info: text("info").notNull(),
	appliedPostId: text("appliedPostId").notNull(),
	userId: text("user_id").notNull()
});

export const applicationsRelations = relations(applications, ({ one }) => ({
	job: one(jobs, {
		fields: [applications.appliedPostId],
		references: [jobs.id]
	})
}))