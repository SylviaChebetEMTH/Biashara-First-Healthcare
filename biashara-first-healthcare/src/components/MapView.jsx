import React, { useEffect, useRef, useState, useCallback } from "react";
import "ol/ol.css";
import { Map, View, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Icon } from "ol/style";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import SearchBar from './SearchBar';
import HospitalModal from './HospitalModal';
import XYZ from 'ol/source/XYZ';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// Path to GeoJSON data for hospital locations
const hospitalsGeoJson = "/assets/Hospital_locations.geojson";

// URL for the businesses route
const businessesApiUrl = "https://backend-bfhealth.onrender.com/businesses";


const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const MapView = ({ setCoordinates, center, canPlacePin = false }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [hospitalLayer, setHospitalLayer] = useState(null);
  const [businessLayer, setBusinessLayer] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showBusinesses, setShowBusinesses] = useState(true);
  const popupRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (mapInstance.current) return;

    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: !isSatellite,
    });
    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      }),
      visible: isSatellite,
    });

    const map = new Map({
      target: "map",
      layers: [osmLayer, satelliteLayer],
      view: new View({
        center: fromLonLat([36.8219, -1.2921]),
        zoom: 12,
      }),
    });

    const popup = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10],
    });
    map.addOverlay(popup);

    mapRef.current = map;

    fetch(hospitalsGeoJson)
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data);

        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:3857",
          }),
        });

        const hospitalStyle = new Style({
          image: new Icon({
            src: "/assets/hospital.png",
            scale: 0.017,
            anchor: [0.5, 1],
          }),
        });

        const hospitalVectorLayer = new VectorLayer({
          source: vectorSource,
          style: hospitalStyle,
        });

        map.addLayer(hospitalVectorLayer);
        setHospitalLayer(hospitalVectorLayer);

        // Toggle hospital layer visibility
        hospitalVectorLayer.setVisible(showHospitals);
      })
      .catch((error) => {
        console.error("Error loading GeoJSON data:", error);
      });

    const markerSource = new VectorSource();
    const businessMarkerLayer = new VectorLayer({
      source: markerSource,
    });

    map.addLayer(businessMarkerLayer);
    setBusinessLayer(businessMarkerLayer);

    if (canPlacePin) {
      map.on("click", (evt) => {
        const coordinates = toLonLat(evt.coordinate);
        setCoordinates(coordinates);
        markerSource.clear();

        const marker = new Feature({
          geometry: new Point(evt.coordinate),
        });

        const markerStyle = new Style({
          image: new Icon({
            src: "/assets/location.png",
            scale: 0.05,
            anchor: [0.5, 1],
          }),
        });

        marker.setStyle(markerStyle);
        markerSource.addFeature(marker);
      });
    }
    mapInstance.current = map;

    fetch(businessesApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBusinesses(data.businesses);

        data.businesses.forEach((business) => {
          const businessCoords = [business.longitude, business.latitude];
          const businessFeature = new Feature({
            geometry: new Point(fromLonLat(businessCoords)),
            businessInfo: business,
          });

          const businessMarkerStyle = new Style({
            image: new Icon({
              src: "/assets/business.png",
              scale: 0.05,
              anchor: [0.5, 1],
            }),
          });

          businessFeature.setStyle(businessMarkerStyle);
          markerSource.addFeature(businessFeature);
        });
      })
      .catch((error) => console.error("Error loading business data:", error));

    map.on("pointermove", (evt) => {
      let featureFound = false;
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const businessInfo = feature.get("businessInfo");
        if (businessInfo) {
          popup.setPosition(evt.coordinate);
          popupRef.current.innerHTML = `
            <strong>${businessInfo.business_name}</strong><br/>
            <hr style="margin: 5px 0;"/>
            ${businessInfo.business_type}
          `;
          popupRef.current.style.display = "block";
          featureFound = true;
        }
      });

      if (!featureFound) {
        popupRef.current.style.display = "none";
      }
      if (!featureFound) {
        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          // Directly access the 'name' field on the feature
          const hospitalName = feature.get("name");
          if (hospitalName) {
            popup.setPosition(evt.coordinate);
            popupRef.current.innerHTML = `
              <strong>${hospitalName}</strong><br/>
              <hr style="margin: 5px 0;"/>
              Hospital
            `;
            popupRef.current.style.display = "block";
            featureFound = true;
          }
        });
      }

      // Hide popup if no feature was found
      if (!featureFound) {
        popupRef.current.style.display = "none";
      }
    });

    map.on("click", (evt) => {
      let featureFound = false;
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const businessInfo = feature.get("businessInfo");

        if (businessInfo) {
          setSelectedBusiness(businessInfo);
          featureFound = true;
        }
      });

      if (!featureFound && !canPlacePin) {
        popupRef.current.style.display = "none";
      }
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      const osmLayer = mapInstance.current.getLayers().item(0);
      const satelliteLayer = mapInstance.current.getLayers().item(1);

      osmLayer.setVisible(!isSatellite);
      satelliteLayer.setVisible(isSatellite);
    }
  }, [isSatellite]);

  useEffect(() => {
    if (hospitalLayer) {
      hospitalLayer.setVisible(showHospitals);
    }
  }, [showHospitals, hospitalLayer]);

  useEffect(() => {
    if (businessLayer) {
      businessLayer.setVisible(showBusinesses);
    }
  }, [showBusinesses, businessLayer]);

  const updateView = useCallback((longitude, latitude) => {
    if (mapInstance.current) {
      const view = mapInstance.current.getView();
      view.setCenter(fromLonLat([longitude, latitude]));
      view.setZoom(16);

      const markerSource = new VectorSource();
      const currentLocationLayer = new VectorLayer({
        source: markerSource,
      });

      markerSource.clear();

      const marker = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });

      const markerStyle = new Style({
        image: new Icon({
          src: "/assets/location.png",
          scale: 0.05,
          anchor: [0.5, 1],
        }),
      });

      marker.setStyle(markerStyle);
      markerSource.addFeature(marker);
      mapInstance.current.addLayer(currentLocationLayer);
    }
  }, []);

  // Expose the updateView function
  useEffect(() => {
    window.updateMapView = updateView;
  }, [updateView]);

  const handleSelectLocation = (result) => {
    const { latitude, longitude } = result.properties || result;
    const coordinates = fromLonLat([longitude, latitude]);
    setCoordinates(coordinates);
    mapRef.current.getView().setCenter(coordinates);
    mapRef.current.getView().setZoom(20);
  };

  const getNearbyHospitals = () => {
    if (!selectedBusiness || !geojsonData) return [];

    const businessLat = selectedBusiness.latitude;
    const businessLon = selectedBusiness.longitude;
    const maxDistance = 10;

    const hospitalsWithinRange = geojsonData.features
      .map((hospitalFeature) => {
        const hospitalLat = hospitalFeature.geometry.coordinates[1];
        const hospitalLon = hospitalFeature.geometry.coordinates[0];
        const distance = haversineDistance(businessLat, businessLon, hospitalLat, hospitalLon);
        return { hospitalFeature, distance };
      })
      .filter(({ distance }) => distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    return hospitalsWithinRange;
  };

  return (
    <div className="map-container relative w-full h-full">
      <div id="map" className="w-full h-full"></div>
      <div
        ref={popupRef}
        className="ol-popup bg-white rounded-lg shadow-xl p-3 border border-gray-200"
        style={{ display: "none", minWidth: "150px" }}
      ></div>

      <button
        className="absolute top-4 right-4 z-20 md:hidden bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          size="lg"
          className="text-gray-700"
        />
      </button>

      <div className={`absolute top-4 left-4 md:left-10 bg-white rounded-xl shadow-2xl z-10 transition-all duration-300 ${isOpen ? 'p-6' : 'hidden md:p-6 md:flex md:flex-col'}`}>
        <div className="space-y-4">
          <div className="pb-4 border-b border-gray-200">
            <SearchBar
              hospitals={geojsonData}
              businesses={businesses}
              onSelectLocation={handleSelectLocation}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Map Layers
            </h4>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showHospitals}
                onChange={() => setShowHospitals((prev) => !prev)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-500 transition-colors">
                Show Hospitals
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showBusinesses}
                onChange={() => setShowBusinesses((prev) => !prev)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-500 transition-colors">
                Show Businesses
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isSatellite}
                onChange={() => setIsSatellite((prev) => !prev)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-500 transition-colors">
                Satellite View
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* External Hospital Modal */}
      <HospitalModal
        isOpen={!!selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        hospitals={getNearbyHospitals()}
        selectedBusiness={selectedBusiness}
      />
    </div>
  );
};

export default MapView;