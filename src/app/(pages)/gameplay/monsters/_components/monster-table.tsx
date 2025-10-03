'use client';

import {
  useDeleteMonster,
  useExportMonsterXml,
  useUpdateMonster,
} from '@/app/(pages)/gameplay/monsters/_hooks/useMonsters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Monster } from '@/lib/api/monsters/schemas';
import {
  calculateDifficulty,
  formatExperience,
  getDifficultyColor,
  getRaceBackground,
  getRaceColor,
} from '@/lib/api/monsters/utils/monster-utils';
import { Download, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { MonsterForm } from './forms/monster-form';
import { MonsterPreview } from './forms/monster-preview';

interface MonsterTableProps {
  monsters: Monster[];
  isLoading: boolean;
}

export function MonsterTable({ monsters, isLoading }: MonsterTableProps) {
  const [editingMonster, setEditingMonster] = useState<Monster | null>(null);
  const [viewingMonster, setViewingMonster] = useState<Monster | null>(null);
  const [deletingMonster, setDeletingMonster] = useState<Monster | null>(null);

  const updateMonster = useUpdateMonster();
  const deleteMonster = useDeleteMonster();
  const exportXml = useExportMonsterXml();

  const handleEdit = (monster: Monster) => {
    setEditingMonster(monster);
  };

  const handleView = (monster: Monster) => {
    setViewingMonster(monster);
  };

  const handleDelete = (monster: Monster) => {
    setDeletingMonster(monster);
  };

  const handleExport = async (monster: Monster) => {
    try {
      const xml = await exportXml.mutateAsync(monster.id.toString());

      // Create download link
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${monster.name.toLowerCase().replace(/\s+/g, '_')}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleUpdateMonster = async (data: any) => {
    if (!editingMonster) return;
    await updateMonster.mutateAsync({ id: editingMonster.id.toString(), data });
    setEditingMonster(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMonster) return;
    await deleteMonster.mutateAsync(deletingMonster.id.toString());
    setDeletingMonster(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-muted h-16 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (monsters.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Nenhum monstro encontrado</p>
        <p className="text-muted-foreground mt-1 text-sm">Crie seu primeiro monstro ou ajuste os filtros</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Raça</TableHead>
              <TableHead>HP</TableHead>
              <TableHead>XP</TableHead>
              <TableHead>Velocidade</TableHead>
              <TableHead>Dificuldade</TableHead>
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monsters.map((monster) => {
              const difficulty = calculateDifficulty(monster);
              return (
                <TableRow key={monster.id} className="monster-card">
                  <TableCell>
                    <div>
                      <div className="font-medium">{monster.name}</div>
                      {monster.description && (
                        <div className="text-muted-foreground text-sm">{monster.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRaceBackground(monster.race)}>
                      <span className={getRaceColor(monster.race)}>{monster.race}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">
                      {monster.healthNow}/{monster.healthMax}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{formatExperience(monster.experience)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{monster.speed}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                      {difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(monster)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(monster)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(monster)}>
                          <Download className="mr-2 h-4 w-4" />
                          Exportar XML
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(monster)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit Monster Dialog */}
      <Dialog open={!!editingMonster} onOpenChange={() => setEditingMonster(null)}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Monstro</DialogTitle>
          </DialogHeader>
          {editingMonster && (
            <MonsterForm
              mode="edit"
              initialData={editingMonster}
              onSubmit={handleUpdateMonster}
              isLoading={updateMonster.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Monster Dialog */}
      <Dialog open={!!viewingMonster} onOpenChange={() => setViewingMonster(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Monstro</DialogTitle>
          </DialogHeader>
          {viewingMonster && <MonsterPreview data={viewingMonster} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingMonster} onOpenChange={() => setDeletingMonster(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o monstro "{deletingMonster?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
