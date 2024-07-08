import { useState } from "react";

// Todo: Validate input when distance lower than 0;
const TrackerScreen = () => {
  const [error, setError] = useState(false);
  const [distance, setDistance] = useState(0.0);
  const [fuelType, setFuelType] = useState("gasoline");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
      setError(true);
      return;
    }

    setError(false);
    setDistance(value);
  };

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFuelType(e.target.value);
  };

  const distanceEmissions = () => {
    if (fuelType === "gasoline") {
      return 0.18;
    } else if (fuelType === "diesel") {
      return 0.15;
    } else if (fuelType === "hybrid") {
      return 0.1;
    }
    return 0;
  };

  const calcuateEmiss = () => {
    if (!distance) return 0.0;

    return (distance * distanceEmissions()).toFixed(1);
  };

  return (
    <div className="trackScreen">
      <div className="-picture"></div>
      <h1>Carculator</h1>
      <form>
        <h3>CO2 emissions calculator for your car</h3>
        <div className="-line">
          <h2>Fuel Type </h2>
          <select name="gas" id="gas" onChange={handleFuelTypeChange}>
            <option className="option" value="gasoline">Bensin</option>
            <option className="option" value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="-unit">
          <h2>Unit:</h2>
        </div>

        <div className="-line">
          <p>{distanceEmissions()}</p>
          <p>Kg / Km</p>
        </div>

        <div className="-line mt-2">
          <h2 className="-distance">Distance Traveled</h2>
          <div className="-input">
            <input
              onChange={handleChange}
              type="number"
              name="kilo"
              id="calculate"
              placeholder="Enter your distance"
            />
            <p className="Kilometer">Kilometer</p>
          </div>
          {error && <p className="-error">Distance must be greater than 0</p>}
        </div>

        <div className="-summary">
          CO2 emitted for {calcuateEmiss()} kilogram
        </div>
      </form>
    </div>
  );
};

export default TrackerScreen;
