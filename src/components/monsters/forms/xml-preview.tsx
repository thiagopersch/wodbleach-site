'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MonsterFormData } from '@/lib/api/monsters/schemas.ts';
import { monsterToXml } from '@/lib/api/monsters/utils/monster-utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface XmlPreviewProps {
  data: MonsterFormData;
}

export function XmlPreview({ data }: XmlPreviewProps) {
  const [copied, setCopied] = useState(false);

  const xml = monsterToXml(data as any);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(xml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy XML:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">XML Gerado</span>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 bg-transparent">
          {copied ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>

      <ScrollArea className="bg-muted/50 h-64 w-full rounded-md border p-3">
        <pre className="font-mono text-xs whitespace-pre-wrap">
          <code>{xml}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}
