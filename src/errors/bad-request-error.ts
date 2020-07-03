import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype); //This is needed because the class extends another class
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
