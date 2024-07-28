"use server";

import validateRequest from "@/lib/validate-request";
import { TParamsGetOne } from "@/repositories/category/index.types"
import CategoryRepository from "@/repositories/category"

export default async function getOneCategory(params: TParamsGetOne) {
  // validate the user session
  const result = await validateRequest();
  if (!result.user) {
    throw new Error("Unauthorized");
  }

  // get one category
  const repository = new CategoryRepository();
  return repository.getOne(params);
}