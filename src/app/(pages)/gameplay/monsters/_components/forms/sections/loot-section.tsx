'use client';

import { MonsterFormData } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
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

interface LootSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function LootSection({ form }: LootSectionProps) {
  const isLootEnabled = form.watch('is_loot');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'loot',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Loot</CardTitle>
        <CardDescription>
          Configure os itens que o monstro pode dropar ao morrer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_loot"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Sistema de Loot
                </FormLabel>
                <FormDescription>
                  Permitir que o monstro drope itens ao morrer
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

        {isLootEnabled && (
          <>
            <FormField
              control={form.control}
              name={`loot.${fields.length}.is_inside_container`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Loot Dentro de Bag</FormLabel>
                    <FormDescription>
                      Os itens serão dropados dentro de uma bag
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Configurações de Loot</h4>
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name={`loot.${index}.useItemId`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Usar ID do Item</FormLabel>
                          <FormDescription>
                            Escolha entre ID ou nome do item
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch(`loot.${index}.useItemId`) ? (
                    <FormField
                      control={form.control}
                      name={`loot.${index}.loot_item_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID do Item</FormLabel>
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
                            ID do item no servidor
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name={`loot.${index}.loot_item_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Item</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: gold coin, sword"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Nome do item (para referência)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`loot.${index}.loot_item_chance`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chance (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              value={Math.round(field.value / 1000) || 0}
                              onChange={(e) => {
                                const value =
                                  Number.parseInt(e.target.value) || 0;
                                field.onChange(value * 1000);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Chance de drop (0-100%)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`loot.${index}.loot_item_countmax`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade Máxima</FormLabel>
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
                            Quantidade máxima do item
                          </FormDescription>
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
                    Remover Item
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    useItemId: true,
                    is_inside_container: false,
                    loot_item_id: 0,
                    loot_item_name: '',
                    loot_item_chance: 0,
                    loot_item_countmax: 0,
                  })
                }
              >
                Adicionar Item de Loot
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Dica:</strong> Adicione múltiplos itens usando o botão
                acima. A chance é informada em % e convertida internamente para
                o formato 0-100000.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
