import db from "."
import { INewUser, categories, users } from "./schema"

const startSeeding = async () => {
  // seed a user
  console.log("Seeding user...")
  const newUser: INewUser = {
    id: "1",
    name: "John Doe",
    email: "2vYgB@example.com",
    password: "password"
  }

  await db.insert(users).values(newUser);

  console.log("Seeding done!")

  // seeding a category
  console.log("Seeding categories...")
  await db.insert(categories).values({
    name: "Food",
    type: 1,
    userId: "1"
  });

  await db.insert(categories).values({
    name: "Monthly Salary",
    type: 0,
    userId: "1"
  })
  console.log("Seeding done!")
}

startSeeding();