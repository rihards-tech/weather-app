import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar(props) {
  const {
    searchValue,
    onSearchChange,
    onButtonClick,
    isLoading,
    suggestions,
    showSuggestions,
    isSuggestionsLoading,
    onSuggestionsClick,
    onCloseSuggestions,
    onOpenSuggestions,
  } = props;

  const inputRef = useRef(null);
  const firstSuggestionRef = useRef(null);
  const containerRef = useRef(null);

  function handleSubmit() {
    if (isLoading === "loading" || !searchValue.trim()) return;
    onButtonClick();
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onCloseSuggestions();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseSuggestions]);

  return (
    <div ref={containerRef} className="relative">
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
          ref={inputRef}
          placeholder="Search city..."
          disabled={isLoading === "loading"}
          value={searchValue}
          onChange={onSearchChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              onOpenSuggestions();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }

            if (
              event.key === "ArrowDown" &&
              showSuggestions &&
              suggestions.length > 0 &&
              firstSuggestionRef.current
            ) {
              event.preventDefault();
              firstSuggestionRef.current.focus();
            }
          }}
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
          onClick={handleSubmit}
          disabled={isLoading === "loading" || !searchValue.trim()}
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
          {isLoading === "loading" ? "Loading..." : "Search"}
        </button>
      </div>
      {showSuggestions && (
        <div
          className="
            absolute left-0 right-0 mt-2
            rounded-2xl
            border border-white/30 dark:border-white/10
            bg-white/40 dark:bg-white/10
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            overflow-hidden
            z-40
          "
        >
          {isSuggestionsLoading && (
            <div className="p-3 text-sm text-gray-600 dark:text-white/70">
              Searching...
            </div>
          )}

          {!isSuggestionsLoading && suggestions.length === 0 && (
            <div className="p-3 text-sm text-gray-600 dark:text-white/70">
              No results
            </div>
          )}

          {!isSuggestionsLoading && suggestions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              ref={index === 0 ? firstSuggestionRef : null}
              onClick={() => onSuggestionsClick(item)}
              onKeyDown={(event) => {
                if (event.key === "Escape" && inputRef.current) {
                  event.preventDefault();
                  inputRef.current.focus();
                }
              }}
              className="
                block w-full cursor-pointer px-4 py-3 text-left
                text-sm text-gray-800
                transition-colors duration-200
                hover:bg-white/50 focus:bg-white/50 focus:outline-none
                dark:text-white
                dark:hover:bg-white/10 dark:focus:bg-white/10
              "
            >
              <div className="font-medium">
                {item.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-white/60">
                {item.country}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}