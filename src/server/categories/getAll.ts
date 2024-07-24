"use server";

import CategoryRepository from "./repository";
import validateRequest from "@/lib/validate-request";

export default async function getAllCategories() {
  // validate the user session
  const result = await validateRequest();
  if (!result.user) {
    throw new Error("Unauthorized");
  }

  // get all categories
  const repository = new CategoryRepository();
  return repository.getAll(result.user.id);
}