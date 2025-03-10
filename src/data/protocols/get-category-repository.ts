import type { CategoryModel } from "../usecases/get-category/db-get-category.protocols";

export interface GetCategoryRepository {
  get: (movieId: string) => Promise<CategoryModel | null>
}