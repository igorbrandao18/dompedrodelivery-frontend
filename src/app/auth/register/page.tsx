'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FormCard } from '@/components/ui/cards/FormCard';
import { SplitLayout } from '@/components/ui/layout/SplitLayout';
import { HeroPanel } from '@/components/ui/panels/HeroPanel';
import { IconCardsGrid } from '@/components/ui/grids/IconCardsGrid';
import { useRegisterForm } from '@/application/hooks/useRegisterForm';
import { t } from '@/i18n';

export default function RegisterPage() {
  const { formData, errors, showSuccess, isLoading, onChange, onSubmit } =
    useRegisterForm();

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('auth.register.success.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-900">
                        {t('auth.register.success.email_title')}
                      </p>
                      <p className="text-xs text-blue-700">
                        {t('auth.register.success.email_subtitle')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-orange-200/50"
                  >
                    <Link href="/auth/login">
                      {t('auth.register.success.go_login')}
                    </Link>
                  </Button>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      {t('auth.register.success.no_email')}{' '}
                    </span>
                    <Link
                      href="#"
                      className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                    >
                      {t('auth.register.success.resend')}
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <SplitLayout
      left={
        <div className="hidden lg:block">
          <div className="text-center space-y-8">
            <HeroPanel
              badgeText={t('auth.brand')}
              title={t('auth.register.hero.headline_1')}
              highlight={t('auth.register.hero.headline_2')}
              subtitle={t('auth.register.hero.subtitle')}
              stats={[]}
              features={[]}
            />

            <div className="space-y-6">
              <IconCardsGrid
                items={[
                  {
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    ),
                    title: t('auth.register.hero.cards.menu_title'),
                    subtitle: t('auth.register.hero.cards.menu_subtitle'),
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2v-6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z" />
                      </svg>
                    ),
                    title: t('auth.register.hero.cards.orders_title'),
                    subtitle: t('auth.register.hero.cards.orders_subtitle'),
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: t('auth.register.hero.cards.delivery_title'),
                    subtitle: t('auth.register.hero.cards.delivery_subtitle'),
                  },
                ]}
              />

              <div className="space-y-4">
                {[t('auth.register.hero.features.fast_signup'), t('auth.register.hero.features.no_card'), t('auth.register.hero.features.cancel')].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
      right={
        <FormCard
          logoSrc="/logo.png"
          logoAlt={t('auth.brand')}
          title={t('auth.register.form.title')}
          subtitle={t('auth.register.form.subtitle')}
        >
          <form onSubmit={onSubmit} className="space-y-5">
                  {/* Nome do Negócio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t('auth.register.form.tenant_label')}
                    </label>
                    <div>
                      <Input
                        type="text"
                        placeholder={t('auth.register.form.tenant_placeholder')}
                        value={formData.tenantName}
                        onChange={onChange('tenantName')}
                        error={errors.tenantName}
                        required
                      />
                    </div>
                  </div>

                  {/* Seu Nome */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t('auth.register.form.name_label')}
                    </label>
                    <div>
                      <Input
                        type="text"
                        placeholder={t('auth.register.form.name_placeholder')}
                        value={formData.name}
                        onChange={onChange('name')}
                        error={errors.name}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t('auth.register.form.email_label')}
                    </label>
                    <div>
                      <Input
                        type="email"
                        placeholder={t('auth.register.form.email_placeholder')}
                        value={formData.email}
                        onChange={onChange('email')}
                        error={errors.email}
                        required
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t('auth.register.form.phone_label')}
                    </label>
                    <div>
                      <Input
                        type="tel"
                        placeholder={t('auth.register.form.phone_placeholder')}
                        value={formData.phone}
                        onChange={onChange('phone')}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
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
                        {t('auth.register.form.submitting')}
                      </span>
                    ) : (
                      t('auth.register.form.submit')
                    )}
                  </Button>
                  
                  {/* Links */}
                  <div className="text-center space-y-4">
                    <div className="text-sm text-gray-600">
                      {t('auth.register.form.have_account')}{' '}
                      <Link
                        href="/auth/login"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        {t('auth.register.form.login_link')}
                      </Link>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <Link
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        {t('auth.register.form.terms')}
                      </Link>
                      <span className="text-gray-300">•</span>
                      <Link
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        {t('auth.register.form.privacy')}
                      </Link>
                    </div>
                  </div>
          </form>
        </FormCard>
      }
    />
  );
}
