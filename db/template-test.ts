import { database } from "@/db/database"
import { jobs } from '@/db/schema';
import { eq } from "drizzle-orm";
import { v4 } from "uuid";

export const getData = async () => {
  const users = await database.select().from(jobs);
  return users
}

export const rtnHi = async () => {
  return "hi"
}

async function main() {
  const user: typeof jobs.$inferInsert = {
    id: v4(),
		position: "position",
		description: "description",
		userId: "userId"
  };

  // await database.insert(jobs).values(user);
  // console.log('New user created!')

  const users = await database.select().from(jobs);
  console.log('Getting all users from the database: ', typeof users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  // await database
  //   .update(jobs)
  //   .set({
  //     position: "new position",
  //   })
  //   .where(eq(jobs.position, user.position));
  // console.log('User info updated!')

  // await database.delete(jobs).where(eq(jobs.position, user.position));
  // console.log('User deleted!')
}

main();
