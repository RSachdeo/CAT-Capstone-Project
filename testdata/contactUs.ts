export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const validContactData: ContactFormData = {
  name: 'John Tester',
  email: 'john.tester@example.com',
  subject: 'Product Inquiry',
  message: 'I would like to know more about your products and delivery options.',
};

export const contactFormTestData: ContactFormData[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.j@test.com',
    subject: 'Order Issue',
    message: 'I have an issue with my recent order. Please contact me.',
  },
  {
    name: 'Bob Williams',
    email: 'bob.w@test.com',
    subject: 'Return Request',
    message: 'I would like to return an item I purchased last week.',
  },
  {
    name: 'Carol Davis',
    email: 'carol.d@test.com',
    subject: 'General Inquiry',
    message: 'What are your shipping rates for international orders?',
  },
  {
    name: 'David Brown',
    email: 'david.b@test.com',
    subject: 'Feedback',
    message: 'Great website! I love shopping here. Keep up the good work!',
  },
];

export const invalidContactData = {
  emptyName: {
    name: '',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test message',
  },
  invalidEmail: {
    name: 'Test User',
    email: 'invalid-email',
    subject: 'Test Subject',
    message: 'Test message',
  },
  emptyMessage: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: '',
  },
};
