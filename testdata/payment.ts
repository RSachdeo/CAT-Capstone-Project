export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export const validPaymentData: PaymentData = {
  nameOnCard: 'John Doe',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2028',
};

export const alternatePaymentData: PaymentData = {
  nameOnCard: 'Jane Smith',
  cardNumber: '5500000000000004',
  cvc: '456',
  expiryMonth: '06',
  expiryYear: '2027',
};

export const paymentTestData: PaymentData[] = [
  {
    nameOnCard: 'Test User One',
    cardNumber: '4111111111111111',
    cvc: '111',
    expiryMonth: '01',
    expiryYear: '2026',
  },
  {
    nameOnCard: 'Test User Two',
    cardNumber: '5500000000000004',
    cvc: '222',
    expiryMonth: '06',
    expiryYear: '2027',
  },
  {
    nameOnCard: 'Test User Three',
    cardNumber: '340000000000009',
    cvc: '333',
    expiryMonth: '12',
    expiryYear: '2028',
  },
];
