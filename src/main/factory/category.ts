import { DbGetCategories } from "../../data/usecases/get-category/db-get-categories-repository";
import { CategoriesPostgreeRepository } from "../../infra/db/postgreedb/category-repository/get-categories";
import { GetCategoriesController } from "../../presentation/controllers/movie/get-categories";
import { JwtAdapter } from "../../utils/jwt-adapter";

export const makeGetCategoriesController = (): GetCategoriesController => {
  const jwtAdapter = new JwtAdapter()
  const categoriesPostgreeRepository = new CategoriesPostgreeRepository()
  const dbGetCategories = new DbGetCategories(categoriesPostgreeRepository)
  return new GetCategoriesController(dbGetCategories, jwtAdapter)
}