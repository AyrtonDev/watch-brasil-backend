import type { CategoryModel } from "../model/category";

export interface GetCategory {
  get: (categoryId: string) => Promise<CategoryModel | null> 
}