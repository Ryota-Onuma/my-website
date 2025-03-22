class BaseError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }

  public status: number;
  public originalError?: Error;
}

export class NotFoundError extends BaseError {
  constructor(message: string, originalError?: Error) {
    super(message, 404);
    this.name = "NotFoundError";
    this.originalError = originalError;
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string, originalError?: Error) {
    super(message, 500);
    this.name = "InternalServerError";
    this.originalError = originalError;
  }
}

export const WrapNotFoundError = (error: Error) => {
  return new NotFoundError(error.message, error);
};

export const WrapInternalServerError = (error: Error) => {
  return new InternalServerError(error.message, error);
};
