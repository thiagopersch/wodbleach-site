'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { MonsterFormData } from '@/lib/api/monsters/schemas.ts';
import type { UseFormReturn } from 'react-hook-form';

interface StrategySectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function StrategySection({ form }: StrategySectionProps) {
  const isStrategyEnabled = form.watch('is_strategy');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Estratégia de Combate</CardTitle>
          <CardDescription>Configure como o monstro se comporta em combate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="is_strategy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Usar Estratégia</FormLabel>
                  <FormDescription>Ativar sistema de estratégia de combate</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {isStrategyEnabled && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="strategy_attack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estratégia de Ataque</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Agressividade do monstro (0-100)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="strategy_defense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estratégia de Defesa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Comportamento defensivo (0-100)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="targetchange_interval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intervalo de Mudança de Alvo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>Tempo em ms para mudar de alvo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetchange_chance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chance de Mudança de Alvo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>Probabilidade de mudar de alvo (%)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
