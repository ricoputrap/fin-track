"use server";

import { z } from "zod";
import CategoryRepository from "./repository"
import validateRequest from "@/lib/validate-request";
import { categorySchema } from "@/schemas";

export interface IAddCategoryFormState {
  success: boolean;
  error: {
    form?: {
      name?: string;
      type?: string;
    }
    message?: string;
  }
}

export default async function addCategory(formData: FormData) {
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

  const formValues = {
    name: formData.get("name"),
    type: formData.get("type"),
  };

  // validate the form data
  const parsedForm = categorySchema.safeParse(formValues);
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

  // TODO: validate if category already exists

  const repository = new CategoryRepository();

  const newCategory = await repository.addCategory({
    name,
    type: parseInt(type),
    userId: result.user.id
  });

  console.log("+++++ newCategory:", newCategory);
  return {
    success: true,
    error: {}
  }
}