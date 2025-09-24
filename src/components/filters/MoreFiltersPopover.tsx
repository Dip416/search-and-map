import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Filter, RotateCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PROPERTY } from "@/services/product.services";
import customStyles from "@/lib/customStyles";
import ReactSelect from "react-select";
import {
  AREAS_SQFT_OPTIONS,
  CITY_ID,
  FURNISHED_STATUS_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
} from "@/constants/city";
import { PriceSlider } from "./PriceSlider";
import BedroomFilter from "./BedroomFilter";

export default function MoreFiltersPopover({
  filterValues,
  setFilterValues,
  handleReset,
  categoryOptions,
}: any) {
  const getAreasQuery = useQuery({
    queryKey: ["city-areas"],
    queryFn: async () => {
      const { data } = await PROPERTY.getAreaDropdown();
      return data;
    },
  });
  const getGroupNamesQuery = useQuery({
    queryKey: ["group-names"],
    queryFn: async () => {
      const { data } = await PROPERTY.getGroupNames({
        city_id: CITY_ID,
        page: 1,
        limit: 10,
        sortOrder: "desc",
        sortField: "created_at",
      });
      return data;
    },
  });
  const areaOptions =
    getAreasQuery?.data?.data?.map((c: any) => ({
      label: c.name,
      value: c._id,
    })) ?? [];
  const groupNamesOptions =
    getGroupNamesQuery?.data?.data?.list?.map((c: any) => ({
      label: c.name,
      value: c._id,
    })) ?? [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          childrenClassName="max-lg:hidden"
          icon={<Filter className="w-4 h-4" />}
        >
          More Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Filter Your Property</h2>

        {/* Area */}
        <div className="mb-3">
          <Label className="block font-semibold">Area</Label>
          <ReactSelect
            options={areaOptions || []}
            value={areaOptions.filter((opt: any) =>
              filterValues?.areas?.includes(opt.value),
            )}
            onChange={(s: any) => {
              setFilterValues((p: any) => ({
                ...p,
                areas: s.map((s: any) => s?.value),
              }));
            }}
            menuPlacement="auto"
            isMulti
            styles={customStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            placeholder="Select area"
          />
        </div>

        {/* Builder */}
        <div className="mb-3">
          <Label className="block font-semibold">
            Builder <span className="font-normal">Group</span>
          </Label>
          <ReactSelect
            options={groupNamesOptions || []}
            value={groupNamesOptions.find(
              (opt: any) => filterValues?.group_id === opt?.value,
            )}
            menuPlacement="auto"
            onChange={(s: any) => {
              setFilterValues((p: any) => ({
                ...p,
                group_id: s?.value,
              }));
            }}
            styles={customStyles}
            isClearable
            closeMenuOnSelect
            hideSelectedOptions={false}
            placeholder="Select group"
          />
        </div>
        <div className="mb-3 md:hidden">
          <Label className="block font-semibold">
            Property <span className="font-normal">Type</span>
          </Label>
          <ReactSelect
            options={categoryOptions || []}
            value={categoryOptions.filter((opt: any) =>
              filterValues?.category_ids?.includes(opt.value),
            )}
            onChange={(s: any) => {
              setFilterValues((p: any) => ({
                ...p,
                category_ids: s.map((s: any) => s.value),
              }));
            }}
            isMulti
            styles={customStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            placeholder="Property Type"
          />
        </div>
        <div className="mb-3 md:hidden">
          <Label className="block font-semibold">
            Property <span className="font-normal">Status</span>
          </Label>
          <ReactSelect
            options={PROPERTY_STATUS_OPTIONS}
            value={PROPERTY_STATUS_OPTIONS.find(
              (opt: any) => opt.value === filterValues?.status,
            )}
            onChange={(s: any) => {
              setFilterValues((p: any) => ({
                ...p,
                status: s?.value,
              }));
            }}
            styles={customStyles}
            hideSelectedOptions={false}
            placeholder="Property Status"
            isClearable
          />
        </div>

        {/* Features */}
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={filterValues?.is_sample_house_ready === "1"}
              onCheckedChange={(checked) => {
                setFilterValues({
                  ...filterValues,
                  is_sample_house_ready: checked ? "1" : null,
                });
              }}
              id="house-ready"
            />
            <Label
              htmlFor="house-ready"
              className="select-none cursor-pointer font-normal text-sm"
            >
              Sample House Ready
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={filterValues?.three_d === "1"}
              onCheckedChange={(checked) => {
                setFilterValues({
                  ...filterValues,
                  three_d: checked ? "1" : null,
                });
              }}
              id="3d-tour"
            />
            <Label
              htmlFor="3d-tour"
              className="select-none cursor-pointer font-normal text-sm"
            >
              Show Property with 3D tour
            </Label>
          </div>
        </div>

        {/* Furnished */}
        <div className="mb-3">
          <span className="block font-semibold mb-2">
            Furnished <span className="font-normal">Status</span>
          </span>
          <div className="flex flex-col space-y-1">
            <RadioGroup
              value={filterValues.furnished_status}
              onValueChange={(val) => {
                setFilterValues({
                  ...filterValues,
                  furnished_status: val,
                });
              }}
              className="gap-2"
            >
              {FURNISHED_STATUS_OPTIONS.map((f) => (
                <div key={f?.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={f?.value} id={f?.value} />
                  <Label
                    htmlFor={f?.value}
                    className="cursor-pointer font-normal text-sm"
                  >
                    {f?.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="mb-3 xl:hidden">
          <span className="block font-semibold mb-2">
            Price <span className="font-normal">Range</span>
          </span>
          <PriceSlider
            price={[filterValues?.minPrice, filterValues?.maxPrice]}
            onChange={([minPrice, maxPrice]: any) => {
              setFilterValues((p: any) => ({
                ...p,
                minPrice: minPrice,
                maxPrice: maxPrice,
              }));
            }}
          />
        </div>
        <div className="mb-3 xl:hidden">
          <BedroomFilter
            value={[filterValues?.minBedRoom, filterValues?.maxBedRoom]}
            onChange={([minBedRoom, maxBedRoom]: any) => {
              setFilterValues((p: any) => ({
                ...p,
                minBedRoom,
                maxBedRoom,
              }));
            }}
          />
        </div>

        {/* Super Built Up Area */}
        <div className="mb-4">
          <p className="block font-semibold mb-2">Super Built Up Area (sqft)</p>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <Label className="block font-semibold text-sm">Min</Label>
              <ReactSelect
                options={AREAS_SQFT_OPTIONS || []}
                value={AREAS_SQFT_OPTIONS.find(
                  (opt: any) => filterValues?.minTotalArea === opt?.value,
                )}
                menuPlacement="auto"
                onChange={(s: any) => {
                  setFilterValues((p: any) => ({
                    ...p,
                    minTotalArea: s?.value,
                  }));
                }}
                isClearable
                styles={customStyles}
                closeMenuOnSelect
                hideSelectedOptions={false}
                placeholder="Min area"
              />
            </div>
            <div className="w-1/2">
              <Label className="block font-semibold text-sm">Max</Label>
              <ReactSelect
                options={AREAS_SQFT_OPTIONS || []}
                value={AREAS_SQFT_OPTIONS.find(
                  (opt: any) => filterValues?.maxTotalArea === opt?.value,
                )}
                menuPlacement="auto"
                onChange={(s: any) => {
                  setFilterValues((p: any) => ({
                    ...p,
                    maxTotalArea: s?.value,
                  }));
                }}
                isClearable
                styles={customStyles}
                closeMenuOnSelect
                hideSelectedOptions={false}
                placeholder="Max area"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <Button icon={<RotateCcw className="w-4 h-4" />} onClick={handleReset}>
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
}
