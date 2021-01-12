import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, Card } from "@material-ui/core";
import InfoBox from "./InfoBox";
import { CardContent } from "@material-ui/core";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import numeral from "numeral";

function App() {
  // initialise STATE to empty ARRAY[]
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [mapCountries, setMapCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.4688, lng: 12.6427 });
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(
    () => async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    },
    []
  );

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCenter({ lat: -31.6349, lng: 22.1744 });
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())

      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  /*   console.log("Country_Info >>>>", countryInfo);
   */
  return (
    <div className="App">
      <div className="app__left">
        <h1> COVID-19 TRACKER </h1>
        <div className="app__header">
          <FormControl className="app__dropdown">
            <span className="choose">
              <p> Choose Your Country </p>
            </span>
            <Select
              className="sel_ch"
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">
                <h4>Worldwide</h4>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            className="casesBox"
            title="CASES"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0,0a")}
          />{" "}
          <InfoBox
            onClick={(e) => setCasesType("tests")}
            className="testBox"
            title="TESTS"
            active={casesType === "tests"}
            cases={prettyPrintStat(countryInfo.oneTestPerPeople)}
            total={numeral(countryInfo.tests).format("0,0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            className="recovBox"
            title="RECOVERED"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0,0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            className="deathBox"
            title="DEATHS"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0,0a")}
          />
        </div>

        <Map center={mapCenter} countries={mapCountries} />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h2> Live Cases by Country </h2>
            <Table countries={tableData} />
            <h2> Worldwide New {casesType}</h2>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

// Happy Coding from : Olwethu Theo Nyondo....COVID 19 Track APPLICATION 2020 DESIGN.....:)
