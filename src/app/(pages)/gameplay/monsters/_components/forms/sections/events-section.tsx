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
import { Trash2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

interface EventsSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function EventsSection({ form }: EventsSectionProps) {
  const isEventsEnabled = form.watch('is_monster_event_script');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'events',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scripts de Eventos</CardTitle>
        <CardDescription>
          Configure scripts personalizados para eventos do monstro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_monster_event_script"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Scripts de Eventos
                </FormLabel>
                <FormDescription>
                  Ativar scripts personalizados para o monstro
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

        {isEventsEnabled && (
          <>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Eventos</h4>
              <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                <p className="text-muted-foreground text-xs">
                  <strong>Nota:</strong> O script deve existir no servidor para
                  funcionar corretamente.
                </p>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`events.${index}.event_name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Nome do Evento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: KillingInTheNameOf"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Nome do script de evento
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => append({ event_name: '' })}>
                Adicionar um novo
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
