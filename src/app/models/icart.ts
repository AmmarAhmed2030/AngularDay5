import { IProduct } from './iproduct';

export interface ICart {
  product: IProduct;
  requiredQuantity: number;
}
