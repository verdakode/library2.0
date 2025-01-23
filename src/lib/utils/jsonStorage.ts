import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

export async function readJsonFile<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // File doesn't exist, return empty array or object based on type
      return (Array.isArray([]) ? [] : {}) as T;
    }
    throw error;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
}

export async function appendToJsonArray<T>(filename: string, item: T): Promise<void> {
  try {
    const data = await readJsonFile<T[]>(filename);
    if (!Array.isArray(data)) {
      throw new Error('File content is not an array');
    }
    data.push(item);
    await writeJsonFile(filename, data);
  } catch (error) {
    console.error('Error appending to JSON array:', error);
    throw error;
  }
} 