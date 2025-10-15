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
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

interface Attack {
  name: string;
  interval: number;
  min: number;
  max: number;
  chance?: number;
  range?: number;
  skill?: number;
  attack?: number;
  radius?: number;
  target?: number;
  attributes?: Array<{ key: string; value: string }>;
  isSimple?: boolean;
  hasAttributes?: boolean;
}

interface AttacksSectionProps {
  form: UseFormReturn<MonsterFormData>;
}

export function AttacksSection({ form }: AttacksSectionProps) {
  const isAttacksEnabled = form.watch('is_attacks');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attacks',
  });

  const addNewAttack = () => {
    append({
      name: '',
      interval: 2000,
      min: 0,
      max: 0,
      chance: 0,
      range: 0,
      skill: 0,
      attack: 0,
      radius: 0,
      target: 0,
      attributes: [],
      isSimple: true,
      hasAttributes: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Ataques</CardTitle>
        <CardDescription>Configure os ataques do monstro</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="is_attacks"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Usar Sistema de Ataques
                </FormLabel>
                <FormDescription>
                  Ativar sistema de ataques personalizados
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

        {isAttacksEnabled && (
          <>
            {fields.length <= 0 && (
              <div className="flex justify-end gap-4">
                <Button type="button" onClick={addNewAttack}>
                  <Plus className="h-4 w-4" />
                  Adiconar ataque
                </Button>
              </div>
            )}
            {fields.map((field, index) => (
              <Card key={field.id} className="grid p-4">
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    size="icon"
                    onClick={addNewAttack}
                    className="mb-4"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`attacks.${index}.isSimple`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Ataque Simples</FormLabel>
                          <FormDescription>
                            Usar sistema de ataque simplificado
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

                  <FormField
                    control={form.control}
                    name={`attacks.${index}.hasAttributes`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Usar Atributos</FormLabel>
                          <FormDescription>
                            Habilitar atributos especiais para o ataque
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

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`attacks.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Ataque</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: melee, fire, energy"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Tipo de ataque (máximo 30 caracteres)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`attacks.${index}.interval`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intervalo</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 2000"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Intervalo entre ataques (ms)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`attacks.${index}.min`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dano Mínimo</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 50"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Dano mínimo do ataque
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`attacks.${index}.max`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dano Máximo</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 100"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Dano máximo do ataque
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch(`attacks.${index}.isSimple`) ? (
                      <>
                        {form.watch(`attacks.${index}.name`) === 'melee' && (
                          <>
                            <FormField
                              control={form.control}
                              name={`attacks.${index}.skill`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Skill</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Ex: 80"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseInt(e.target.value) || 0,
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Nível de habilidade
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`attacks.${index}.attack`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ataque</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Ex: 120"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseInt(e.target.value) || 0,
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Valor de ataque
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        {form.watch(`attacks.${index}.name`) ===
                          'manadrain' && (
                          <>
                            <FormField
                              control={form.control}
                              name={`attacks.${index}.chance`}
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
                                    Chance de usar o ataque (%)
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`attacks.${index}.range`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Alcance</FormLabel>
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
                                    Alcance do ataque (sqm)
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <FormField
                          control={form.control}
                          name={`attacks.${index}.chance`}
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
                                Chance de usar o ataque (%)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`attacks.${index}.range`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alcance</FormLabel>
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
                                Alcance do ataque (sqm)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>

                  {!form.watch(`attacks.${index}.isSimple`) && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name={`attacks.${index}.radius`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Raio</FormLabel>
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
                              Raio do ataque (sqm)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`attacks.${index}.target`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alvo</FormLabel>
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
                            <FormDescription>Tipo de alvo</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {form.watch(`attacks.${index}.hasAttributes`) && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`attacks.${index}.attributes.0.key`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chave do Atributo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: shootEffect" {...field} />
                            </FormControl>
                            <FormDescription>
                              Chave do atributo especial
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`attacks.${index}.attributes.0.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor do Atributo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: fire" {...field} />
                            </FormControl>
                            <FormDescription>
                              Valor do atributo especial
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`attacks.${index}.attributes.1.key`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chave do Atributo (2)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: areaEffect" {...field} />
                            </FormControl>
                            <FormDescription>
                              Segunda chave do atributo especial
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`attacks.${index}.attributes.1.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor do Atributo (2)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: firearea" {...field} />
                            </FormControl>
                            <FormDescription>
                              Segundo valor do atributo especial
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
