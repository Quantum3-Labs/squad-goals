import React from "react";

interface SearchBarProps {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "search",
  onChange,
}) => {
  return (
    <div className="bg-[#CDF5EE] max-w-[500px] p-4 rounded-full w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none border-none bg-[#CDF5EE] placeholder-black px-2 w-full"
        onChange={onChange}
      />
    </div>
  );
};
