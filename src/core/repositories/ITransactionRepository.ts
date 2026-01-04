import { Transaction, CreateTransactionDTO, UpdateTransactionDTO, TransactionFilters, MonthlySummary } from '../entities/Transaction';

export interface ITransactionRepository {
  /**
   * Crear una nueva transacción
   */
  create(data: CreateTransactionDTO): Promise<Transaction>;
  
  /**
   * Obtener todas las transacciones de un usuario con filtros opcionales
   */
  getAll(userId: string, filters?: TransactionFilters): Promise<Transaction[]>;
  
  /**
   * Obtener una transacción por ID
   */
  getById(id: string): Promise<Transaction | null>;
  
  /**
   * Actualizar una transacción existente
   */
  update(id: string, data: UpdateTransactionDTO): Promise<Transaction>;
  
  /**
   * Eliminar una transacción por ID
   */
  delete(id: string): Promise<void>;
  
  /**
   * Obtener resumen mensual de transacciones
   */
  getMonthlySummary(userId: string, month: number, year: number): Promise<MonthlySummary>;
}