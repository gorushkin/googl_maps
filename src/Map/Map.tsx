import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './Map.module.scss';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '../Marker/Marker';
import MapIcon from '../assets/icon.svg';

const API_KEY = 'AIzaSyDG_jsdGvw344SPqUnTia7tmfaeagvVjyk';

const url =
  'https://cigarwell-dev.s3.amazonaws.com/images/brands/thumbs/davidoff-cigars.png.300x300_q85_sharpen.png';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Pin = () => {
  return (
    <div className={styles.pin}>
      {/* <h1>asdfasdfadfds</h1> */}
      <img src={url} />
    </div>
  );
};

type Map = google.maps.Map;
type Pos = { lat: number; lng: number };
type MarkerType = { id: number; pos: Pos };

const l1 = { lat: -3.7950327088168687, lng: -38.51853680419923 };
const l2 = { lat: -3.912868639538114, lng: -38.583081481933604 };
const l3 = { lat: -4.266256895317053, lng: -38.704484450712165 };
const l4 = { lat: -4.508690136964581, lng: -39.327681892104145 };

const list: MarkerType[] = [
  { id: 1, pos: l1 },
  { id: 2, pos: l2 },
  { id: 3, pos: l3 },
  { id: 4, pos: l4 },
];

const mapId = 'b2e14f8eae89c527';

export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    mapIds: [mapId],
    googleMapsApiKey: API_KEY,
    libraries: ['marker'],
  });
  const [map, setMap] = useState<Map | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>(list);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds>();

  useEffect(() => {
    // if (!map || !bounds) return;
    // console.log('bound');
    // map.fitBounds(bounds);
    // map.panToBounds(bounds);
  }, [bounds, map, markers]);

  const onLoad = useCallback((map: Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new google.maps.LatLngBounds();
    console.log('bounds: ', bounds);

    list.forEach((item) => {
      bounds.extend(item.pos);
    });

    setBounds(bounds);

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const handleMarkerClick = (id: number) => (e: google.maps.MapMouseEvent) => {
    // console.log(pos);
    console.log(id);
    setMarkers((prev) => prev.filter((item) => item.id !== id));
  };

  const onUnmount = useCallback((map: Map) => {
    setMap(null);
  }, []);

  const handleClick = (e: google.maps.MapMouseEvent) => {
    console.log(JSON.stringify(e.latLng?.toJSON()));
    map?.panTo(center);
  };

  // const pin = useRef<Marker | null>(null);
  // console.log('pin: ', pin.current);

  return (
    <div className={styles.wrapper}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          center={center}
          onClick={handleClick}
          options={{ mapId }}
        >
          {markers.map(({ id, pos }) => {
            return (
              <Marker key={id} map={map} position={pos}>
                <Pin />
              </Marker>
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
};
