'use client';

import { t } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardLayout } from '@/components/ui/DashboardLayout';
import { OpeningHoursEditor } from '@/components/ui/schedules/OpeningHoursEditor';
import { Input } from '@/components/ui/input';
import { useCategoriesPage } from '@/application/hooks/useCategoriesPage';
import { CategoryCard as CategoryCardComponent } from '@/components/ui/categories/CategoryCard';

export default function CategoriasPage() {
  const {
    categories,
    isLoading,
    error,
    showCreateForm,
    formData,
    submitting,
    setShowCreateForm,
    setFormData,
    handleSubmit,
    handleToggleActive,
  } = useCategoriesPage();

  return (
    <DashboardLayout 
      title={t('catalog.title')}
      actions={
        <Button onClick={() => setShowCreateForm(true)}>
          {t('catalog.create_category')}
        </Button>
      }
    >
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {showCreateForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('catalog.name')}</label>
                <Input
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('catalog.name_placeholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('catalog.image')}</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, image: e.target.files?.[0] })}
                />
              </div>
              <div>
                <OpeningHoursEditor
                  value={formData.openingHours || ''}
                  onChange={(value) => setFormData({ ...formData, openingHours: value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? t('common.saving') : t('common.save')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">{t('common.loading')}</div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">{t('catalog.no_categories')}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCardComponent
              key={category.id}
              category={category}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
