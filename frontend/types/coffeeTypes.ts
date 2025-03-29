export type CoffeeItem = {
  id: string;
  date_created: string;
  name: string;
  price: number;
  region: string;
  roastLevel: string;
  status: string;
};

export interface Filter {
  region: string;
  dateFrom?: string;
  dateTo?: string;
}
