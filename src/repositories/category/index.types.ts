import { ICategory, INewCategory } from "@/db/schema";

export type TParamsGetOne = {
  userId: string;
  id?: number;
  name?: string;
  type?: number;
}

interface ICategoryRepository {
  getAll: (userId: string) => Promise<ICategory[]>;
  getOne: (params: TParamsGetOne) => Promise<ICategory | undefined>;
  addCategory: (category: INewCategory) => Promise<ICategory>;
  editCategory: (id: number, category: INewCategory) => Promise<ICategory>;
  deleteCategory: (id: number) => Promise<void>;
}

export default ICategoryRepository;