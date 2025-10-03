'use client';

import type { MonsterFormData } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { UseFormReturn } from 'react-hook-form';

interface DefensesSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function DefensesSection({ form }: DefensesSectionProps) {
  const isDefensesEnabled = form.watch('is_defenses');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Defesas</CardTitle>
        <CardDescription>
          Configure as defesas e resistências do monstro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_defenses"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Sistema de Defesas
                </FormLabel>
                <FormDescription>
                  Ativar sistema de defesas personalizadas
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isDefensesEnabled && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="defenses_armor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Armadura</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Valor de armadura base</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="defenses_defense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Defesa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Valor de defesa base</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Defesa Ativa</h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="defense_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Defesa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: healing, speed" {...field} />
                      </FormControl>
                      <FormDescription>Tipo de defesa ativa</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intervalo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Intervalo entre usos (ms)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_chance"
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
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>Chance de usar (%)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Mínimo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>Valor mínimo do efeito</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Máximo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>Valor máximo do efeito</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_speedchange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mudança de Velocidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>Alteração de velocidade</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="defense_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>Duração do efeito (ms)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_atribute_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chave do Atributo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: areaEffect" {...field} />
                      </FormControl>
                      <FormDescription>
                        Chave do atributo especial
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defense_attribute_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Atributo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: blueshimmer" {...field} />
                      </FormControl>
                      <FormDescription>
                        Valor do atributo especial
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
