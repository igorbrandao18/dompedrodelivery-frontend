import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryCard } from '../CategoryCard';
import { Category } from '@/application/hooks/useCategories';

// Mock do next/image
jest.mock('next/image', () => {
  return ({ src, alt, onError }: { src: string; alt: string; onError?: () => void }) => (
    <img 
      src={src} 
      alt={alt} 
      onError={onError}
      data-testid="category-image"
    />
  );
});

describe('CategoryCard', () => {
  const mockCategory: Category = {
    id: '1',
    name: 'Pizza',
    imageUrl: 'http://example.com/pizza.jpg',
    isActive: true,
    openingHours: '{"monday":{"open":"18:00","close":"23:00"}}',
  };

  const mockOnToggleActive = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render category information', () => {
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByTestId('category-image')).toHaveAttribute('src', mockCategory.imageUrl);
      expect(screen.getByTestId('category-image')).toHaveAttribute('alt', 'Pizza');
    });

    it('should render active status correctly', () => {
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText(/ativo/i)).toBeInTheDocument();
    });

    it('should render inactive status correctly', () => {
      const inactiveCategory = { ...mockCategory, isActive: false };
      
      render(
        <CategoryCard
          category={inactiveCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText(/inativo/i)).toBeInTheDocument();
    });

    it('should render placeholder when no image', () => {
      const categoryWithoutImage = { ...mockCategory, imageUrl: undefined };
      
      render(
        <CategoryCard
          category={categoryWithoutImage}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText(/sem imagem/i)).toBeInTheDocument();
    });

    it('should render opening hours when available', () => {
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText(/18:00 - 23:00/i)).toBeInTheDocument();
    });

    it('should not render opening hours when not available', () => {
      const categoryWithoutHours = { ...mockCategory, openingHours: undefined };
      
      render(
        <CategoryCard
          category={categoryWithoutHours}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.queryByText(/18:00 - 23:00/i)).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onToggleActive when toggle button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const toggleButton = screen.getByRole('button', { name: /alternar status/i });
      await user.click(toggleButton);

      expect(mockOnToggleActive).toHaveBeenCalledWith(mockCategory.id, !mockCategory.isActive);
    });

    it('should call onEdit when edit button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const editButton = screen.getByRole('button', { name: /editar/i });
      await user.click(editButton);

      expect(mockOnEdit).toHaveBeenCalledWith(mockCategory);
    });

    it('should call onDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /excluir/i });
      await user.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledWith(mockCategory.id);
    });
  });

  describe('image handling', () => {
    it('should handle image load error', () => {
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const image = screen.getByTestId('category-image');
      fireEvent.error(image);

      expect(screen.getByText(/erro ao carregar imagem/i)).toBeInTheDocument();
    });

    it('should show loading state while image loads', () => {
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByTestId('image-loading')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const toggleButton = screen.getByRole('button', { name: /alternar status/i });
      const editButton = screen.getByRole('button', { name: /editar/i });
      const deleteButton = screen.getByRole('button', { name: /excluir/i });

      expect(toggleButton).toHaveAttribute('aria-label', expect.stringContaining('alternar status'));
      expect(editButton).toHaveAttribute('aria-label', expect.stringContaining('editar categoria'));
      expect(deleteButton).toHaveAttribute('aria-label', expect.stringContaining('excluir categoria'));
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      
      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const card = screen.getByTestId('category-card');
      card.focus();

      await user.tab();
      expect(screen.getByRole('button', { name: /alternar status/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /editar/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /excluir/i })).toHaveFocus();
    });
  });

  describe('responsive behavior', () => {
    it('should adapt layout for mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const card = screen.getByTestId('category-card');
      expect(card).toHaveClass('mobile-layout');
    });

    it('should adapt layout for desktop', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(
        <CategoryCard
          category={mockCategory}
          onToggleActive={mockOnToggleActive}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const card = screen.getByTestId('category-card');
      expect(card).toHaveClass('desktop-layout');
    });
  });
});
