import { ICategory, INewCategory } from "@/db/schema";

interface ICategoryRepository {
  getAll: (userId: string) => Promise<ICategory[]>;
  addCategory: (category: INewCategory) => Promise<ICategory>;
}

export default ICategoryRepository;