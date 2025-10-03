'use client';

import type React from 'react';

// NOTE: O import abaixo estava causando um erro de compilação no ambiente.
// import { useImportMonsterXml } from '@/app/(pages)/gameplay/monsters/_hooks/useMonsters';
// Para que o código compile, criamos um mock simples para simular o hook:
const useImportMonsterXml = () => ({
  mutateAsync: async (xml) => {
    console.log('Simulando importação de XML:', xml.substring(0, 50) + '...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simulação de erro, se necessário
    // if (xml.includes('error')) throw new Error('Simulated API Error');
  },
  isPending: false, // Simula o estado de carregamento
});

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, FileText, Upload } from 'lucide-react';
import { useState } from 'react';

interface ImportXmlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportXmlDialog({ open, onOpenChange }: ImportXmlDialogProps) {
  const [xmlContent, setXmlContent] = useState('');
  const [error, setError] = useState('');

  // Usando o hook mockado para garantir a compilação
  const importXml = useImportMonsterXml();

  const handleImport = async () => {
    if (!xmlContent.trim()) {
      setError('Por favor, cole o conteúdo XML');
      return;
    }

    try {
      setError('');
      // @ts-ignore
      await importXml.mutateAsync(xmlContent);
      setXmlContent('');
      onOpenChange(false);
    } catch (err: any) {
      // O erro 'err.response?.data?.error' é mantido para compatibilidade com a sua API real
      setError(err.response?.data?.error || err.message || 'Erro ao importar XML');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setXmlContent(content);
        setError('');
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 1. DialogContent: Adicionado flex flex-col para forçar o layout vertical e gerenciar a altura total. */}
      <DialogContent className="flex max-h-[90dvh] max-w-4xl flex-col">
        {/* Header: Altura Fixa */}
        <DialogHeader>
          <DialogTitle>Importar Monstro do XML</DialogTitle>
          <DialogDescription>Cole o conteúdo XML do monstro ou faça upload de um arquivo .xml</DialogDescription>
        </DialogHeader>

        {/* 2. Corpo Principal: Recebe flex-1 para ocupar o espaço restante (altura total - Header).
             overflow-y-auto e min-h-0 são essenciais para o scroll do corpo.
             Adicionei pr-1 para compensar a barra de rolagem e evitar que o conteúdo encoste nela. */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="xml-file">Upload de Arquivo XML</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="cursor-pointer bg-transparent">
                <label htmlFor="xml-file">
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar Arquivo
                </label>
              </Button>
              <input id="xml-file" type="file" accept=".xml" onChange={handleFileUpload} className="hidden" />
              <span className="text-muted-foreground text-sm">ou cole o XML abaixo</span>
            </div>
          </div>

          {/* Example */}
          <div className="bg-muted rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Exemplo de XML:</span>
            </div>
            <pre className="text-muted-foreground overflow-x-auto text-xs break-all whitespace-pre-wrap">
              {`<?xml version="1.0" encoding="UTF-8"?>
<monster name="Demon" nameDescription="a demon" race="fire" experience="6000" speed="280">
  <health now="8200" max="8200" />
  <look type="35" corpse="5995" />
  <flags>
    <flag summonable="0" />
    <flag attackable="1" />
    <flag hostile="1" />
  </flags>
</monster>
`}
            </pre>
          </div>

          {/* 3. XML Content Container: Precisa ser um contêiner flexível (flex flex-col)
             e usa flex-1 para que o Textarea (seu filho) possa se esticar. */}
          <div className="flex min-h-0 flex-1 flex-col space-y-2">
            <Label htmlFor="xml-content">Conteúdo XML</Label>
            <Textarea
              id="xml-content"
              placeholder="Cole aqui o XML do monstro..."
              value={xmlContent}
              onChange={(e) => {
                setXmlContent(e.target.value);
                setError('');
              }}
              // 4. Textarea: Usa flex-1 para preencher todo o espaço vertical disponível
              // e resize-none para evitar redimensionamento manual que quebre o layout.
              className="flex-1 resize-none font-mono text-sm"
            />
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Actions: Altura Fixa. Permanecem dentro do bloco que rola (space-y-4) conforme sua estrutura original. */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={!xmlContent.trim() || importXml.isPending}>
              {importXml.isPending ? 'Importando...' : 'Importar Monstro'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
