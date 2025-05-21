export interface customError extends Error {
  statusCode: number;
  errorData?: [] | {};
}

export const errorHandler = (
  statusCode: number,
  message: string,
  errodData?: [] | {}
): customError => {
  const error = new Error() as customError;
  error.statusCode = statusCode;
  error.message = message;
  if (errodData != undefined) error.errorData = errodData;
  return error;
};
