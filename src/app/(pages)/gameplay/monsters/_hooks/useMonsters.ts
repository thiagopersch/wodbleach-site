'use client';

import { monstersApi } from '@/lib/api/monsters/monsters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

export function useMonsters() {
  return useQuery({
    queryKey: ['monsters'],
    queryFn: monstersApi.getAll,
  });
}

export function useMonster(id: string) {
  return useQuery({
    queryKey: ['monsters', id],
    queryFn: () => monstersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateMonster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: monstersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monsters'] });
      toast.success('Monstro criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(
        error.message === 'Já existe um monstro com este nome'
          ? 'Já existe um monstro com este nome'
          : error.response?.data?.error || 'Erro ao criar monstro',
      );
    },
  });
}

export function useUpdateMonster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      monstersApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['monsters'] });
      queryClient.invalidateQueries({ queryKey: ['monsters', data.id] });
      toast.success('Monstro atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(
        error.message === 'Já existe um monstro com este nome'
          ? 'Já existe um monstro com este nome'
          : error.response?.data?.error || 'Erro ao atualizar monstro',
      );
    },
  });
}

export function useDeleteMonster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: monstersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monsters'] });
      toast.success('Monstro excluído com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Erro ao excluir monstro');
    },
  });
}

export function useExportMonsterXml() {
  return useMutation({
    mutationFn: monstersApi.exportToXml,
    onSuccess: () => {
      toast.success('XML exportado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Erro ao exportar XML');
    },
  });
}

export function useImportMonsterXml() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: monstersApi.importFromXml,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monsters'] });
      toast.success('Monstro importado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error === 'Já existe um monstro com este nome'
          ? 'Já existe um monstro com este nome'
          : error.response?.data?.error || 'Erro ao importar monstro',
      );
    },
  });
}
