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
import { Textarea } from '@/components/ui/textarea';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

interface VoicesSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function VoicesSection({ form }: VoicesSectionProps) {
  const isVoicesEnabled = form.watch('is_voices');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'voices',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Vozes</CardTitle>
        <CardDescription>
          Configure as falas do monstro durante o combate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_voices"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Sistema de Vozes
                </FormLabel>
                <FormDescription>
                  Ativar falas automáticas do monstro
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

        {isVoicesEnabled && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="voices_interval"
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
                      Intervalo entre falas (ms)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="voices_chance"
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
                    <FormDescription>Chance de falar (%)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Frases</h4>
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name={`voices.${index}.voice_sentence`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frase</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: MUHAHAHAHA!, Your soul will be mine!"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Frase que o monstro irá falar (máximo 100 caracteres)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`voices.${index}.voice_yell`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Gritar</FormLabel>
                          <FormDescription>
                            A fala será em formato de grito (maiúscula e mais
                            visível)
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

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remover Frase
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({ voice_sentence: '', voice_yell: false })
                }
              >
                Adicionar Frase
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Dica:</strong> Use frases curtas e impactantes. Frases
                muito longas podem ser cortadas no jogo. Exemplos:
                "MUHAHAHAHA!", "Your resistance is futile!", "I SMELL
                FEEEEEAAAR!"
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
