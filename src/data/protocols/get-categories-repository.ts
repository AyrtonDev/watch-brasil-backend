import type { CategoryModel } from "../../domain/model/category";

export interface GetCategoriesRepository {
  get: () => Promise<CategoryModel[] | []>
}