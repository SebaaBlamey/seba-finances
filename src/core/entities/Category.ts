export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
  createdAt: Date;
}

export interface CreateCategoryDTO {
  userId: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

export interface UpdateCategoryDTO {
  name?: string;
  icon?: string;
  color?: string;
  type?: "income" | "expense";
}
