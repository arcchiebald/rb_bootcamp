
import { useState, useRef, useEffect } from 'react';

const options = [
    { id: 'newest', label: 'Newest First' },
    { id: 'price_asc', label: 'Price: Low to High' },
    { id: 'price_desc', label: 'Price: High to Low' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'title_asc', label: 'Title: A-Z' }
];

const SortingDropdown = ({ sort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Find the current selected option object based on the `sort` string prop. Default to options[0].
    const selected = options.find(o => o.id === sort) || options[0];
    
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        if (onSortChange) onSortChange(option.id);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-max">
            {/* Box Trigger */}
            <div
                onClick={toggleOpen}
                className="flex flex-row items-center justify-between px-5 py-1.75 w-full h-12.25 bg-greyscale-50 border border-greyscale-100 rounded-[10px] cursor-pointer select-none"
            >
                <div className="flex flex-row items-center gap-2">
                    <span className="type-body-s text-greyscale-500">Sort By:</span>
                    <span className="type-body-s text-purple-500">{selected.label}</span>
                </div>
                
                {/* Arrow Icon */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-15 left-0 w-58.5 flex flex-col bg-greyscale-50 border border-greyscale-100 rounded-[10px] overflow-hidden z-10 shadow-sm">
                    {options.map((option) => {
                        const isActive = option.id === selected.id;
                        return (
                            <div
                                key={option.id}
                                onClick={() => handleSelect(option)}
                                className={`flex flex-row items-center px-5 py-2.5 w-full min-h-11 cursor-pointer transition-colors duration-150 ${
                                    isActive ? 'bg-purple-100' : 'hover:bg-greyscale-100/50'
                                }`}
                            >
                                <span className={`type-body-s ${isActive ? 'text-purple-500' : 'text-greyscale-500'}`}>
                                    {option.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SortingDropdown;