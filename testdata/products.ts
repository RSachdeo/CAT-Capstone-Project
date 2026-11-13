export interface ProductSearchData {
  searchTerm: string;
  expectedResultsMin?: number;
}

export interface ProductData {
  name: string;
  price?: string;
  quantity?: number;
}

export const productSearchData: ProductSearchData[] = [
  { searchTerm: 'Top', expectedResultsMin: 1 },
  { searchTerm: 'Dress', expectedResultsMin: 1 },
  { searchTerm: 'Jeans', expectedResultsMin: 1 },
  { searchTerm: 'Tshirt', expectedResultsMin: 1 },
  { searchTerm: 'Saree', expectedResultsMin: 1 },
];

export const invalidSearchTerms: string[] = [
  'xyznonexistent123',
  '!@#$%^&*()',
  'abcdefghijklmnop12345',
];

export const productQuantities: number[] = [1, 2, 5, 10];

export const sampleProducts: ProductData[] = [
  { name: 'Blue Top', quantity: 1 },
  { name: 'Men Tshirt', quantity: 2 },
  { name: 'Sleeveless Dress', quantity: 1 },
];

export const categories = {
  women: {
    name: 'Women',
    subCategories: ['Dress', 'Tops', 'Saree'],
  },
  men: {
    name: 'Men',
    subCategories: ['Tshirts', 'Jeans'],
  },
  kids: {
    name: 'Kids',
    subCategories: ['Dress', 'Tops & Shirts'],
  },
};

export const brands = [
  'Polo',
  'H&M',
  'Madame',
  'Mast & Harbour',
  'Babyhug',
  'Allen Solly Junior',
  'Kookie Kids',
  'Biba',
];
