"use server";

import CategoryRepository from "@/repositories/category"
import validateRequest from "@/lib/validate-request";

export default async function getAllCategories() {
  // validate the user session
  const result = await validateRequest();
  if (!result.user) {
    throw new Error("Unauthorized");
  }

  // get all categories
  const repository = new CategoryRepository();
  const categories = await repository.getAll(result.user.id);
  return categories;
}