import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AutoCompleteProps, Option } from "./AutoComplete.types";

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, isLoading, onClickOption }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Option[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const debounceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filterData = useCallback(async (input: string): Promise<Option[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const regex = new RegExp(input, "i");
        const filtered = options.filter((item) => regex.test(item.label));
        resolve(filtered);
      }, 150);
    });
  }, [options]);

  // Effect to handle input changes and fetch suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim() === "") {
      setSuggestions(options); // Show all suggestions if input is empty
      return;
    }

    debounceRef.current = setTimeout(() => {
      filterData(query).then((data) => {
        setSuggestions(data);
      });
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, filterData]);

  // Memoize highlightMatch function
  const highlightMatch = useCallback((text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "ig");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: "blue" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }, []);

  const memoizedSuggestions = useMemo(() => suggestions, [suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        selectSuggestion(suggestions[activeIndex]);
      }
    }
  };

  const selectSuggestion = (suggestion: Option) => {
    setQuery(suggestion.label);
    setSuggestions([]);
    setIsFocused(false);
    onClickOption?.(suggestion);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setSuggestions(options);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[400px] mx-auto" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          disabled={isLoading}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            cursor: isLoading ? "not-allowed" : "auto",
          }}
          onFocus={handleFocus}
          className="border-0.1 border-[#0842a0] rounded-[10px] w-full h-[40px] text-[24px] font-[500] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 pr-10"
          placeholder="Type to search..."
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {(isFocused && !isLoading) && (
        <ul
          id="suggestion-list"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            padding: "0px",
          }}
          className="absolute left-0 right-0 w-full p-0 border border-[#0842a0] bg-white z-10 rounded-[5px] mt-1 shadow-lg text-[20px] font-[500] list-none"
        >
          {memoizedSuggestions.length > 0 ? (
            memoizedSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className={`p-2 mt-5 mb-5 cursor-pointer hover:bg-gray-200 ${
                  index === activeIndex ? "bg-gray-300" : ""
                }`}
              >
                {highlightMatch(suggestion.label, query)}
              </li>
            ))
          ) : (
            <li className="p-2 cursor-pointer hover:bg-gray-200">
              No Results Found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;