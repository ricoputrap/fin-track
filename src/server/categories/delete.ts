"use server";

import validateRequest from "@/lib/validate-request";
import CategoryRepository from "@/repositories/category";
import { revalidatePath } from "next/cache";

export default async function deleteCategory(id: number) {
  // validate the user session
  const result = await validateRequest();
  if (!result.user) {
    return {
      success: false,
      error: {
        message: "Unauthorized"
      }
    };
  }

  const repository = new CategoryRepository();
  await repository.deleteCategory(id);
  revalidatePath("/categories");

  return {
    success: true,
    error: {}
  };
}