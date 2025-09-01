export type CreateOrderTransactionRequest = {
  customer_id: string;
  order_type: string;
  order_source: string;
  delivery_address?: string;
  order_items: {
    product_id: string;
    qty: number;
    unit_price: number;
  }[];
  payment_method: string;
  discount?: string;
};

export interface AfterOrderResponse {
  msg: string;
  data: {
    id: string;
    customer_id: string;
    order_date: Date;
    order_type: string;
    order_source: string;
    delivery_address: string | null;
    total: number;
    status: string;
    createdAt: Date;
  } | null;
}

//TODO: berarti harusnya di state FE dia naro orderId nya aja biar klo ngerefresh tinggal ambil idnya lagi untuk fetching

//TODO: klo misal untuk liat apa yang di order tinggal cek cart yang persis aja jadi order keknya gausah di persis lagi sama payment
