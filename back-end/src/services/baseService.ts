import BaseRepo from '../repository/baseRepo';

class BaseService<T> {
  private readonly repo: BaseRepo<T>;

  constructor(repo: BaseRepo<T>) {
    this.repo = repo;
  }

  async getItem(itemId: string): Promise<T | null> {
    try {
      return await this.repo.getItem(itemId);
    } catch (error) {
      console.error(`Error getting item with ID ${itemId}:`, error);
      return null;
    }
  }

  async getAllItems(): Promise<T[] | null> {
    try {
      return await this.repo.getAllItems();
    } catch (error) {
      console.error('Error getting all items:', error);
      return null;
    }
  }

  async createItem(item: T): Promise<{ success: boolean, id?: string }> {
    try {
      const result = await this.repo.createItem(item);
      return result;
    } catch (error) {
      console.error('Error creating item:', error);
      return { success: false };
    }
  }

  async deleteItem(id: string): Promise<{ success: boolean }> {
    try {
      return await this.repo.deleteItem(id);
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      return { success: false };
    }
  }

  async updateItem(itemId: string, updatedData: Partial<T>): Promise<boolean> {
    try {
      return await this.repo.updateItem(itemId, updatedData);
    } catch (error) {
      console.error(`Error updating item with ID ${itemId}:`, error);
      return false;
    }
  }

}

export default BaseService;
