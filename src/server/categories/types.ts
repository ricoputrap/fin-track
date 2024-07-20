import { ICategory } from "@/db/schema";
import { TGetMultipleResults } from "@/server/types"

interface ICategoryAPI {
  getAll: (userId: string) => Promise<TGetMultipleResults<ICategory>>;
}

export default ICategoryAPI;