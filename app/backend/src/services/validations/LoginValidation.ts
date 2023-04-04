import * as Joi from 'joi';
import RequiredParams from '../../errors/requiredParams';
import InvalidParams from '../../errors/invalidParams';
import { ILogin } from '../interfaces/usersServiceInterfaces';

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validate = (data: ILogin): void => {
  const { error } = schema.validate(data);

  const errorType = error?.details[0].type;

  if (error && (errorType === 'any.required' || errorType === 'string.empty')) {
    throw new RequiredParams('All fields must be filled');
  }
  if (error) {
    throw new InvalidParams('Invalid email or password');
  }
};

export default validate;
