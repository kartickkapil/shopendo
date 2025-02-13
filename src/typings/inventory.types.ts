export interface IProductOption {
  color: string | string[];
  power?: number[];
  storage?: string[];
  quantity: number;
}

export interface IProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;
  options: IProductOption[];
}

export interface IInventory {
  items: IProduct[];
}
