import { set, ref, get, query, orderByChild, equalTo, push, remove, update } from "firebase/database";
import { database } from "./firebase";
import { BaseWithKey } from "../dto/common.dto";


class BaseRepo<T> {
  private readonly tableName;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getItemsByCriteria = async <U extends T & BaseWithKey>(criteria: Partial<U>, matchAll: boolean = true): Promise<U[]> => {
    const dbRef = ref(database, this.tableName);
    const items: U[] = [];

    if (Object.keys(criteria).length === 1) {
      const [key, value] = Object.entries(criteria)[0];
      const itemQuery = query(dbRef, orderByChild(key), equalTo(value));
      const snapshot = await get(itemQuery);

      snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val() as U;
        items.push({ ...item, id: childSnapshot.key as string });
      });
      return items;
    }

    const snapshot = await get(dbRef);
    snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val() as U;
      let matches = matchAll;

      for (const key in criteria) {
        const match = criteria[key as keyof U] === item[key as keyof U];
        if (matchAll) {
          matches = matches && match;
        } else {
          matches = matches || match;
        }
      }

      if (matches) {
        items.push({ ...item, id: childSnapshot.key as string });
      }
    });

    return items;
  };

  getAllItems = async <U extends T & BaseWithKey>(): Promise<U[]> => {
    const itemsRef = ref(database, this.tableName);
    const snapshot = await get(itemsRef);

    const items: U[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const itemData = childSnapshot.val() as U;
        items.push({ ...itemData, id: childSnapshot.key as string });
      });
    }

    return items;
  };

  getItem = async <U extends T & BaseWithKey>(itemId: string): Promise<U | null> => {
    const itemRef = ref(database, `${this.tableName}/${itemId}`);
    const snapshot = await get(itemRef);

    if (snapshot.exists()) {
      return { ...snapshot.val() as U, id: snapshot.key as string };
    } else {
      return null;
    }
  };

  createItem = async (item: T): Promise<{ success: boolean, id?: string }> => {
    const itemsRef = ref(database, this.tableName);
    const newItemRef = push(itemsRef);
    const itemId = newItemRef.key;

    await set(newItemRef, item);

    return itemId ? { success: true, id: itemId } : { success: false };
  };

  deleteItem = async (itemId: string): Promise<{ success: boolean }> => {
    const itemRef = ref(database, `${this.tableName}/${itemId}`);

    await remove(itemRef);

    return { success: true };
  };

  
  updateItem = async (itemId: string, updatedData: Partial<T>): Promise<boolean> => {
    const itemRef = ref(database, `${this.tableName}/${itemId}`);
    try {
      await update(itemRef, updatedData);
      console.log(`Item with ID: ${itemId} updated successfully`);
      return true; 
    } catch (error) {
      console.error("Error updating item:", error);
      return false; 
    }
  };

  updateItemWithCriteria = async <U extends T & BaseWithKey>(searchData: Partial<U>, updatedData: Partial<T>, matchAll: boolean = true): Promise<boolean> => {
    const items = await this.getItemsByCriteria(searchData, matchAll);
    let result = false
    if (items.length > 0) {
      result = await this.updateItem(items[0].id, updatedData);
    }
    return result;
  };
}

export default BaseRepo;
