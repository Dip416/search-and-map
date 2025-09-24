// src/context/MapContext.tsx
import { CITY_ID } from "@/constants/city";
import { queryLoading } from "@/helpers/queryLoading";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY } from "@/services/product.services";
import type { Filters } from "@/types/property";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type MapContextType = {
  filters: Filters;
  data: any;
  refetchProperties: (page: number, newFilters?: Omit<Filters, "page">) => void;
  ignoreNextMove: React.MutableRefObject<"idle" | "pending" | "ready">;
  loading: boolean;
  isSuccess: boolean;
  shouldFitBounds: boolean;
  setShouldFitBounds: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: "list" | "map";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "map">>;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>({ page: 1 });
  const debouncedFilters = useDebounce(filters, 500);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  // const ignoreNextMove = useRef(true);
  const ignoreNextMove = useRef<"idle" | "pending" | "ready">("idle");
  const [shouldFitBounds, setShouldFitBounds] = useState(false);

  // const [fetching, setFetching] = useState(false);
  // const queryClient = useQueryClient();

  const getPropertyListQuery = useQuery({
    queryKey: ["property-list", debouncedFilters],
    queryFn: async ({ queryKey }) => {
      const [, { drawnArea, areas, category_ids, page, ...currentFilters }] =
        queryKey as [string, typeof filters];
      const { data } = await PROPERTY.getList(
        {
          city_id: CITY_ID,
          page: page || 1,
          limit: 50,
          ...currentFilters,
        },
        {
          drawnArea,
          areas,
          category_ids: category_ids?.length ? category_ids : "",
        },
      );
      return data;
    },
    staleTime: 0,
  });

  const data = useMemo(
    () => getPropertyListQuery?.data?.data,
    [getPropertyListQuery?.data?.data],
  );
  const loading: boolean = useMemo(
    () => queryLoading(getPropertyListQuery),
    [getPropertyListQuery],
  );

  const refetchProperties = (
    newPage: number = 1,
    newFilters?: Omit<Filters, "page">,
  ) => {
    newFilters = newFilters || {};
    const { drawnArea, ...remainings } = newFilters;
    setFilters(({ drawnArea, ...prev }) =>
      !newFilters.hasOwnProperty("drawnArea")
        ? { ...remainings, page: newPage }
        : { ...prev, ...newFilters, page: newPage },
    );
    if (!newFilters.hasOwnProperty("drawnArea")) {
      ignoreNextMove.current = "pending";
    }
  };

  // useEffect(() => {
  //   const properties = getPropertyListQuery.data?.data;
  //   if (properties?.list?.length && mapRef.current) {
  //     fitBounds(properties?.list);
  //   }
  // }, [getPropertyListQuery.data, fitBounds]);

  useEffect(() => {
    if (getPropertyListQuery.isSuccess && !loading) {
      if (ignoreNextMove.current === "pending") {
        ignoreNextMove.current = "ready";
        setShouldFitBounds(true); // trigger FitBounds
      }
    }
  }, [loading]);

  return (
    <MapContext.Provider
      value={{
        filters,
        data,
        loading,
        isSuccess: getPropertyListQuery.isSuccess,
        refetchProperties,
        ignoreNextMove,
        shouldFitBounds,
        setShouldFitBounds,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useSearchMap = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useSearchMap must be used inside MapProvider");
  return ctx;
};
