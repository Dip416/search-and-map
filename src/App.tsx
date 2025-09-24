import { lazy, Suspense } from "react";
import { MapProvider } from "./context/MapProvider";
import Loader from "./components/loader/Loader";
const SearchMap = lazy(() => import("./pages/search-map/SearchMap"));

export default function App() {
  return (
    <div className="h-screen">
      <MapProvider>
        <Suspense fallback={<Loader />}>
          <SearchMap />
        </Suspense>
      </MapProvider>
    </div>
  );
}
