export type Vertical = 'health' | 'skin' | 'apparel';

export interface Product {
  id: string;
  name: string;
  benefit: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  vertical: Vertical;
  tag: string;
  description?: string;
  ingredients?: string[];
}

export interface Metric {
  value: string;
  label: string;
  delta: string;
  status: 'ok' | 'err';
}
