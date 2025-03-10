import type { GetCategoriesRepository } from "../../protocols/get-categories-repository"
import type { CategoryModel, GetCategories } from "./db-get-category.protocols"


export class DbGetCategories implements GetCategories {
  private readonly getCategoriesRepository: GetCategoriesRepository

  constructor (getMovies: GetCategoriesRepository) {
    this.getCategoriesRepository = getMovies
  }
  async get (): Promise<CategoryModel[] | []> {
    const movies = await this.getCategoriesRepository.get()
    return movies
  }
}