interface DropdownProps {
  label: string;
  options: string[] | { value: string; label: string }[];
  onSelect: (value: string) => void;
}

function Dropdown({ label, options, onSelect }: DropdownProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 bg-black/30 border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:border-neon-cyan transition-colors"
      >
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const displayLabel = typeof option === 'string' ? option : option.label;
          
          return (
            <option key={value} value={value} className="bg-gray-900">
              {displayLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;