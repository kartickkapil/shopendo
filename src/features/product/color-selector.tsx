interface ColorSelectorProps {
  availableColors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  availableColors,
  selectedColor,
  onChange,
  disabled = false,
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600">Color</h3>
      <fieldset aria-label="Choose a color" className="mt-2">
        <div className="flex items-center gap-x-3">
          {availableColors.map((color) => (
            <label
              key={color}
              className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-500 focus:outline-hidden ${
                selectedColor === color ? "ring-3 ring-offset-1" : ""
              }`}
            >
              <input
                type="radio"
                disabled={disabled}
                name="color-choice"
                value={color}
                checked={selectedColor === color}
                onChange={() => onChange(color)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`size-8 rounded-full border border-black/10 ${disabled ? "opacity-50" : ""}`}
                style={{ backgroundColor: color.toLowerCase() }}
              ></span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ColorSelector;
