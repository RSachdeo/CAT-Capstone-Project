export interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  company?: string;
  address2?: string;
  day?: string;
  month?: string;
  year?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const testUsers = {
  newUser: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Test Street',
    address2: 'Apt 456',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobile: '+1234567890',
    company: 'Test Company Inc',
    day: '15',
    month: 'June',
    year: '1990',
  } as UserData,

  alternateUser: {
    firstName: 'Jane',
    lastName: 'Smith',
    address: '456 Sample Ave',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 1A1',
    mobile: '+9876543210',
    company: 'Sample Corp',
    day: '20',
    month: 'March',
    year: '1985',
  } as UserData,

  invalidCredentials: {
    email: 'nonexistent@email.com',
    password: 'wrongpassword123',
  } as LoginCredentials,
};

export function generateTestUser(): UserData {
  const timestamp = Date.now();
  return {
    firstName: `TestFirst${timestamp}`,
    lastName: `TestLast${timestamp}`,
    address: `${timestamp} Automation Street`,
    country: 'United States',
    state: 'New York',
    city: 'New York',
    zipcode: '10001',
    mobile: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    day: '10',
    month: 'January',
    year: '1995',
  };
}
