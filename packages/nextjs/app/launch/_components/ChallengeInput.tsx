import React from "react";

interface ChallengeInputProps {
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const ChallengeInput: React.FC<ChallengeInputProps> = ({
  name,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{name}</span>
      <input
        className="max-w-[550px] rounded-full border-2 border-black px-4 py-1"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default ChallengeInput;
