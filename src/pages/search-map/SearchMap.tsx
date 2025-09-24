import FilterBar from "@/components/filters/FilterBar";
import SortFilter from "@/components/filters/SortFilter";
import MapView from "@/components/MapView";
import PropertyList from "@/components/PropertyList";
import { useSearchMap } from "@/context/MapProvider";

const SearchMap = () => {
  const { ignoreNextMove, setShouldFitBounds, viewMode, setViewMode } =
    useSearchMap();

  return (
    <>
      <FilterBar />
      <div className="grid h-[calc(100vh-61px)] sm:h-[calc(100vh-77px)] grid-cols-1 xl:grid-cols-2">
        <div
          className={`${viewMode === "map" ? "hidden" : "flex"} flex-col xl:flex h-full max-h-full overflow-y-auto`}
        >
          <SortFilter />
          <PropertyList />
        </div>

        <div
          className={`${viewMode === "list" ? "hidden" : "block"} xl:block h-full max-h-full w-full`}
        >
          <MapView />
        </div>
      </div>
      <div className="xl:hidden">
        <button
          onClick={() => {
            if (viewMode === "list") {
              setTimeout(() => {
                ignoreNextMove.current = "ready";
                setShouldFitBounds(true);
              }, 300);
            }
            setViewMode(viewMode === "list" ? "map" : "list");
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-3 text-white shadow-lg z-1000"
        >
          {viewMode === "list" ? "View Map" : "View List"}
        </button>
      </div>
    </>
  );
};

export default SearchMap;
