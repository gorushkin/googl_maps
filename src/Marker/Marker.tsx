import { FC, useRef, useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';

type LatLngLiteral = google.maps.LatLngLiteral;
type Map = google.maps.Map;
type AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;

interface MarkerProps {
  map: Map | null;
  position: LatLngLiteral;
  children: React.ReactNode;
}

export const Marker: FC<MarkerProps> = ({ map, position, children }) => {
  const markerRef = useRef<AdvancedMarkerElement>();
  const rootRef = useRef<Root>();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement('div');
      rootRef.current = createRoot(container);
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
      });
    }
  }, [position]);

  useEffect(() => {
    if (!markerRef.current || !rootRef.current) return;
    rootRef.current.render(children);
    markerRef.current.position = position;
    markerRef.current.map = map;
  }, [map, position, children]);

  return <></>;
};
