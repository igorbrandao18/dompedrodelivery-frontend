'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { FormCard } from '@/components/ui/cards/FormCard';
import { PasswordInput } from '@/components/ui/forms/PasswordInput';
import { SplitLayout } from '@/components/ui/layout/SplitLayout';
import { HeroPanel } from '@/components/ui/panels/HeroPanel';
import { useLoginForm } from '@/application/hooks/useLoginForm';
import { t } from '@/i18n';

export default function LoginPage() {
  const { formData, isLoading, error, handleInputChange, handleSubmit } = useLoginForm();

  return (
    <SplitLayout
      left={
        <HeroPanel
          badgeText={t('auth.brand')}
          title={t('auth.login.hero.headline_1')}
          highlight={t('auth.login.hero.headline_2')}
          subtitle={t('auth.login.hero.subtitle')}
          stats={[
            { value: '2.5K+', label: t('auth.login.hero.stats.orders_label') },
            { value: '98%', label: t('auth.login.hero.stats.satisfaction_label') },
            { value: '24/7', label: t('auth.login.hero.stats.support_label') },
          ]}
          features={[
            t('auth.login.hero.features.secure'),
            t('auth.login.hero.features.gdpr'),
            t('auth.login.hero.features.cancel'),
          ]}
        />
      }
      right={
        <FormCard
          logoSrc="/logo.png"
          logoAlt={t('auth.login.form.logo_alt')}
          title={t('auth.login.form.title')}
          subtitle={t('auth.login.form.subtitle')}
          message={error || undefined}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('auth.login.form.email_label')}
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder={t('auth.login.form.email_placeholder')}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email')(e.target.value)}
                  error={error ? 'Email inválido' : undefined}
                  className="pl-10"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('auth.login.form.password_label')}
              </label>
              <PasswordInput
                placeholder={t('auth.login.form.password_placeholder')}
                value={formData.password}
                onChange={(e) => handleInputChange('password')(e.target.value)}
                error={error ? 'Senha inválida' : undefined}
                className="pl-10 pr-10"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-orange-200/50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 2m15.356 2H15a2 2 0 002-2V7a2 2 0 00-2-2h-.582m-15.357-2l15.357 2" />
                  </svg>
                  {t('auth.login.form.submitting')}
                </span>
              ) : (
                t('auth.login.form.submit')
              )}
            </Button>

            <div className="text-center space-y-4">
              <div className="text-sm text-gray-600">
                {t('auth.login.form.no_account')}{' '}
                <Link
                  href="/auth/register"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  {t('auth.login.form.register_link')}
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs">
                <Link
                  href="#"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  {t('auth.login.form.forgot_password')}
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="#"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  {t('auth.login.form.need_help')}
                </Link>
              </div>
            </div>
          </form>
        </FormCard>
      }
    />
  );
}
