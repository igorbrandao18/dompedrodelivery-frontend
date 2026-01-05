import { ptBR } from './pt-BR';
import { enUS } from './en-US';

export type SupportedLocale = 'pt-BR' | 'en-US';

const dictionaries = {
  'pt-BR': ptBR,
  'en-US': enUS,
} as const;

type Dict = typeof dictionaries['pt-BR'];

const getByPath = (obj: unknown, path: string): unknown => {
  return path
    .split('.')
    .reduce<unknown>((acc, key) => {
      if (!acc || typeof acc !== 'object') return undefined;
      return (acc as Record<string, unknown>)[key];
    }, obj);
};

export const getLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return 'pt-BR';
  const stored = window.localStorage.getItem('locale') as SupportedLocale | null;
  return stored || 'pt-BR';
};

export const setLocale = (locale: SupportedLocale) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('locale', locale);
};

export const t = (key: string, vars?: Record<string, string | number>): string => {
  const locale = getLocale();
  const dict = dictionaries[locale] as Dict;
  const raw = getByPath(dict, key);

  const template = typeof raw === 'string' ? raw : key;

  if (!vars) return template;

  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    template,
  );
};

export const tError = (
  errorCode?: string,
  fallback?: string,
  vars?: Record<string, string | number>,
) => {
  if (!errorCode) return fallback || t('error.INTERNAL_SERVER_ERROR');
  const key = `error.${errorCode}`;
  const translated = t(key, vars);
  return translated === key ? fallback || translated : translated;
};
