"use client";

const Button = ({
  onClick,
  content,
}: {
  onClick: () => void;
  content: string;
}) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 inline-flex h-12 hover:scale-95 transition-all duration-200 ease-in-out animate-shimmer items-center justify-center rounded-full border border-white bg-[linear-gradient(110deg,#5555e0,45%,#aa46e0,55%,#5555e0)] bg-[length:200%_100%] px-6 font-medium text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      {content}
    </button>
  );
};

export default Button;
