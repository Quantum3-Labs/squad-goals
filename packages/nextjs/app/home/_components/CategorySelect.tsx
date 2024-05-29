import React from "react";

interface CategorySelectProps {
  categories: { value: string; label: string }[];
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
}) => {
  return (
    <div className="bg-[#CDF5EE] max-w-[500px] p-4 rounded-full w-full">
      <select className="outline-none border-none bg-[#CDF5EE] placeholder-black px-2 w-full">
        <option value="" disabled selected>
          Select category
        </option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};
