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
                      <SelectItem value="blood">
                        <span className={getRaceColor('blood')}>Blood</span>
                      </SelectItem>
                      <SelectItem value="energy">
                        <span className={getRaceColor('energy')}>Energy</span>
                      </SelectItem>

                      <SelectItem value="fire">
                        <span className={getRaceColor('fire')}>Fire</span>
                      </SelectItem>
                      <SelectItem value="venom">
                        <span className={getRaceColor('venom')}>Venom</span>
                      </SelectItem>
                      <SelectItem value="undead">
                        <span className={getRaceColor('undead')}>Undead</span>
                      </SelectItem>
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
                      <SelectItem value="0">Nenhuma</SelectItem>
                      <SelectItem value="1">Amarela</SelectItem>
                      <SelectItem value="2">Verde</SelectItem>
                      <SelectItem value="3">Branca</SelectItem>
                      <SelectItem value="4">Vermelha</SelectItem>
                      <SelectItem value="5">Preta</SelectItem>
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
                  Descrição que aparece no jogo (máximo 100 caracteres)
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
                    XP que o monstro dá ao morrer
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
                  <FormDescription>Velocidade de movimento</FormDescription>
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
