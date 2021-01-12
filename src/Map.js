import React from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={2}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
