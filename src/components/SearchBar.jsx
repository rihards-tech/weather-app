import { FaSearch } from "react-icons/fa";

export default function SearchBar(props) {
  const {
    searchValue,
    onSearchChange,
    onButtonClick,
  } = props;

  return (
    <div 
      className="
        flex items-center gap-3
        rounded-3xl
        border border-white/40 dark:border-white/10
        bg-white/30 dark:bg-white/10
        px-4 py-3
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        transition-colors duration-300
      "
    >
      <FaSearch className="
        text-lg text-gray-600 dark:text-white/70
        transition-colors duration-300
      " 
      />
      <input 
        type="text" 
        placeholder="Search city..."
        value={searchValue}
        onChange={onSearchChange}
        className="
          w-full
          bg-transparent
          text-gray-800
          placeholder:text-gray-500
          outline-none

          dark:text-white
          dark:placeholder:text-white/50
          transition-colors duration-300
        "
      />
      <button 
        onClick={onButtonClick}
        className="
          rounded-full
          bg-white/40
          px-4 py-2
          text-sm font-medium text-gray-700
          transition-colors duration-300 hover:bg-white/60

          dark:bg-white/10
          dark:text-white
          dark:hover:bg-white/20
        "
      >
        Search
      </button>
    </div>
  );
}