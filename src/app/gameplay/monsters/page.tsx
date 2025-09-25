'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Plus, Search, Upload } from 'lucide-react';
import { useState } from 'react';

import { MonsterForm } from '@/components/monsters/forms/monster-form';
import { ImportXmlDialog } from '@/components/monsters/import-xml-dialog';
import { MonsterStats } from '@/components/monsters/monster-stats';
import { MonsterTable } from '@/components/monsters/monster-table';
import { useCreateMonster, useMonsters } from './_hooks/useMonsters';

export default function MonsterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [raceFilter, setRaceFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const { data: monstersData, isLoading } = useMonsters();
  const createMonster = useCreateMonster();

  const monsters = Array.isArray(monstersData) ? monstersData : [];

  // Filter monsters based on search and race
  const filteredMonsters = monsters.filter((monster) => {
    const matchesSearch =
      monster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monster.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRace = raceFilter === 'all' || monster.race === raceFilter;
    return matchesSearch && matchesRace;
  });

  const handleCreateMonster = async (data: any) => {
    await createMonster.mutateAsync(data);
    setShowCreateDialog(false);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Monster CRUD</h1>
              <p className="text-muted-foreground text-pretty">Gerencie monstros para seu servidor OTServ de Tibia</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowStatsDialog(true)}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Estatísticas
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowImportDialog(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Importar XML
              </Button>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Monstro
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Monstros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monsters.length}</div>
              <p className="text-muted-foreground text-xs">monstros cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">XP Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {monsters.reduce((sum, m) => sum + (m.experience || 0), 0).toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">experiência total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Raça Mais Comum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {monsters.length > 0
                  ? Object.entries(
                      monsters.reduce(
                        (acc, m) => {
                          acc[m.race] = (acc[m.race] || 0) + 1;
                          return acc;
                        },
                        {} as Record<string, number>,
                      ),
                    ).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'
                  : 'N/A'}
              </div>
              <p className="text-muted-foreground text-xs">raça predominante</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">HP Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {monsters.length > 0
                  ? Math.round(monsters.reduce((sum, m) => sum + (m.health_max || 0), 0) / monsters.length)
                  : 0}
              </div>
              <p className="text-muted-foreground text-xs">vida média</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre e pesquise monstros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Pesquisar por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={raceFilter} onValueChange={setRaceFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filtrar por raça" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as raças</SelectItem>
                  <SelectItem value="blood">Blood</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="venom">Venom</SelectItem>
                  <SelectItem value="undead">Undead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(searchTerm || raceFilter !== 'all') && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Filtros ativos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Busca: {searchTerm}
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {raceFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1 capitalize">
                    Raça: {raceFilter}
                    <button
                      onClick={() => setRaceFilter('all')}
                      className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monster Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monstros</CardTitle>
                <CardDescription>
                  {filteredMonsters.length} de {monsters.length} monstros
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MonsterTable monsters={filteredMonsters} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>

      {/* Create Monster Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto max-md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Monstro</DialogTitle>
          </DialogHeader>
          <MonsterForm mode="create" onSubmit={handleCreateMonster} isLoading={createMonster.isPending} />
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Estatísticas dos Monstros</DialogTitle>
          </DialogHeader>
          <MonsterStats />
        </DialogContent>
      </Dialog>

      {/* Import XML Dialog */}
      <ImportXmlDialog open={showImportDialog} onOpenChange={setShowImportDialog} />
    </div>
  );
}
