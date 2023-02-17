import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <main>
      <p>
        {error.status} {error.statusText}
      </p>
    </main>
  );
};

export default NotFound;
