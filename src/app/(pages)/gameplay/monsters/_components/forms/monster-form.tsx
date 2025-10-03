'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, FileText, Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  defaultMonsterValues,
  MonsterFormData,
  monsterFormSchema,
} from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
import { MonsterPreview } from './monster-preview';
import { AttacksSection } from './sections/attacks-section';
import { BasicInfoSection } from './sections/basic-info-section';
import { DefensesSection } from './sections/defenses-section';
import { ElementsSection } from './sections/elements-section';
import { EventsSection } from './sections/events-section';
import { FlagsSection } from './sections/flags-section';
import { HealthSection } from './sections/health-section';
import { ImmunitiesSection } from './sections/immunities-section';
import { LookSection } from './sections/look-section';
import { LootSection } from './sections/loot-section';
import { StrategySection } from './sections/strategy-section';
import { SummonsSection } from './sections/summons-section';
import { VoicesSection } from './sections/voices-section';
import { XmlPreview } from './xml-preview';

interface MonsterFormProps {
  initialData?: MonsterFormData;
  onSubmit: (data: MonsterFormData) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export function MonsterForm({
  initialData,
  onSubmit,
  isLoading,
  mode,
}: MonsterFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [showPreview, setShowPreview] = useState(false);
  const [showXml, setShowXml] = useState(false);

  const form = useForm<MonsterFormData>({
    resolver: zodResolver(monsterFormSchema) as Resolver<MonsterFormData, any>,
    defaultValues: initialData || defaultMonsterValues,
    mode: 'onChange',
  });

  const handleSubmit = async (data: MonsterFormData) => {
    try {
      await onSubmit(data);
      toast.success(
        mode === 'create'
          ? 'Monstro criado com sucesso!'
          : 'Monstro atualizado com sucesso!',
      );
    } catch (error) {
      toast.error('Erro ao salvar monstro. Tente novamente.');
      console.error('Error saving monster:', error);
    }
  };

  const watchedValues = form.watch();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            {mode === 'create' ? 'Criar novo monstro' : 'Editar monstro'}
          </h1>
          <p className="text-muted-foreground text-sm text-pretty">
            {mode === 'create'
              ? 'Configure todas as propriedades do monstro aqui.'
              : 'Edite as propriedades do monstro aqui.'}
          </p>
        </div>
        <div className="flex flex-col gap-2 max-md:w-full max-md:py-4 md:flex-row md:items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="max-md:w-full"
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Ocultar' : 'Preview'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowXml(!showXml)}
            className="max-md:w-full"
          >
            <FileText className="mr-2 h-4 w-4" />
            {showXml ? 'Ocultar' : 'XML'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <Card className="form-section">
                <CardHeader>
                  <CardTitle>Configuração do Monstro</CardTitle>
                  <CardDescription>
                    Use as abas abaixo para configurar todas as propriedades do
                    monstro
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
                      <TabsTrigger value="basic">Básico</TabsTrigger>
                      <TabsTrigger value="health">Vida</TabsTrigger>
                      <TabsTrigger value="look">Looktype/visual</TabsTrigger>
                      <TabsTrigger value="strategy">Estratégia</TabsTrigger>
                      <TabsTrigger value="flags">Flags</TabsTrigger>
                      <TabsTrigger value="combat">Combate/attacks</TabsTrigger>
                      <TabsTrigger value="advanced">Avançado</TabsTrigger>
                    </TabsList>

                    <div className="mt-6">
                      <TabsContent value="basic" className="tab-content">
                        <BasicInfoSection form={form} />
                      </TabsContent>

                      <TabsContent value="health" className="tab-content">
                        <HealthSection form={form} />
                      </TabsContent>

                      <TabsContent value="look" className="tab-content">
                        <LookSection form={form} />
                      </TabsContent>

                      <TabsContent value="strategy" className="tab-content">
                        <StrategySection form={form} />
                      </TabsContent>

                      <TabsContent value="flags" className="tab-content">
                        <FlagsSection form={form} />
                      </TabsContent>

                      <TabsContent value="combat" className="tab-content">
                        <div className="space-y-6">
                          <AttacksSection form={form} />
                          <DefensesSection form={form} />
                          <ImmunitiesSection form={form} />
                          <ElementsSection form={form} />
                        </div>
                      </TabsContent>

                      <TabsContent value="advanced" className="tab-content">
                        <div className="space-y-6">
                          <VoicesSection form={form} />
                          <SummonsSection form={form} />
                          <EventsSection form={form} />
                          <LootSection form={form} />
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <div className="grid grid-cols-2 gap-6 space-y-6">
                {showPreview && (
                  <Card className="form-section">
                    <CardHeader>
                      <CardTitle>Preview</CardTitle>
                      <CardDescription>Visualização do monstro</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MonsterPreview data={watchedValues} />
                    </CardContent>
                  </Card>
                )}

                {showXml && (
                  <Card className="form-section">
                    <CardHeader>
                      <CardTitle>XML Preview</CardTitle>
                      <CardDescription>Código XML gerado</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <XmlPreview data={watchedValues} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="max-md:w-full"
                >
                  {isLoading && (
                    <Loader2 className="loading-spinner mr-2 h-4 w-4" />
                  )}
                  <Save className="mr-2 h-4 w-4" />
                  {mode === 'create' ? 'Criar Monstro' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
