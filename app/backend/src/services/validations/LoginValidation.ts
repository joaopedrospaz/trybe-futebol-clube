import * as Joi from 'joi';
import InvalidParams from '../../errors/invalidParams';
import { ILogin } from '../interfaces/usersServiceInterfaces';

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
});

const validate = (data: ILogin): void => {
  const { error } = schema.validate(data);
  if (error && error.details[0].type === 'any.required') {
    throw new InvalidParams(error.details[0].message);
  }
  if (error) {
    throw new InvalidParams('Invalid email or password');
  }
};

export default validate;
