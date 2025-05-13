import { HttpError } from "../types/HttpError";

type TransformedErrors = {
  [key: string]: string[];
};

const transformErrorMessages = (errorMessages: string[]): TransformedErrors => {
  const transformedErrors: TransformedErrors = {};

  for (const errorMessage of errorMessages) {
    const separatorIndex = errorMessage.indexOf(" ");
    const field = errorMessage.substring(0, separatorIndex);

    if (transformedErrors[field]) {
      transformedErrors[field].push(errorMessage);
    } else {
      transformedErrors[field] = [errorMessage];
    }
  }

  return transformedErrors;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformHttpError = (error: any): HttpError => {
  const message = error.response.data.error;
  const statusCode = error.response.data.statusCode;
  const errorMessages = error.response.data.message;

  const errors = transformErrorMessages(errorMessages);

  const httpError: HttpError = {
    statusCode,
    message,
    errors,
  };

  return httpError;
};
