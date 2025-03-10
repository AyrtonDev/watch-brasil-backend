import type { GetCategoryRepository } from "../../../../data/protocols/get-category-repository";
import type { CategoryModel } from "../../../../domain/model/category";
import { PostgreeHelper } from "../helpers/postgree-helper";


export class CategoryPostgreeRepository implements GetCategoryRepository {
  async get (categoryId: string): Promise<CategoryModel | null> {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const result = await PostgreeHelper.client?.query(query, [categoryId])

    if (result === undefined || result.rows.length === 0) {
      return null
    }

    return result.rows[0]
  }
}