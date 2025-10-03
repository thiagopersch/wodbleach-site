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

interface ElementsSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function ElementsSection({ form }: ElementsSectionProps) {
  const isElementsEnabled = form.watch('is_elements');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resistências Elementais</CardTitle>
        <CardDescription>
          Configure as resistências e fraquezas elementais do monstro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_elements"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Sistema de Elementos
                </FormLabel>
                <FormDescription>
                  Ativar resistências elementais personalizadas
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

        {isElementsEnabled && (
          <>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Valores:</strong> 100 = imune, 0 = normal, valores
                negativos = fraqueza, valores positivos = resistência
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="element_fire_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fire %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência ao fogo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_energy_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Energy %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência à energia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_ice_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ice %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência ao gelo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_poison_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poison %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência ao veneno</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_holy_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Holy %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência ao sagrado</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_death_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Death %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência à morte</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_drown_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drown %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência ao afogamento</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_physical_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Physical %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência física</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_lifeDrain_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Life Drain %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Resistência ao dreno de vida
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_manaDrain_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mana Drain %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Resistência ao dreno de mana
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_healing_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Healing %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência à cura</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="element_undefined_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Undefined %</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Resistência indefinida</FormDescription>
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
