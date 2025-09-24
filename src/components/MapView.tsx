import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { type Property } from "@/types/property";
import formatPriceRange from "@/helpers/formatPriceRange";
import { useEffect, useMemo } from "react";
import { useSearchMap } from "@/context/MapProvider";
import PropertyCard from "./PropertyCard";
let firstRender = true;

type BoundsChangeType = (polygon: { lat: number; long: number }[]) => void;

interface BoundsListenerProps {
  onBoundsChange?: BoundsChangeType;
}

const FitBounds = () => {
  const map = useMap();
  const {
    viewMode,
    data,
    ignoreNextMove,
    shouldFitBounds,
    setShouldFitBounds,
    isSuccess,
  } = useSearchMap();

  // Extract lat-lng pairs
  const points: [number, number][] =
    data?.list?.length > 0
      ? data?.list
          ?.map(
            (p: Property) =>
              [Number(p.lat), Number(p.long)] as [number, number],
          )
          .filter(([lat, lng]: any) => !isNaN(lat) && !isNaN(lng))
      : [];

  useEffect(() => {
    if (
      points.length > 0 &&
      (firstRender ||
        (ignoreNextMove.current === "ready" && shouldFitBounds)) &&
      isSuccess
    ) {
      if (viewMode === "map") {
        map.invalidateSize();
        ignoreNextMove.current = "idle";
      }
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
      firstRender = false;
      setShouldFitBounds(false);
    }
  }, [points, map, isSuccess, viewMode]);

  return null;
};

const BoundsListener = ({ onBoundsChange }: BoundsListenerProps) => {
  const { ignoreNextMove } = useSearchMap();
  useMapEvents({
    autopanstart: () => {
      ignoreNextMove.current = "ready";
    },
    moveend: (e) => handleBounds(e.target),
    zoomend: (e) => handleBounds(e.target),
  });

  const handleBounds = (map: L.Map) => {
    if (ignoreNextMove.current === "ready") {
      ignoreNextMove.current = "idle";
      return;
    }
    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    const northWest = L.latLng(northEast.lat, southWest.lng);
    const southEast = L.latLng(southWest.lat, northEast.lng);

    const polygon = [
      { lat: northEast.lat, long: northEast.lng },
      { lat: northWest.lat, long: northWest.lng },
      { lat: southWest.lat, long: southWest.lng },
      { lat: southEast.lat, long: southEast.lng },
      { lat: northEast.lat, long: northEast.lng }, // close the polygon
    ];

    onBoundsChange?.(polygon);
  };

  return null;
};

export default function MapView() {
  const { data, refetchProperties } = useSearchMap();
  const properties: Property[] = useMemo(() => data?.list || [], [data]);

  return (
    <MapContainer
      //  center={[23.0225, 72.5714]}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Fit initial bounds */}
      <FitBounds />
      {/* Listen to map bounds changes */}
      <BoundsListener
        onBoundsChange={(p) => {
          refetchProperties(1, { drawnArea: p });
        }}
      />

      {properties.map((p: Property) => (
        <Marker
          key={p._id}
          position={[Number(p.lat), Number(p.long)]}
          icon={L.divIcon({
            className: "custom-price-marker",
            html: `
              <div class="relative flex flex-col items-center">
                <div class="bg-primary text-white whitespace-nowrap font-normal px-2 py-1 rounded-full shadow text-xs">
                  ${formatPriceRange(p)}
                </div>
                <div class="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-primary"></div>
              </div>
            `,
            iconSize: [80, 40],
            iconAnchor: [40, 40], // arrow tip points to location
          })}
          // eventHandlers={{ click: () => onSelect(p.id) }}
        >
          <Popup offset={[0, -30]} className="">
            <PropertyCard property={p} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
