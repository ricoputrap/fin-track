"use server";

import { z } from "zod";
import CategoryRepository from "@/repositories/category"
import validateRequest from "@/lib/validate-request";
import { categorySchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import ICategoryRepository from "@/repositories/category/index.types";

type Category = z.infer<typeof categorySchema>;

export default async function editCategory(id: number, data: Category) {
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

  // validate the form data
  const parsedForm = categorySchema.safeParse(data);
  if (!parsedForm.success) {
    const { name, type } = parsedForm.error.flatten().fieldErrors;
    return {
      success: false,
      error: {
        form: {
          name: name?.[0],
          type: type?.[0]
        }
      }
    };
  }

  const { name, type } = parsedForm.data;

  const repository: ICategoryRepository = new CategoryRepository();

  // validate if category already exists
  const existingCategory = await repository.getOne({
    userId: result.user.id,
    name,
    type: parseInt(type)
  });

  // category already exists
  if (existingCategory) {
    return {
      success: false,
      error: {
        message: "Category already exists."
      }
    }
  }

  await repository.editCategory(id, {
    name, type:
    parseInt(type),
    userId: result.user.id
  });

  revalidatePath("/categories");

  return {
    success: true,
    error: {}
  }
}