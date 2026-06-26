// src/app/lib/googleSheets.ts

/**
 * Google Sheets Integration
 * Busca dados de uma planilha pública em formato CSV
 */

export interface SheetData {
  headers: string[];
  rows: Record<string, string>[];
}

/**
 * Busca dados de uma planilha Google Sheets pública
 * @param sheetId - ID da planilha (da URL: /d/SHEET_ID/edit)
 * @param gid - Número da aba (opcional, padrão: 0)
 * @returns Dados da planilha em formato de objeto
 */
export async function fetchSheetData(
  sheetId: string,
  gid?: number
): Promise<SheetData | null> {
  try {
    // Construir URL de exportação CSV
    let url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    if (gid !== undefined) {
      url += `&gid=${gid}`;
    }

    console.log('📊 Buscando dados da planilha:', url);

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidar a cada 60 segundos
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }

    const csvText = await response.text();
    const data = parseCSV(csvText);

    console.log(`✅ ${data.rows.length} linhas carregadas`);
    return data;
  } catch (error) {
    console.error('❌ Erro no Google Sheets:', error);
    return null;
  }
}

/**
 * Parse CSV para objeto JavaScript
 */
function parseCSV(csvText: string): SheetData {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Primeira linha = cabeçalhos
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  // Restante = dados
  const rows: Record<string, string>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    
    rows.push(row);
  }

  return { headers, rows };
}

/**
 * Parse uma linha CSV, lidando com valores entre aspas
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current);
  return values;
}

/**
 * Hook para usar dados da planilha em componentes React
 * @param sheetId - ID da planilha
 * @param gid - Número da aba (opcional)
 * @returns Dados, loading e erro
 */
import { useState, useEffect } from 'react';

export function useSheetData(sheetId: string, gid?: number) {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (!sheetId) {
        setError('ID da planilha não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await fetchSheetData(sheetId, gid);
        
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [sheetId, gid]);

  return { data, loading, error };
}