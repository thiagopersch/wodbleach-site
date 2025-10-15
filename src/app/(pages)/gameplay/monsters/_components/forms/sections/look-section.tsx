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
import type { UseFormReturn } from 'react-hook-form';

interface LookSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function LookSection({ form }: LookSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aparência Visual</CardTitle>
          <CardDescription>
            Configure como o monstro aparece no jogo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="look_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LookType ID</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="look_type_corpse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Corpse</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Cores do Outfit</h4>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <FormField
                control={form.control}
                name="look_type_head"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabeça</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="3"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Id da cor da head</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="look_type_body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Corpo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Id da cor do body</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="look_type_legs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pernas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Id da cor da legs</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="look_type_feet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pés</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Id da cor da feet</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="look_type_addons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Addons</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="3"
                      placeholder="3"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Quantidade de addons no outfit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="look_type_mount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id da Montaria</FormLabel>
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
                  <FormDescription>Número do id da montaria</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="look_type_typex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>Sexo da outfit</FormDescription>
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
