export const customError = (message, code) => {
  const error = new Error(message);
  error.status = code;
  return error;
};
