import { eq } from "drizzle-orm";
import ICategoryRepository from "./repository.types";
import { categories, ICategory, INewCategory } from "@/db/schema";
import db from "@/db";

class CategoryRepository implements ICategoryRepository {
  async getAll(userId: string): Promise<ICategory[]> {
    const result = await db
      .select()
      .from(categories)
      .where(
        eq(categories.userId, userId)
      );

    return result;
  }

  async addCategory(category: INewCategory): Promise<ICategory> {
    const result = await db
      .insert(categories)
      .values(category)
      .returning();

    return result[0];
  }
}

export default CategoryRepository;