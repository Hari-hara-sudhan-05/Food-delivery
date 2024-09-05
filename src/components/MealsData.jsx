import Card from "../ui/Card.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

export default function MealsData() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (error) {
    return <Error title={"Failed to fetch meals"} message={error} />;
  }

  return (
    <ul id="meals">
      {isLoading && <p className="center">Fetching meals...</p>}
      {!isLoading &&
        data.map((meal) => {
          return (
            <Card
              key={meal.id}
              listkey={meal.id}
              title={meal.name}
              cost={meal.price}
              description={meal.description}
              reactImg={meal.image}
            />
          );
        })}
    </ul>
  );
}
