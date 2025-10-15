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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getRaceColor } from '@/lib/api/monsters/utils/monster-utils';
import type { UseFormReturn } from 'react-hook-form';

interface BasicInfoSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

const races = [
  { value: 'blood', label: 'Blood' },
  { value: 'energy', label: 'Energy' },
  { value: 'fire', label: 'Fire' },
  { value: 'venom', label: 'Venom' },
  { value: 'undead', label: 'Undead' },
];

const skulls = [
  { value: '0', label: 'Nenhuma' },
  { value: '1', label: 'Amarela' },
  { value: '2', label: 'Verde' },
  { value: '3', label: 'Branca' },
  { value: '4', label: 'Vermelha' },
  { value: '5', label: 'Preta' },
];

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Configure o nome, descrição e propriedades fundamentais do monstro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Demon" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome do monstro (máximo 100 caracteres)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="race"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raça *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a raça" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {races.map((race) => (
                        <SelectItem key={race.value} value={race.value}>
                          <span className={getRaceColor(race.value)}>
                            {race.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Tipo de raça do monstro</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skull"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skull</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(Number.parseInt(value))
                    }
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de skull" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skulls.map((skull) => (
                        <SelectItem key={skull.value} value={skull.value}>
                          {skull.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Tipo de skull que o monstro possui
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: a demon"
                    className="resize-none"
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Descrição que aparece ao dar look (máximo 100 caracteres)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiência</FormLabel>
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
                    XP que o monstro dará ao morrer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Velocidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="200"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 200)
                      }
                    />
                  </FormControl>
                  <FormDescription>Velocidade de locomoção</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manacost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custo de Mana</FormLabel>
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
                    Mana necessária para sumonar
                  </FormDescription>
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
