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
import { Progress } from '@/components/ui/progress';
import type { UseFormReturn } from 'react-hook-form';

interface HealthSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function HealthSection({ form }: HealthSectionProps) {
  const healthNow = form.watch('healthNow');
  const healthMax = form.watch('healthMax');
  const healthPercentage = healthMax > 0 ? (healthNow / healthMax) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Vida</CardTitle>
          <CardDescription>
            Configure a vida atual e máxima do monstro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="healthNow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HP Inicial *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max={healthMax}
                      placeholder="100"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Vida atual do monstro (máximo: {healthMax})
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="healthMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HP Máximo *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="100"
                    {...field}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 100;
                      field.onChange(value);
                      // Auto-adjust current health if it exceeds max
                      if (healthNow > value) {
                        form.setValue('healthNow', value);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>Vida máxima do monstro</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Health Bar Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Preview da Barra de Vida
              </span>
              <span className="font-mono">
                {healthNow}/{healthMax} ({healthPercentage.toFixed(1)}%)
              </span>
            </div>
            <Progress value={healthPercentage} className="h-3" />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>0</span>
              <span>{healthMax}</span>
            </div>
          </div>

          {/* Health Status Indicator */}
          <div className="bg-muted/50 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  healthPercentage > 75
                    ? 'bg-green-500'
                    : healthPercentage > 50
                      ? 'bg-yellow-500'
                      : healthPercentage > 25
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                }`}
              />
              <span className="text-sm font-medium">
                Status:{' '}
                {healthPercentage > 75
                  ? 'Saudável'
                  : healthPercentage > 50
                    ? 'Ferido'
                    : healthPercentage > 25
                      ? 'Muito Ferido'
                      : 'Crítico'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
