import { MapPin, Eye } from "lucide-react";
import type { Property } from "@/types/property";
import getProjectDescription from "@/helpers/getProjectDescription";
import formatViews from "@/helpers/formatViews";
import ImageSlider from "./ImageSlider";

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="mx-auto w-full h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image Carousel Container */}
      <ImageSlider property={property} />
      {/* Property Details */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          {/* Header with title and menu */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
            {property?.name}
          </h3>

          {/* Developer */}
          {property?.group_name && property?.group_name?.length > 0 ? (
            <p className="text-gray-600 text-sm !mt-0 mb-3">
              By {property.group_name[0]}
            </p>
          ) : null}
        </div>
        {/* Location */}
        <div>
          <div className="flex items-start gap-2 mb-3">
            <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 text-sm truncate leading-relaxed !my-0">
              {property?.location}
            </p>
          </div>

          {/* Property Details and Views */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-xs !my-0">
              {getProjectDescription(property)}
            </p>
            <div className="flex items-center gap-1 text-gray-500">
              <Eye size={14} />
              <span className="text-xs">
                {formatViews(property?.view_count)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
