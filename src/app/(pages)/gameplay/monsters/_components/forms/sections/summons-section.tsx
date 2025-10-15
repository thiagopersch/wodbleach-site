'use client';

import type { MonsterFormData } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
import { Button } from '@/components/ui/button';
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
import { useFieldArray } from 'react-hook-form';

interface SummonsSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function SummonsSection({ form }: SummonsSectionProps) {
  const isSummonsEnabled = form.watch('is_summons');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'summons',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Summons</CardTitle>
        <CardDescription>
          Configure a capacidade do monstro de invocar outros monstros
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_summons"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Sistema de Summons
                </FormLabel>
                <FormDescription>
                  Permitir que o monstro invoque outros monstros
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

        {isSummonsEnabled && (
          <>
            <FormField
              control={form.control}
              name="summons_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máximo de Summons</FormLabel>
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
                    Número máximo de criaturas que podem ser invocadas
                    simultaneamente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Configurações de Summon</h4>
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name={`summons.${index}.summon_name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Monstro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: fire elemental, skeleton"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Nome do monstro que será invocado (máximo 100
                          caracteres)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name={`summons.${index}.summon_interval`}
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
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Intervalo entre invocações (ms)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`summons.${index}.summon_chance`}
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
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Chance de invocar (%)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`summons.${index}.summon_max`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Máximo por Invocação</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>Máximo por vez</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remover Summon
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    summon_name: '',
                    summon_interval: 0,
                    summon_chance: 0,
                    summon_max: 0,
                  })
                }
              >
                Adicionar Summon
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Dica:</strong> O nome do monstro deve corresponder
                exatamente ao nome definido no arquivo de monstros do servidor.
                Certifique-se de que o monstro existe antes de configurar o
                summon.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
