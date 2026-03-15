'use client';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'foundation', name: 'Foundation' },
    { id: 'lipstick', name: 'Lipstick' },
    { id: 'lipgloss', name: 'Lip Gloss' },
    { id: 'lipstain', name: 'Lip Stain' },
    { id: 'blush', name: 'Blush' },
    { id: 'eyeshadow', name: 'Eyeshadow' }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selected === cat.id
              ? 'bg-pink-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}