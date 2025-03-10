import type { CategoryModel } from "../model/category";

export interface GetCategories {
  get: () => Promise<CategoryModel[] | []>
}