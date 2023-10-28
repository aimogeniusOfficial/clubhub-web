import { isEmpty } from './functions';

export const isValidPhone = (phone: string): boolean => {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return re.test(phone);
};
export const phoneValidator = (value: string): string | null => {
  if (isEmpty(value)) return 'Phone number is required.';
  return isValidPhone(value) ? null : 'Please provide a valid phone number.';
};

export const isValidName = (name: string): boolean => {
  const tester = /[;<>≤≥`~§±!@#$%^&*_=+≠{}|"?÷]/;
  return !isEmpty(name) && !tester.test(name);
};

export const nameValidator = (value: string): string | null => {
  if (isEmpty(value)) return 'Name field is required.';
  return isValidName(value) ? null : 'Please provide a valid name.';
};
