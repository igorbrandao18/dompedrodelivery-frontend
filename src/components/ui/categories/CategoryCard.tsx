import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { t } from '@/i18n';
import type { Category } from '@/application/hooks/useCategories';

interface CategoryCardProps {
  category: Category;
  onToggleActive: (id: string, active: boolean) => void;
}

export function CategoryCard({ category, onToggleActive }: CategoryCardProps) {
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return undefined;
    
    // Se já for URL completa, usar direto
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Se for caminho relativo, construir URL completa
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/category-placeholder.svg';
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            {category.imageUrl && (
              <img 
                src={getImageUrl(category.imageUrl)} 
                alt={category.name} 
                className="mt-2 h-20 w-20 rounded-md object-cover"
                onError={handleImageError}
              />
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {category.isActive ? t('catalog.active') : t('catalog.inactive')}
            </span>
            <Button
              size="sm"
              onClick={() => onToggleActive(category.id, category.isActive)}
            >
              {category.isActive ? t('catalog.deactivate') : t('catalog.activate')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
