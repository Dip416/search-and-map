import { MapPinOff, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

type EmptyViewProps = {
  title?: string;
  description?: string;
  onReset?: () => void;
};

export default function EmptyView({
  title = "No properties match your search",
  description = "Try adjusting filters, moving the map, or broadening your search area.",
  onReset,
}: EmptyViewProps) {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center py-16 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <MapPinOff className="h-10 w-10 text-primary" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>
      {onReset && (
        <Button
          icon={<RotateCcw className="w-4 h-4" />}
          className="mt-5"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
