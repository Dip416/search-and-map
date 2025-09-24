import PropertyCard from "./PropertyCard";
import DynamicPagination from "./DynamicPagination";
import { useSearchMap } from "@/context/MapProvider";
import type { Property } from "@/types/property";
import Loader from "./loader/Loader";
import EmptyView from "./empty/Empty";

export default function PropertyList() {
  const { data, filters, refetchProperties, loading } = useSearchMap();
  if (loading) {
    return <Loader />;
  }
  if (!data?.list || data?.list?.length === 0) {
    return (
      <EmptyView
        onReset={() => {
          refetchProperties(1, {});
        }}
      />
    );
  }
  return (
    <>
      <div className="p-3 sm:p-5 grid gap-5 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 3xl:grid-cols-3">
        {data?.list?.map((p: Property) => (
          <div key={p._id}>
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
      <div className="mt-5 max-xl:mb-24 mb-10">
        <DynamicPagination
          currentPage={data?.current_page || 1}
          totalPages={data?.total_page}
          onPageChange={(newPage) => {
            const { page, drawnArea, ...restFilters } = filters;
            refetchProperties(newPage, restFilters);
          }}
          totalCount={data?.total_count}
          maxVisible={3}
        />
      </div>
    </>
  );
}
