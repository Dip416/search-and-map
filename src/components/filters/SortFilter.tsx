import { SORT_OPTIONS } from "@/constants/city";
import { useSearchMap } from "@/context/MapProvider";
import ReactSelect from "react-select";
import customStyles from "@/lib/customStyles";
import { memo, useEffect, useRef, useState } from "react";
import { cleanFilters } from "@/helpers/cleanFilters";

const SortFilter = () => {
  const { data, filters, refetchProperties } = useSearchMap();
  const [sortValues, setSortValues] = useState<{
    sortOrder?: string;
    sortField?: string;
  }>({});
  console.log("sortValues", sortValues);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const { page, drawnArea, ...restFilters } = filters;
    refetchProperties(1, { ...restFilters, ...cleanFilters(sortValues) });
    return () => {};
  }, [sortValues]);

  return (
    <div className="flex items-center justify-between p-3 sm:p-5 !pb-0">
      {/* Left - Results count */}
      <p className="text-sm text-gray-600 max-sm:hidden">
        Showing <span className="font-medium">{data?.list?.length || 0}</span>{" "}
        of <span className="font-medium">{data?.total_count || 0}</span> results
      </p>
      <p className="text-sm text-gray-600 sm:hidden font-normal">
        <span className="font-medium">Result:</span> {data?.list?.length || 0}/{" "}
        <span className="font-medium">{data?.total_count || 0}</span>
      </p>

      {/* Right - Sort Filter */}
      <div className="w-[180px] ml-auto xs:w-[220px]">
        <ReactSelect
          options={SORT_OPTIONS}
          getOptionLabel={(opt) => opt?.label}
          getOptionValue={(opt) =>
            `${opt?.value?.sortField}-${opt?.value?.sortOrder}`
          }
          value={SORT_OPTIONS?.find(
            (opt) =>
              opt?.value?.sortField === sortValues?.sortField &&
              opt?.value?.sortOrder === sortValues?.sortOrder,
          )}
          onChange={(option: any) => {
            setSortValues(() => ({
              sortField: option?.value?.sortField,
              sortOrder: option?.value?.sortOrder,
            }));
          }}
          isClearable
          styles={customStyles}
          placeholder="Sort By"
        />
      </div>
    </div>
  );
};

export default memo(SortFilter);
