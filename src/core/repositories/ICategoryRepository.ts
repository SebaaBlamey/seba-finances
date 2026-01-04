import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "../entities/Category";

export interface ICategoryRepository {
  create(data: CreateCategoryDTO): Promise<Category>;
  getAll(userId: string): Promise<Category[]>;
  getById(id: string): Promise<Category | null>;
  update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  delete(id: string): Promise<void>;
}
