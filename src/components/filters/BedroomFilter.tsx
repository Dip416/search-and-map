import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { Label } from "../ui/label";

export default function BedroomFilter({ value, onChange }: any) {
  const options: (number | "any")[] = ["any", 1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">Bedrooms</p>
      <div className="grid grid-cols-6 gap-2">
        {options.map((opt) => (
          <Button
            key={opt}
            size="sm"
            variant="outline"
            className={clsx(
              "w-10 h-10",
              (value[0] === opt || (!value[0] && opt === "any")) &&
                "bg-primary text-white hover:bg-primary hover:text-white",
            )}
            onClick={() => {
              onChange(
                opt === "any" ? [null, null] : [opt, !!value[1] ? opt : null],
              );
            }}
          >
            {opt === "any" ? "Any" : opt + (!value[1] ? "+" : "")}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          id="exact-match"
          checked={!!value[1]}
          disabled={!value[0]}
          className="cursor-pointer"
          onCheckedChange={(val) => {
            onChange([value[0], val ? value[0] : null]);
          }}
        />
        <Label
          htmlFor="exact-match"
          className="text-sm select-none cursor-pointer"
        >
          Use exact match
        </Label>
      </div>
    </div>
  );
}
