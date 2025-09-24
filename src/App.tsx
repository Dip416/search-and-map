import { MapProvider } from "./context/MapProvider";
import SearchMap from "./pages/search-map/SearchMap";

export default function App() {
  return (
    <div className="h-screen">
      <MapProvider>
        <SearchMap />
      </MapProvider>
    </div>
  );
}
