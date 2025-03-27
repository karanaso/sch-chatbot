
export function storeJsonObject(id: string, data: any): void {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(id, jsonString);
  } catch (error) {
    console.error(`Error storing data for id ${id}:`, error);
  }
}

export function retrieveJsonObject<T>(id: string): T | null {
  try {
    const jsonString = localStorage.getItem(id);
    if (!jsonString) return null;
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error(`Error retrieving data for id ${id}:`, error);
    return null;
  }
}
