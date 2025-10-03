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

interface EventsSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function EventsSection({ form }: EventsSectionProps) {
  const isEventsEnabled = form.watch('is_monster_event_script');

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
            <FormField
              control={form.control}
              name="event_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Evento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: KillingInTheNameOf, MonsterDeath"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Nome do script de evento (máximo 100 caracteres)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/50 space-y-3 rounded-lg p-4">
              <p className="text-sm font-medium">Eventos Comuns:</p>
              <div className="text-muted-foreground grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
                <div>
                  <strong>KillingInTheNameOf</strong> - Evento de morte
                </div>
                <div>
                  <strong>MonsterDeath</strong> - Ao morrer
                </div>
                <div>
                  <strong>MonsterSpawn</strong> - Ao nascer
                </div>
                <div>
                  <strong>MonsterAttack</strong> - Ao atacar
                </div>
                <div>
                  <strong>MonsterDefend</strong> - Ao se defender
                </div>
                <div>
                  <strong>MonsterMove</strong> - Ao se mover
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                <strong>Nota:</strong> O script deve existir no servidor para
                funcionar corretamente. Consulte a documentação do seu OTServ
                para mais detalhes sobre criação de scripts.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
