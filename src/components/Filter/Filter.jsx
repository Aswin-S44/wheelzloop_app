import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  
  ScrollView,
} from "react-native";
// import { BACKEND_URL } from "../../constants/urls"; // Update your backend URL if needed
import CheckBox from '@react-native-community/checkbox';

const Filter = ({ onFilterChange }) => {
  const [priceMin, setPriceMin] = useState(5000);
  const [priceMax, setPriceMax] = useState(2000000);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [isMarutiOpen, setIsMarutiOpen] = useState(false);
  const [isHondaOpen, setIsHondaOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState({});
  const [kilometer, setKilometer] = useState(200000);
  const [nameSearch, setNameSearch] = useState("");
  const [yearLevel, setYearLevel] = useState([
    { key: "1901 - 2000", value: "Below 2000" },
    { key: "2001 - 2009", value: "2001 - 2009" },
    { key: "2010 - 2020", value: "2010 - 2020" },
    { key: "2021 - 2099", value: "Above 2021" },
  ]);
  const [transmissionTypes, setTransmissionTypes] = useState([
    { key: "Manual Automatic", name: "All", isChecked: true },
    { key: "Manual", name: "Manual", isChecked: false },
    { key: "Automatic", name: "Automatic", isChecked: false },
  ]);

  const handleFuelChange = (value) => {
    setSelectedFuel((prev) =>
      prev.includes(value)
        ? prev.filter((fuel) => fuel !== value)
        : [...prev, value]
    );
  };

  const handleTransmissionChange = (value) => {
    setSelectedTransmission((prev) =>
      prev.includes(value)
        ? prev.filter((trans) => trans !== value)
        : [...prev, value]
    );
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleModelChange = (brand, model) => {
    const updatedModels = { ...selectedModels };
    if (updatedModels[brand]?.includes(model)) {
      updatedModels[brand] = updatedModels[brand].filter((m) => m !== model);
    } else {
      updatedModels[brand] = [...(updatedModels[brand] || []), model];
    }
    setSelectedModels(updatedModels);
  };

  const handleApplyFilter = () => {
    const filters = {
      priceMin,
      priceMax,
      brand: brandSearch,
      fuelType: selectedFuel.join(","),
      transmission: selectedTransmission.join(","),
      year: selectedYear,
      models: JSON.stringify(selectedModels),
      kilometer,
      name: nameSearch,
    };
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setPriceMin(5000);
    setPriceMax(2000000);
    setBrandSearch("");
    setSelectedFuel([]);
    setSelectedTransmission([]);
    setSelectedYear("");
    setKilometer(200000);
    setNameSearch("");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={resetFilters}
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
      >
        <Text style={{ color: "blue" }}>Reset Filters</Text>
      </TouchableOpacity>

      <View>
        <Text>Price Range</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>₹{priceMin}</Text>
          <Text>₹{priceMax}</Text>
        </View>
        {/* <Slider
          minimumValue={5000}
          maximumValue={5000000}
          step={500}
          value={priceMin}
          onValueChange={setPriceMin}
        />
        <Slider
          minimumValue={5000}
          maximumValue={5000000}
          step={500}
          value={priceMax}
          onValueChange={setPriceMax}
        /> */}
      </View>

      <View>
        <Text>Search Brand</Text>
        <TextInput
          value={brandSearch}
          onChangeText={setBrandSearch}
          placeholder="Search BMW, Suzuki etc."
          style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
        />
      </View>

      <View>
        <Text>Car Brands</Text>
        <TouchableOpacity onPress={() => setIsMarutiOpen(!isMarutiOpen)}>
          <Text style={{ fontWeight: "bold" }}>Maruti Suzuki</Text>
        </TouchableOpacity>
        {isMarutiOpen && (
          <View>
            {["Alto", "Swift", "WagonR"].map((model) => (
              <View
                key={model}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <CheckBox
                  value={nameSearch === model}
                  onValueChange={() => {
                    setNameSearch((prev) => (prev === model ? "" : model));
                    handleApplyFilter();
                  }}
                />
                <Text>{model}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => setIsHondaOpen(!isHondaOpen)}>
          <Text style={{ fontWeight: "bold" }}>Honda</Text>
        </TouchableOpacity>
        {isHondaOpen && (
          <View>
            {["Civic", "City", "Accord"].map((model) => (
              <View
                key={model}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <CheckBox
                  value={selectedModels["Honda"]?.includes(model)}
                  onValueChange={() => handleModelChange("Honda", model)}
                />
                <Text>{model}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View>
        <Text>Year</Text>
        {yearLevel.map((year, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <CheckBox
              value={selectedYear === year.key}
              onValueChange={() => handleYearChange(year.key)}
            />
            <Text>{year.value}</Text>
          </View>
        ))}
      </View>

      <View>
        <Text>Kilometers Driven</Text>
        {/* <Slider
          minimumValue={0}
          maximumValue={200000}
          step={1000}
          value={kilometer}
          onValueChange={setKilometer}
        /> */}
        <Text>{kilometer} km</Text>
      </View>

      <View>
        <Text>Fuel Type</Text>
        {["Petrol", "Diesel", "Hybrid"].map((fuel) => (
          <View
            key={fuel}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <CheckBox
              value={selectedFuel.includes(fuel)}
              onValueChange={() => handleFuelChange(fuel)}
            />
            <Text>{fuel}</Text>
          </View>
        ))}
      </View>

      <View>
        <Text>Transmission</Text>
        {transmissionTypes.map((trans, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <CheckBox
              value={selectedTransmission.includes(trans.name)}
              onValueChange={() => handleTransmissionChange(trans.name)}
            />
            <Text>{trans.name}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleApplyFilter} style={{ marginTop: 20 }}>
        <Text
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: 10,
            textAlign: "center",
          }}
        >
          Apply Filter
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Filter;
