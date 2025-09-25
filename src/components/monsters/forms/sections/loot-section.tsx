'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MonsterFormData } from '@/lib/api/monsters/schemas';
import type { UseFormReturn } from 'react-hook-form';

interface LootSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function LootSection({ form }: LootSectionProps) {
  const isLootEnabled = form.watch('is_loot');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Loot</CardTitle>
        <CardDescription>Configure os itens que o monstro pode dropar ao morrer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_loot"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Usar Sistema de Loot</FormLabel>
                <FormDescription>Permitir que o monstro drope itens ao morrer</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {isLootEnabled && (
          <>
            <FormField
              control={form.control}
              name="is_inside"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Loot Dentro de Bag</FormLabel>
                    <FormDescription>Os itens serão dropados dentro de uma bag</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Configuração do Item</h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="loot_item_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID do Item</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>ID do item no servidor</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loot_item_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Item</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: gold coin, sword" {...field} />
                      </FormControl>
                      <FormDescription>Nome do item (para referência)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loot_item_chance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chance</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100000"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Chance de drop (0-100000, onde 100000 = 100%)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loot_item_countmax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade Máxima</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormDescription>Quantidade máxima do item que pode dropar</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="loot_item_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto do Item</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Texto especial no item" {...field} />
                      </FormControl>
                      <FormDescription>Texto personalizado que aparece no item</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="border-t pt-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Dica:</strong> Para adicionar múltiplos itens de loot, você pode criar diferentes monstros
                    ou usar scripts SQL personalizados para inserir múltiplas entradas de loot.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
