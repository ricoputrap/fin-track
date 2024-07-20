
import ICategoryAPI from "./types";
import db from "../../db"
import { ICategory, categories } from "../../db/schema";
import { eq } from "drizzle-orm";

const CategoryAPI: ICategoryAPI = {
  async getAll(userId: string) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data: ICategory[] = await db
        .select()
        .from(categories)
        .where(
          eq(categories.userId, userId)
        );
      return {
        success: true,
        data
      }
    }
    catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.getMessage()
      }
    }
  },
}

export default CategoryAPI;