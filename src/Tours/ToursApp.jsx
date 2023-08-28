import { useEffect, useState } from "react";
import "./Tours.css";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";

function ToursApp() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      console.log(tours);
      setLoading(false);
      setTours(tours);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading)
    return (
      <main>
        <Loading />
      </main>
    );
  else if (tours.length === 0)
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  else
    return (
      <>
        <main>
          <Tours tours={tours} removeTour={removeTour} />
        </main>
      </>
    );
}

export default ToursApp;
