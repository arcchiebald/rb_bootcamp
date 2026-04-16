import { useEffect, useRef, useState } from "react";
import WeekDays from "./WeekDays";
import TimeSlot from "./TimeSlot";
import Session from "./Session";
import Warning from "./Warning";

const formatMoney = (amount) => {
    const value = Number(amount || 0);
    return `$${value.toFixed(2)}`;
};

const normalizeSessionType = (value) => String(value || "online").toLowerCase().replace("-", "_");

const formatTimeRange = (startTime, endTime) => {
    if (!startTime && !endTime) {
        return "";
    }

    const start = String(startTime || "").slice(0, 5);
    const end = String(endTime || "").slice(0, 5);
    return `${start} - ${end}`.trim();
};

const Title = ({ stage = 1, title = "Course Introduction", disabled = true, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [children, isOpen]);

    const textColor = disabled ? "text-greyscale-400" : "text-purple-800 hover:text-purple-200 transition-colors duration-300 ";
    const svgStroke = disabled ? "#8A8A8A" : "#0A0836";

    const icons = {
        1: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4541 2.7041C17.5704 2.7041 20.5591 3.94196 22.7627 6.14551C24.9662 8.34906 26.2041 11.3378 26.2041 14.4541C26.2041 15.997 25.9 17.5247 25.3096 18.9502C24.7191 20.3758 23.8538 21.6716 22.7627 22.7627C21.6716 23.8538 20.3758 24.7191 18.9502 25.3096C17.5247 25.9 15.997 26.2041 14.4541 26.2041C12.9112 26.2041 11.3835 25.9 9.95801 25.3096C8.53243 24.7191 7.2366 23.8538 6.14551 22.7627C5.05442 21.6716 4.18913 20.3758 3.59863 18.9502C3.00823 17.5247 2.7041 15.997 2.7041 14.4541C2.7041 11.3378 3.94196 8.34906 6.14551 6.14551C8.34906 3.94196 11.3378 2.7041 14.4541 2.7041Z" stroke={svgStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.8788 18.6866V9.3125L11.6565 11.656" stroke={svgStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        2: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0234 2.27344C17.1397 2.27344 20.1285 3.51129 22.332 5.71484C24.5356 7.9184 25.7734 10.9071 25.7734 14.0234C25.7734 15.5663 25.4693 17.094 24.8789 18.5195C24.2884 19.9451 23.4231 21.2409 22.332 22.332C21.2409 23.4231 19.9451 24.2884 18.5195 24.8789C17.094 25.4693 15.5663 25.7734 14.0234 25.7734C12.4805 25.7734 10.9528 25.4693 9.52734 24.8789C8.10177 24.2884 6.80593 23.4231 5.71484 22.332C4.62376 21.2409 3.75846 19.9451 3.16797 18.5195C2.57757 17.094 2.27344 15.5663 2.27344 14.0234C2.27344 10.9071 3.51129 7.9184 5.71484 5.71484C7.9184 3.51129 10.9071 2.27344 14.0234 2.27344Z" stroke={svgStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5236 12.0179C10.5236 8.30393 16.941 8.30393 16.941 12.0179C16.941 14.8213 12.7485 17.2385 10.5236 18.7677C10.5236 18.7677 14.6953 18.1717 17.4764 18.7677" stroke={svgStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        3: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9944 2.15332C17.1107 2.15332 20.0995 3.39117 22.303 5.59473C24.5066 7.79828 25.7444 10.787 25.7444 13.9033C25.7444 15.4462 25.4403 16.9739 24.8499 18.3994C24.2594 19.825 23.3941 21.1208 22.303 22.2119C21.2119 23.303 19.9161 24.1683 18.4905 24.7588C17.065 25.3492 15.5373 25.6533 13.9944 25.6533C12.4515 25.6533 10.9238 25.3492 9.49833 24.7588C8.07275 24.1683 6.77692 23.303 5.68583 22.2119C4.59474 21.1208 3.72945 19.825 3.13895 18.3994C2.54855 16.9739 2.24442 15.4462 2.24442 13.9033C2.24442 10.787 3.48228 7.79828 5.68583 5.59473C7.88938 3.39117 10.8781 2.15332 13.9944 2.15332Z" stroke={svgStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.3224 11.4715C10.3224 8.11886 17.6776 8.11886 17.6776 11.4715C17.6776 11.4715 17.6776 14.0009 14 14.0009C17.6776 14.0009 17.6776 16.5302 17.6776 16.5302C17.6776 19.8829 10.3224 19.8829 10.3224 16.5302" stroke={svgStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    };

    return (
        <div className="flex flex-col w-135.5">
            <div
                className="flex flex-row justify-between items-center w-full cursor-pointer group"
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-center p-0 gap-2 w-fit h-7.25">
                    <div className="w-7 h-7 flex-none">
                        {icons[stage] || icons[1]}
                    </div>
                    <span className={`type-heading-3 ${textColor}`}>
                        {title}
                    </span>
                </div>

                <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.06424 10.7603C6.99207 10.6983 6.90717 10.6499 6.81439 10.6177C6.72161 10.5855 6.62278 10.5703 6.52352 10.5729C6.42426 10.5754 6.32653 10.5957 6.2359 10.6326C6.14527 10.6695 6.06352 10.7222 5.99532 10.7878C5.92712 10.8534 5.8738 10.9306 5.83841 11.0149C5.80302 11.0992 5.78625 11.189 5.78906 11.2792C5.79187 11.3695 5.8142 11.4583 5.85478 11.5407C5.89536 11.623 5.95339 11.6973 6.02556 11.7593L12.8291 17.5993C12.9695 17.7199 13.1553 17.7871 13.3485 17.7871C13.5416 17.7871 13.7275 17.7199 13.8678 17.5993L20.6721 11.7593C20.7459 11.6977 20.8055 11.6234 20.8474 11.5408C20.8892 11.4581 20.9127 11.3687 20.9162 11.2777C20.9198 11.1868 20.9034 11.0961 20.8681 11.0109C20.8327 10.9257 20.7791 10.8478 20.7104 10.7816C20.6416 10.7154 20.5591 10.6623 20.4675 10.6254C20.376 10.5885 20.2773 10.5684 20.1772 10.5664C20.0771 10.5645 19.9775 10.5806 19.8843 10.6139C19.7911 10.6471 19.7061 10.6969 19.6342 10.7603L13.3485 16.1551L7.06424 10.7603Z" fill={disabled ? "#8A8A8A" : "#130E67"} />
                    </svg>
                </div>
            </div>

            <div
                className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                style={{
                    maxHeight: isOpen && !disabled ? `${contentHeight}px` : "0px",
                    opacity: isOpen && !disabled ? 1 : 0,
                }}
            >
                <div ref={contentRef} className="flex flex-row justify-between gap-2 w-full pt-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Schedule = ({
    user = null,
    onOpenLogin,
    onOpenProfile,
    onEnroll,
    isEnrolled = false,
    weeklySchedules = [],
    timeSlots = [],
    sessionTypes = [],
    selectedWeeklyScheduleId = null,
    selectedTimeSlotId = null,
    selectedSessionTypeId = null,
    loadingWeeklySchedules = false,
    loadingTimeSlots = false,
    loadingSessionTypes = false,
    enrollLoading = false,
    enrollError = "",
    basePrice = 0,
    enrollment,
    onSelectWeeklySchedule,
    onSelectTimeSlot,
    onSelectSessionType,
}) => {
    const selectedSessionType = sessionTypes.find((sessionType) => sessionType.id === selectedSessionTypeId);
    const modifier = Number(selectedSessionType?.priceModifier || enrollment?.schedule?.sessionType?.priceModifier || 0);
    const totalPrice = Number(enrollment?.totalPrice || (Number(basePrice || 0) + modifier));
    const warningVariant = !user ? "auth" : !user.profileComplete ? "complete" : null;

    return (
        <>
            {!isEnrolled && (
                <div className="flex flex-col gap-6 w-max">
                    <Title stage={1} title="Weekly Schedule" disabled={false} defaultOpen={true}>
                        {weeklySchedules.map((schedule) => (
                            <WeekDays
                                key={schedule.id}
                                days={schedule.days || schedule.label}
                                selected={selectedWeeklyScheduleId === schedule.id}
                                onClick={() => onSelectWeeklySchedule?.(schedule.id)}
                            />
                        ))}
                        {!loadingWeeklySchedules && weeklySchedules.length === 0 && (
                            <div className="flex items-center justify-center w-full h-full">
                                <span className="type-body-xs text-greyscale-400">No weekly schedules</span>
                            </div>
                        )}
                    </Title>

                    <Title stage={2} title="Time Slot" disabled={!selectedWeeklyScheduleId} defaultOpen={true}>
                        {timeSlots.map((timeSlot) => (
                            <TimeSlot
                                key={timeSlot.id}
                                label={timeSlot.label}
                                time={formatTimeRange(timeSlot.startTime, timeSlot.endTime)}
                                selected={selectedTimeSlotId === timeSlot.id}
                                onClick={() => onSelectTimeSlot?.(timeSlot.id)}
                            />
                        ))}
                        {!loadingTimeSlots && selectedWeeklyScheduleId && timeSlots.length === 0 && (
                            <div className="flex items-center justify-center w-full h-full">
                                <span className="type-body-xs text-greyscale-400">No time slots</span>
                            </div>
                        )}
                    </Title>

                    <Title stage={3} title="Session Type" disabled={!selectedTimeSlotId} defaultOpen={true}>
                        {sessionTypes.map((sessionType) => (
                            <Session
                                key={sessionType.id}
                                type={normalizeSessionType(sessionType.name)}
                                address={sessionType.location}
                                priceOffset={Number(sessionType.priceModifier || 0)}
                                seatsLeft={Number(sessionType.availableSeats || 0)}
                                selected={selectedSessionTypeId === sessionType.id}
                                onClick={() => onSelectSessionType?.(sessionType.id)}
                            />
                        ))}
                        {!loadingSessionTypes && selectedTimeSlotId && sessionTypes.length === 0 && (
                            <div className="flex items-center justify-center w-full h-full">
                                <span className="type-body-xs text-greyscale-400">No session types</span>
                            </div>
                        )}
                    </Title>
                </div>
            )}

            <div className="flex flex-col w-full h-fit bg-greyscale-50 border border-greyscale-100 rounded-xl p-10 gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-row justify-between items-center">
                        <h4 className="type-heading-4 text-greyscale-400">Total Price</h4>
                        <h2 className="type-heading-2 text-greyscale-800">{formatMoney(totalPrice)}</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <h4 className="type-body-s text-greyscale-400">Base Price</h4>
                            <h2 className="type-body-s text-greyscale-800">{formatMoney(basePrice)}</h2>
                        </div>

                        <div className="flex flex-row justify-between items-center">
                            <h4 className="type-body-s text-greyscale-400">Session Type</h4>
                            <h2 className="type-body-s text-greyscale-800">{modifier > 0 ? `+ ${formatMoney(modifier)}` : "Included"}</h2>
                        </div>
                    </div>
                </div>

                {!isEnrolled && (
                    <button
                        disabled={enrollLoading}
                        onClick={onEnroll}
                        className="w-full h-15.75 bg-purple-50 text-purple-200 rounded-xl p-2.5 gap-2.5 text-center hover:bg-purple-500 hover:text-greyscale-50 hover:cursor-pointer active:bg-purple-600 active:text-greyscale-50 transition-colors duration-300 flex items-center justify-center disabled:bg-greyscale-300 disabled:text-greyscale-400 disabled:cursor-not-allowed"
                    >
                        <h4 className="type-heading-4">{enrollLoading ? "Enrolling..." : "Enroll Now"}</h4>
                    </button>
                )}

                {!!enrollError && (
                    <p className="type-body-xs text-helper-error">{enrollError}</p>
                )}
            </div>
            {!isEnrolled && warningVariant && (
                <Warning
                    variant={warningVariant}
                    onOpenLogin={onOpenLogin}
                    onOpenProfile={onOpenProfile}
                />
            )}
        </>
    );
};

export default Schedule;