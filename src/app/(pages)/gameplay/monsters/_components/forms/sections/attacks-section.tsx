'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { MonsterFormData } from '@/lib/api/monsters/schemas.ts';
import type { UseFormReturn } from 'react-hook-form';

interface AttacksSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function AttacksSection({ form }: AttacksSectionProps) {
  const isAttacksEnabled = form.watch('is_attacks');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Ataques</CardTitle>
        <CardDescription>Configure os ataques do monstro</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_attacks"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Usar Sistema de Ataques</FormLabel>
                <FormDescription>Ativar sistema de ataques personalizados</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {isAttacksEnabled && (
          <>
            <FormField
              control={form.control}
              name="is_attack_simple"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Ataque Simples</FormLabel>
                    <FormDescription>Usar sistema de ataque simplificado</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="attack_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Ataque</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: melee, fire, energy" {...field} />
                    </FormControl>
                    <FormDescription>Tipo de ataque (máximo 30 caracteres)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_interval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intervalo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2000" {...field} />
                    </FormControl>
                    <FormDescription>Intervalo entre ataques (ms)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dano Mínimo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 50" {...field} />
                    </FormControl>
                    <FormDescription>Dano mínimo do ataque</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dano Máximo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 100" {...field} />
                    </FormControl>
                    <FormDescription>Dano máximo do ataque</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_chance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chance</FormLabel>
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
                    <FormDescription>Chance de usar o ataque (%)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Alcance do ataque (sqm)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="attack_speedchange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mudança de Velocidade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Alteração de velocidade</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Duração do efeito (ms)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alvo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Tipo de alvo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="attack_attribute_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave do Atributo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Chave do atributo especial</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attack_attribute_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Atributo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: fire, energy" {...field} />
                    </FormControl>
                    <FormDescription>Valor do atributo especial</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
