// Helper function to extract the error message from the express-validator error format
export function getBackendErrorMessage(responseData) {
  if (
    responseData?.response?.data?.errors &&
    Array.isArray(responseData?.response?.data?.errors)
  ) {
    // If the response contains an array of errors (from express-validator)
    const errorMessages = responseData?.response?.data?.errors.map(
      (error) => error.msg
    );
    return errorMessages.join(', ');
  } else if (responseData?.response?.data?.message) {
    // If the response contains a single error message
    return responseData?.response?.data?.message;
  } else {
    console.log(responseData);
    return 'Encounter an unknown error.';
  }
}
