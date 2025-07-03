import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.resolve('data');

export const readJson = async (file) => {
  const filePath = path.join(dataDir, file);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
};

export const writeJson = async (file, data) => {
  const filePath = path.join(dataDir, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
