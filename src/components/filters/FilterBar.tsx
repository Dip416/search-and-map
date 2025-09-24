import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { RotateCcw, Search } from "lucide-react";
import { PROPERTY_STATUS_OPTIONS } from "@/constants/city";
import BedroomFilter from "./BedroomFilter";
import { useQuery } from "@tanstack/react-query";
import { PROPERTY } from "@/services/product.services";
import ReactSelect from "react-select";
import customStyles from "@/lib/customStyles";
import MoreFiltersPopover from "./MoreFiltersPopover";
import { useSearchMap } from "@/context/MapProvider";
import type { Filters } from "@/types/property";
import { PriceSlider } from "./PriceSlider";
import { cleanFilters } from "@/helpers/cleanFilters";
import { useDebounce } from "@/hooks/useDebounce";
export default function FilterBar() {
  const { refetchProperties } = useSearchMap();
  const isFirstRender = useRef(true);
  const [filterValues, setFilterValues] = useState<Omit<Filters, "page">>({
    minPrice: 1000000,
    maxPrice: 50000000,
  });
  const debouncedFiltersValues = useDebounce(filterValues, 300);

  const getCategroiesQuery = useQuery({
    queryKey: ["property-categories"],
    queryFn: async () => {
      const { data } = await PROPERTY.getCategories();
      return data;
    },
  });
  const categoryOptions =
    getCategroiesQuery?.data?.data?.map((c: any) => ({
      label: c.name,
      value: c._id,
    })) ?? [];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refetchProperties(1, cleanFilters(debouncedFiltersValues));
    return () => {};
  }, [debouncedFiltersValues]);

  const handleReset = () => {
    setFilterValues({
      minPrice: 1000000,
      maxPrice: 50000000,
    });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center border-b p-3 sm:p-5 bg-white">
      <div className="relative lg:max-w-100 max-w-70 w-full flex-1">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Project Name, Area, Property Type"
          className="w-full pl-4 pr-12 py-3 border bg-white border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={filterValues?.searchQuery || ""}
          onChange={(e) => {
            setFilterValues((p) => ({ ...p, searchQuery: e?.target?.value }));
          }}
        />
      </div>
      <ReactSelect
        options={categoryOptions || []}
        value={categoryOptions.filter((opt: any) =>
          filterValues?.category_ids?.includes(opt.value),
        )}
        onChange={(s: any) => {
          setFilterValues((p) => ({
            ...p,
            category_ids: s.map((s: any) => s.value),
          }));
        }}
        isMulti
        styles={customStyles}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        placeholder="Property Type"
        className="hidden md:block"
      />

      {/* Price Range */}
      <Popover>
        <PopoverTrigger asChild className="hidden xl:block">
          <Button
            variant="outline"
            className="w-[160px] text-[#808080] font-normal"
          >
            {(filterValues?.minPrice === 1000000 &&
              filterValues?.maxPrice === 50000000) ||
            !(filterValues?.minPrice && filterValues?.maxPrice) ? (
              "Price"
            ) : (
              <span className="text-black font-semibold">
                {(filterValues?.minPrice / 100000).toFixed(2)} L -{" "}
                {(filterValues?.maxPrice / 10000000).toFixed(2)} Cr
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]">
          <PriceSlider
            price={[filterValues?.minPrice, filterValues?.maxPrice]}
            onChange={([minPrice, maxPrice]: any) => {
              setFilterValues((p) => ({
                ...p,
                minPrice: minPrice,
                maxPrice: maxPrice,
              }));
            }}
          />
        </PopoverContent>
      </Popover>

      <ReactSelect
        options={PROPERTY_STATUS_OPTIONS}
        value={PROPERTY_STATUS_OPTIONS.find(
          (opt: any) => opt.value === filterValues?.status,
        )}
        onChange={(s: any) => {
          setFilterValues((p) => ({
            ...p,
            status: s?.value,
          }));
        }}
        styles={customStyles}
        hideSelectedOptions={false}
        placeholder="Property Status"
        isClearable
        className="hidden md:block"
      />
      <Popover>
        <PopoverTrigger asChild className="hidden xl:block">
          <Button variant="outline" className="w-[120px]">
            {!filterValues?.minBedRoom
              ? "Any BHK"
              : `${filterValues?.minBedRoom}${!filterValues?.maxBedRoom ? "+" : ""} BHK`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]">
          <BedroomFilter
            value={[filterValues?.minBedRoom, filterValues?.maxBedRoom]}
            onChange={([minBedRoom, maxBedRoom]: any) => {
              setFilterValues((p) => ({
                ...p,
                minBedRoom,
                maxBedRoom,
              }));
            }}
          />
        </PopoverContent>
      </Popover>

      <MoreFiltersPopover
        categoryOptions={categoryOptions}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        handleReset={handleReset}
      />
      {/* Reset */}
      <Button
        icon={<RotateCcw className="w-4 h-4" />}
        childrenClassName="max-lg:hidden"
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  );
}
