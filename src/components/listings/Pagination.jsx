const PaginationButton = ({ onClick, disabled, active, children }) => {
    let styles = "flex items-center justify-center w-10 h-10 border rounded box-border type-buttons-s transition-colors duration-200 select-none";

    if (active) {
        styles += " bg-purple-600 border-purple-500 text-greyscale-50";
    } else if (disabled) {
        styles += " bg-greyscale-50 border-greyscale-200 text-greyscale-200 cursor-not-allowed";
    } else {
        styles += " bg-greyscale-50 border-greyscale-200 text-purple-500 hover:bg-purple-100 hover:border-purple-200 cursor-pointer";
    }

    return (
        <button onClick={onClick} disabled={disabled} className={styles}>
            {children}
        </button>
    );
};

const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange?.(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange?.(currentPage + 1);
    };

    const generatePages = () => {
        const pages = [];
        
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        
        return pages.map((page, index) => {
            // Render Ellipsis
            if (page === '...') {
                return (
                    <div 
                        key={`ellipsis-${index}`} 
                        className="flex items-center justify-center w-10 h-10 border rounded box-border type-buttons-s bg-greyscale-50 border-greyscale-200 text-purple-500 select-none"
                    >
                        ...
                    </div>
                );
            }
            
            // Render Page Number
            return (
                <PaginationButton 
                    key={page} 
                    active={currentPage === page} 
                    onClick={() => onPageChange?.(page)}
                >
                    {page}
                </PaginationButton>
            );
        });
    };

    if (totalPages === 0) return null;

    return (
        <div className="flex flex-row items-center justify-center gap-2 w-full">
            {/* Previous Page Button */}
            <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
                <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M7.24077 4.78977L8.2635 5.80114L4.71236 9.35227L13.6328 9.35227L13.6328 10.8295L4.71236 10.8295L8.26349 14.375L7.24077 15.392L1.93963 10.0909L7.24077 4.78977Z" />
                </svg>
            </PaginationButton>
            
            {generatePages()}
            
            {/* Next Page Button */}
            <PaginationButton onClick={handleNext} disabled={currentPage === totalPages}>
                <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M7.75923 18.2102L6.73651 17.1989L10.2876 13.6477H1.36719V12.1705H10.2876L6.73651 8.625L7.75923 7.60795L13.0604 12.9091L7.75923 18.2102Z" />
                </svg>
            </PaginationButton>
        </div>
    );
};

export default Pagination;