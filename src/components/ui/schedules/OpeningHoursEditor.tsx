'use client';

import { useState } from 'react';
import { t } from '@/i18n';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface DaySchedule {
  enabled: boolean;
  open: string;
  close: string;
}

interface OpeningHoursEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const daysOfWeek = [
  { id: 'monday', short: 'Seg', full: 'Segunda-feira' },
  { id: 'tuesday', short: 'Ter', full: 'Terça-feira' },
  { id: 'wednesday', short: 'Qua', full: 'Quarta-feira' },
  { id: 'thursday', short: 'Qui', full: 'Quinta-feira' },
  { id: 'friday', short: 'Sex', full: 'Sexta-feira' },
  { id: 'saturday', short: 'Sáb', full: 'Sábado' },
  { id: 'sunday', short: 'Dom', full: 'Domingo' },
];

export function OpeningHoursEditor({ value, onChange }: OpeningHoursEditorProps) {
  const [schedules, setSchedules] = useState<Record<string, DaySchedule>>(() => {
    if (!value) {
      return daysOfWeek.reduce((acc, day) => {
        acc[day.id] = { enabled: false, open: '18:00', close: '22:00' };
        return acc;
      }, {} as Record<string, DaySchedule>);
    }

    try {
      const parsed = JSON.parse(value);
      return daysOfWeek.reduce((acc, day) => {
        acc[day.id] = {
          enabled: !!parsed[day.id],
          open: parsed[day.id]?.open || '18:00',
          close: parsed[day.id]?.close || '22:00',
        };
        return acc;
      }, {} as Record<string, DaySchedule>);
    } catch {
      return daysOfWeek.reduce((acc, day) => {
        acc[day.id] = { enabled: false, open: '18:00', close: '22:00' };
        return acc;
      }, {} as Record<string, DaySchedule>);
    }
  });

  const updateSchedule = (dayId: string, field: keyof DaySchedule, newValue: string | boolean) => {
    const newSchedules = {
      ...schedules,
      [dayId]: {
        ...schedules[dayId],
        [field]: newValue,
      },
    };

    setSchedules(newSchedules);

    // Convert to JSON string
    const jsonValue = daysOfWeek.reduce((acc, day) => {
      if (newSchedules[day.id].enabled) {
        acc[day.id] = {
          open: newSchedules[day.id].open,
          close: newSchedules[day.id].close,
        };
      }
      return acc;
    }, {} as Record<string, { open: string; close: string }>);

    onChange(JSON.stringify(jsonValue));
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2).toString().padStart(2, '0');
    const minute = (i % 2) * 30;
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  });

  return (
    <div className="space-y-3">
      <SectionTitle>{t('catalog.opening_hours')}</SectionTitle>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day.id} className="text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">{day.short}</div>
              <button
                type="button"
                onClick={() => updateSchedule(day.id, 'enabled', !schedules[day.id].enabled)}
                className={`w-full py-2 px-1 rounded text-xs font-medium transition-colors ${
                  schedules[day.id].enabled
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {schedules[day.id].enabled ? 'Aberto' : 'Fechado'}
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {daysOfWeek.filter(day => schedules[day.id].enabled).map((day) => (
            <div key={day.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
              <span className="text-sm font-medium text-gray-900">{day.full}</span>
              <div className="flex items-center gap-2">
                <select
                  value={schedules[day.id].open}
                  onChange={(e) => updateSchedule(day.id, 'open', e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:border-orange-500 focus:outline-none"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-500 text-sm">até</span>
                <select
                  value={schedules[day.id].close}
                  onChange={(e) => updateSchedule(day.id, 'close', e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:border-orange-500 focus:outline-none"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {daysOfWeek.filter(day => schedules[day.id].enabled).length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Nenhum dia selecionado. Clique nos dias acima para configurar horários.
          </div>
        )}
      </div>
    </div>
  );
}
