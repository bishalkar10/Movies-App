import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export default function Select({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    className = "",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={`relative min-w-[150px] ${className}`} ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`custom-select-button ${isOpen ? "ring-2" : ""}`}
            >
                <span className={`block truncate ${!selectedOption ? "opacity-50" : ""}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <FaChevronDown
                    className={`w-3 h-3 ml-2 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="custom-select-dropdown">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-400">No options</div>
                        ) : (
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`custom-select-option ${option.value === value ? "selected" : ""}`}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {option.value === value && <FaCheck className="w-3 h-3" />}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
