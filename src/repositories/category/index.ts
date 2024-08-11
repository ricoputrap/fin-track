import { and, eq, or } from "drizzle-orm";
import { categories, ICategory, INewCategory } from "@/db/schema";
import db from "@/db";
import ICategoryRepository, { TParamsGetOne } from "./index.types";

class CategoryRepository implements ICategoryRepository {
  async getAll(userId: string): Promise<ICategory[]> {
    const result = await db
      .select()
      .from(categories)
      .where(
        eq(categories.userId, userId)
      )
      .orderBy(categories.name);

    return result;
  }

  async getOne({ userId, id, name, type }: TParamsGetOne): Promise<ICategory | undefined> {
    // construct the where clause if id, name, and type is provided
    if (!id && !name && !type) {
      return undefined;
    }

    const result = await db
      .select()
      .from(categories)
      .where(
        and(
          eq(categories.userId, userId),
          or(
            id ? eq(categories.id, id) : undefined,
          ),
          or(
            name ? eq(categories.name, name) : undefined,
          ),
          or(
            type ? eq(categories.type, type) : undefined,
          ),
        )
      )

    // not found
    if (result.length == 0)
      return undefined

    return result[0];
  }

  async addCategory(category: INewCategory): Promise<ICategory> {
    const result = await db
      .insert(categories)
      .values(category)
      .returning();

    return result[0];
  }

  async editCategory(id: number, category: INewCategory): Promise<ICategory> {
    const result = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();

    return result[0];
  }

  async deleteCategory(id: number): Promise<void> {
    await db
      .delete(categories)
      .where(eq(categories.id, id));
  }
}

export default CategoryRepository;