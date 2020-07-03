import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype); //this is called because this class extends another class
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
