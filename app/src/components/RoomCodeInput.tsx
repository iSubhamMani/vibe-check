"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

const RoomCodeInput = () => {
  const placeholders = ["Enter a room code"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};

export default RoomCodeInput;
