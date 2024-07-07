import { useState } from "react"


const TrackerScreen = () => {
  const [distance, setDistance] = useState(0.0);
  const [fuelType, setFuelType] = useState("gasoline");

  const handleChange = (e :any) => {
    const value = parseFloat(e.target.value);
    setDistance(value);
  };

  const handleFuelTypeChange = (e : any) => {
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
    if(!distance) return 0.0;

    return (distance * distanceEmissions()).toFixed(1);
  }

  return (
    <div className="trackScreen">
      <div className="Picture"></div>
      <h1>Carculator</h1>
      <form>
        <h3>CO2 emissions calculator for your car</h3>
        <div className="Fuel">
              <label>Fuel Type </label>
              <select name="gas" id="gas" onChange={handleFuelTypeChange}>
              <option value="gasoline">Bensin</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
            </select>
        </div>
        <p className="Per">{distanceEmissions()}Kilogram / Kilometer</p>

        <p className="dis">Distance Travelled</p>
        <div className="Uinput">
              <input  onChange={handleChange} type="number" name="kilo" id="calculate" />
              <p className="Kilometer">Kilometer</p>
         </div>
         
      
      <p>CO2 emitted for { calcuateEmiss()} kilogram</p>
      </form>
    </div>
  )
}

export default TrackerScreen