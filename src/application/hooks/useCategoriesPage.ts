import { useState, useEffect } from 'react';
import { useCategories, type Category, type CreateCategoryInput } from '@/application/hooks/useCategories';

interface UseCategoriesPageReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  showCreateForm: boolean;
  formData: CreateCategoryInput;
  submitting: boolean;
  setShowCreateForm: (show: boolean) => void;
  setFormData: (data: CreateCategoryInput) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleToggleActive: (categoryId: string, isActive: boolean) => Promise<void>;
}

export function useCategoriesPage(): UseCategoriesPageReturn {
  const { categories, isLoading, error, listCategories, createCategory, toggleCategoryActive } = useCategories();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateCategoryInput>({ name: '', image: undefined, openingHours: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listCategories();
  }, [listCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createCategory(formData);
      setShowCreateForm(false);
      setFormData({ name: '', image: undefined, openingHours: '' });
    } catch {
      // error already set in hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (categoryId: string, isActive: boolean) => {
    try {
      await toggleCategoryActive(categoryId, !isActive);
    } catch {
      // error already set in hook
    }
  };

  return {
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
  };
}
