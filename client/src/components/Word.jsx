import { twMerge } from "tailwind-merge";

const Word = ({ children, className }) => {
  return (
    <span
      className={twMerge(
        "bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-2 py-1 rotate-3 inline-block font-semibold shadow-md",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Word;
