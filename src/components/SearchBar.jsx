import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div 
      className="
        flex items-center gap-3
        rounded-3xl
        border border-white/40
        bg-white/30
        px-4 py-3
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
      "
    >
      <FaSearch className="text-lg text-gray-600" />
      <input 
        type="text" 
        placeholder="Search city..."
        className="
          w-full
          bg-transparent
          text-gray-800
          placeholder:text-gray-500
          outline-none
        "
      />
      <button 
        className="
          rounded-full
          bg-white/40
          px-4 py-2
          text-sm font-medium text-gray-700
          transition duration-300 hover:bg-white/60
        "
      >
        Search
      </button>
    </div>
  );
}