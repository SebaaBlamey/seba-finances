import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/core/entities/Category";
import { ICategoryRepository } from "@/core/repositories/ICategoryRepository";
import { supabase } from "@/infrastructure/services/supabase/client";

export class SupabaseCategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryDTO): Promise<Category> {
    const { data: insertedData, error } = await supabase
      .from("categories")
      .insert({
        user_id: data.userId,
        name: data.name,
        icon: data.icon,
        color: data.color,
        type: data.type,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return this.mapToEntity(insertedData);
  }

  async getAll(userId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId)
      .order("name");

    if (error) throw new Error(error.message);

    return data.map(this.mapToEntity);
  }

  async getById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return this.mapToEntity(data);
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const { data: updatedData, error } = await supabase
      .from("categories")
      .update({
        name: data.name,
        icon: data.icon,
        color: data.color,
        type: data.type,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return this.mapToEntity(updatedData);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(data: any): Category {
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      icon: data.icon,
      color: data.color,
      type: data.type,
      createdAt: new Date(data.created_at),
    };
  }
}
