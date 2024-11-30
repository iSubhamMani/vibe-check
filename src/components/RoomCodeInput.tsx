"use client";

import { useState } from "react";
import { validateRoomCode } from "@/lib/actions/validateRoomCode";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const RoomCodeInput = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await validateRoomCode(code);

      if (res.success) {
        router.push(`/r/${code}`);
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white px-4 py-2 overflow-hidden max-w-sm rounded-full border-2 border-indigo-300 focus-within:border-purple-500 flex items-center justify-between">
      <input
        className="w-full outline-none border-none"
        type="number"
        value={code}
        onChange={handleChange}
        placeholder="Enter a room code"
      />
      <button className="" onClick={onSubmit}>
        {loading ? (
          <Spinner className="animate-spin size-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white p-1.5" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 hover:opacity-95 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white p-1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default RoomCodeInput;
