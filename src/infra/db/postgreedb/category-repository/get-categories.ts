import type { GetCategoriesRepository } from "../../../../data/protocols/get-categories-repository";
import type { CategoryModel } from "../../../../domain/model/category";
import { PostgreeHelper } from "../helpers/postgree-helper";

export class CategoriesPostgreeRepository implements GetCategoriesRepository {
  async get (): Promise<CategoryModel[] | []> {
    const query = 'SELECT * FROM categories;';
    const result = await PostgreeHelper.client?.query(query)

    if (result === undefined || result.rows.length === 0) {
      return []
    }

    return result.rows
  }
}