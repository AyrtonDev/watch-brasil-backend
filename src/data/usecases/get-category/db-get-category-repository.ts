import type { GetCategory } from "../../../domain/usecases/get-category"
import type { GetCategoryRepository } from "../../protocols/get-category-repository"
import type { CategoryModel } from "./db-get-category.protocols"

export class DbGetCategory implements GetCategory {
  private readonly getCategoryRepository: GetCategoryRepository

  constructor (getCategory: GetCategoryRepository) {
    this.getCategoryRepository = getCategory
  }
  async get (categoryId: string): Promise<CategoryModel | null> {
    const category = await this.getCategoryRepository.get(categoryId)
    return category
  }
}