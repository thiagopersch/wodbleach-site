import axios from 'axios';
import { Monster, MonsterFormData } from './schemas';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const monstersApi = {
  // Get all monsters
  getAll: async (): Promise<Monster[]> => {
    const response = await api.get('/monsters');
    return response.data;
  },

  // Get monster by ID
  getById: async (id: string): Promise<Monster> => {
    const response = await api.get(`/monsters/${id}`);
    return response.data;
  },

  // Create new monster
  create: async (data: MonsterFormData): Promise<Monster> => {
    const response = await api.post('/monsters', data);
    return response.data;
  },

  // Update monster
  update: async (id: string, data: Partial<MonsterFormData>): Promise<Monster> => {
    const response = await api.put(`/monsters/${id}`, data);
    return response.data;
  },

  // Delete monster
  delete: async (id: string): Promise<void> => {
    await api.delete(`/monsters/${id}`);
  },

  // Export monster to XML
  exportToXml: async (id: string): Promise<string> => {
    const response = await api.get(`/monsters/${id}/export`);
    return response.data.xml;
  },

  // Import monster from XML
  importFromXml: async (xml: string): Promise<Monster> => {
    const response = await api.post('/monsters/import', { xml });
    return response.data;
  },

  // Get monster statistics
  getStats: async () => {
    const response = await api.get('/monsters/stats');
    return response.data;
  },
};
