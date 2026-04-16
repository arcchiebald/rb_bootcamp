const DAY_SHORT_LABELS = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
};

const toThreeLetterDay = (day) => {
    const normalized = String(day || "").trim().toLowerCase();
    if (DAY_SHORT_LABELS[normalized]) {
        return DAY_SHORT_LABELS[normalized];
    }

    if (!normalized) {
        return "";
    }

    return normalized.slice(0, 3).replace(/^./, (char) => char.toUpperCase());
};

const formatDaysLabel = (days) => {
    if (Array.isArray(days)) {
        const [from, to] = days;
        const fromNormalized = String(from || "").trim().toLowerCase();
        const toNormalized = String(to || "").trim().toLowerCase();

        if (fromNormalized === "saturday" && toNormalized === "sunday") {
            return "Weekend";
        }

        const fromLabel = toThreeLetterDay(from);
        const toLabel = toThreeLetterDay(to);

        if (fromLabel && toLabel) {
            return `${fromLabel} - ${toLabel}`;
        }

        return fromLabel || toLabel || "";
    }

    if (typeof days === "string") {
        return days;
    }

    return "";
};

const WeekDays = ({
    days = ["monday", "wednesday"],
    disabled = false,
    onClick,
}) => {
    const daysLabel = formatDaysLabel(days);

    // CSS Classes based on disabled state
    const boxClasses = disabled 
        ? "bg-greyscale-100 border-greyscale-200 cursor-not-allowed" 
        : "bg-greyscale-50 border-greyscale-200 group cursor-pointer hover:bg-purple-100 hover:border-purple-300 transition-colors duration-300";
    
    const textClasses = disabled 
        ? "text-greyscale-200" 
        : "text-greyscale-800 group-hover:text-purple-500 transition-colors duration-300";

    return (
        <div 
            className={`box-border flex flex-row justify-center items-center p-2.5 gap-2.5 w-full h-22.75 border rounded-xl ${boxClasses}`}
            onClick={!disabled ? onClick : undefined}
        >
            <span className={`type-heading-5 text-center ${textClasses}`}>
                {daysLabel}
            </span>
        </div>
    );
};

export default WeekDays;