'use client';

import type React from 'react';

import { useImportMonsterXml } from '@/app/gameplay/monsters/_hooks/useMonsters';
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

  const importXml = useImportMonsterXml();

  const handleImport = async () => {
    if (!xmlContent.trim()) {
      setError('Por favor, cole o conteúdo XML');
      return;
    }

    try {
      setError('');
      await importXml.mutateAsync(xmlContent);
      setXmlContent('');
      onOpenChange(false);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao importar XML');
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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Importar Monstro do XML</DialogTitle>
          <DialogDescription>Cole o conteúdo XML do monstro ou faça upload de um arquivo .xml</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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

          {/* XML Content */}
          <div className="space-y-2">
            <Label htmlFor="xml-content">Conteúdo XML</Label>
            <Textarea
              id="xml-content"
              placeholder="Cole aqui o XML do monstro..."
              value={xmlContent}
              onChange={(e) => {
                setXmlContent(e.target.value);
                setError('');
              }}
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Example */}
          <div className="bg-muted rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Exemplo de XML:</span>
            </div>
            <pre className="text-muted-foreground overflow-x-auto text-xs">
              {`<?xml version="1.0" encoding="UTF-8"?>
<monster name="Demon" nameDescription="a demon" race="fire" experience="6000" speed="280">
  <health now="8200" max="8200" />
  <look type="35" corpse="5995" />
  <flags>
    <flag summonable="0" />
    <flag attackable="1" />
    <flag hostile="1" />
  </flags>
</monster>`}
            </pre>
          </div>

          {/* Actions */}
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
