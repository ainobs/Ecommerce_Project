/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-9">
      <h1 className="font-bold text-2xl ">Oops!</h1>
      <p className="font-medium">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <Link
        to="/"
        className="text-primary hover:underline cursor-pointer font-medium "
      >
        Home
      </Link>
    </div>
  );
}
