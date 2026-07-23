import * as yup from 'yup';

export const priceSchema = yup.number()
  .required('Price is required')
  .positive('Must be positive')
  .min(1, 'Minimum value is 1')
  .typeError('You must enter a valid number');

export const nameSchema = yup.string()
  .required('Name is required')
  .min(3, 'Name must be at least 3 characters')
  .max(35, 'Name must be at most 35 characters');

export const descriptionSchema = yup.string()
  .required('Description is required')
  .min(10, 'Description must be at least 10 characters')
  .max(1000, 'Description must be at most 1000 characters');
