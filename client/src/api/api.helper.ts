export const getContentType = () => ({
  "Content-Type": "application/json",
});
export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;
  
  return message
    ? typeof error.response.data.message === "object"
      ? message[0]
      : message
    : error.message;
};

// export const errorCatch = (error: any): string =>
//   error.response && error.response.data
//     ? typeof error.response.data.message === "object"
//       ? error.response.data.message[0]
//       : error.response.data.message
//     : error.message;
