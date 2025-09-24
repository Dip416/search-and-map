import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

export const PriceSlider = ({ price, onChange }: any) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          type="number"
          value={price[0]}
          onChange={(e) => onChange([+e.target.value, price[1]])}
        />
        <Input
          type="number"
          value={price[1]}
          onChange={(e) => onChange([price[0], +e.target.value])}
        />
      </div>
      <Slider
        value={price}
        onValueChange={(val) => onChange([val[0], val[1]])}
        max={50000000}
        min={1000000}
        step={100000}
      />
      <p className="text-sm text-gray-500">
        {`${(price[0] / 100000).toFixed(2)} L - ${(price[1] / 10000000).toFixed(2)} Cr`}
      </p>
    </div>
  );
};
