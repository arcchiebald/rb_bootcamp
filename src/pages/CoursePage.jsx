import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs"
import ChipCategory from "../components/chips/ChipCategory";
import ChipInstructor from "../components/chips/ChipInstructor";
import Schedule from "../components/schedules/Schedule";
import { coursesApi } from "../services/api";
import EnrollmentModal from "../components/modals/EnrollmentModal";
import ProgressEnrolled from "../components/schedules/ProgressEnrolled";
import DummyImage from "../assets/dashboardcard_img.jpg";


const PlaceholderImage = () => (
    <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-400">
        [ Image Placeholder ]
    </div>
);

const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
};

const averageRating = (reviews = []) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return 0;
    }

    const total = reviews.reduce((sum, review) => sum + toNumber(review.rating), 0);
    return total / reviews.length;
};

const CoursePage = ({ user }) => {
    const { id } = useParams();
    const { openLogin, openProfile } = useOutletContext();

    const [course, setCourse] = useState(null);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const [courseError, setCourseError] = useState("");

    const [weeklySchedules, setWeeklySchedules] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [sessionTypes, setSessionTypes] = useState([]);

    const [selectedWeeklyScheduleId, setSelectedWeeklyScheduleId] = useState(null);
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
    const [selectedSessionTypeId, setSelectedSessionTypeId] = useState(null);

    const [loadingWeeklySchedules, setLoadingWeeklySchedules] = useState(false);
    const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
    const [loadingSessionTypes, setLoadingSessionTypes] = useState(false);

    const [enrollLoading, setEnrollLoading] = useState(false);
    const [enrollError, setEnrollError] = useState("");
    const [modalState, setModalState] = useState({
        isOpen: false,
        variant: "confirm",
        text: "",
        courseName: "",
        conflictSchedule: "",
        onPrimaryAction: null,
        onSecondaryAction: null,
    });

    useEffect(() => {
        let ignore = false;

        const fetchCourse = async () => {
            setLoadingCourse(true);
            setCourseError("");

            try {
                const response = await coursesApi.getCourseById(id);
                if (!ignore) {
                    setCourse(response.data?.data || null);
                }
            } catch (error) {
                if (!ignore) {
                    setCourse(null);
                    setCourseError(error.response?.data?.message || "Failed to fetch course.");
                }
            } finally {
                if (!ignore) {
                    setLoadingCourse(false);
                }
            }
        };

        fetchCourse();

        return () => {
            ignore = true;
        };
    }, [id]);

    useEffect(() => {
        let ignore = false;

        const fetchWeeklySchedules = async () => {
            if (!course || course.enrollment) {
                return;
            }

            setLoadingWeeklySchedules(true);

            try {
                const response = await coursesApi.getWeeklySchedules(id);
                if (!ignore) {
                    setWeeklySchedules(response.data?.data || []);
                }
            } catch {
                if (!ignore) {
                    setWeeklySchedules([]);
                }
            } finally {
                if (!ignore) {
                    setLoadingWeeklySchedules(false);
                }
            }
        };

        setWeeklySchedules([]);
        setTimeSlots([]);
        setSessionTypes([]);
        setSelectedWeeklyScheduleId(null);
        setSelectedTimeSlotId(null);
        setSelectedSessionTypeId(null);

        fetchWeeklySchedules();

        return () => {
            ignore = true;
        };
    }, [course, id]);

    useEffect(() => {
        let ignore = false;

        const fetchTimeSlots = async () => {
            if (!selectedWeeklyScheduleId || !course || course.enrollment) {
                return;
            }

            setLoadingTimeSlots(true);
            setTimeSlots([]);
            setSessionTypes([]);
            setSelectedTimeSlotId(null);
            setSelectedSessionTypeId(null);

            try {
                const response = await coursesApi.getTimeSlots(id, selectedWeeklyScheduleId);
                if (!ignore) {
                    setTimeSlots(response.data?.data || []);
                }
            } catch {
                if (!ignore) {
                    setTimeSlots([]);
                }
            } finally {
                if (!ignore) {
                    setLoadingTimeSlots(false);
                }
            }
        };

        fetchTimeSlots();

        return () => {
            ignore = true;
        };
    }, [course, id, selectedWeeklyScheduleId]);

    useEffect(() => {
        let ignore = false;

        const fetchSessionTypes = async () => {
            if (!selectedWeeklyScheduleId || !selectedTimeSlotId || !course || course.enrollment) {
                return;
            }

            setLoadingSessionTypes(true);
            setSessionTypes([]);
            setSelectedSessionTypeId(null);

            try {
                const response = await coursesApi.getSessionTypes(id, selectedWeeklyScheduleId, selectedTimeSlotId);
                if (!ignore) {
                    setSessionTypes(response.data?.data || []);
                }
            } catch {
                if (!ignore) {
                    setSessionTypes([]);
                }
            } finally {
                if (!ignore) {
                    setLoadingSessionTypes(false);
                }
            }
        };

        fetchSessionTypes();

        return () => {
            ignore = true;
        };
    }, [course, id, selectedWeeklyScheduleId, selectedTimeSlotId]);

    useEffect(() => {
        if (enrollError) {
            setEnrollError("");
        }
    }, [selectedWeeklyScheduleId, selectedTimeSlotId, selectedSessionTypeId, enrollError]);

    const rating = useMemo(() => averageRating(course?.reviews), [course?.reviews]);
    const selectedSessionType = useMemo(
        () => sessionTypes.find((sessionType) => sessionType.id === selectedSessionTypeId),
        [sessionTypes, selectedSessionTypeId]
    );

    const closeEnrollmentModal = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
    };

    const fetchCourse = async () => {
        const response = await coursesApi.getCourseById(id);
        setCourse(response.data?.data || null);
    };

    const showIncompleteProfileModal = () => {
        setModalState({
            isOpen: true,
            variant: "incomplete",
            text: "You need to complete your profile before enrolling in this course.",
            courseName: "",
            conflictSchedule: "",
            onPrimaryAction: closeEnrollmentModal,
            onSecondaryAction: () => {
                closeEnrollmentModal();
                openProfile();
            },
        });
    };

    const runEnrollment = async ({ force = false } = {}) => {
        if (!course) {
            setEnrollError("Course data is not available.");
            return;
        }

        if (!user || !localStorage.getItem("token")) {
            setEnrollError("Please log in to enroll in a course.");
            openLogin();
            return;
        }

        if (!user.profileComplete) {
            setEnrollError("Please complete your profile before enrolling.");
            showIncompleteProfileModal();
            return;
        }

        if (!selectedWeeklyScheduleId || !selectedTimeSlotId || !selectedSessionTypeId) {
            setEnrollError("Please select weekly schedule, time slot, and session type.");
            return;
        }

        const seatsLeft = Number(selectedSessionType?.availableSeats || 0);
        if (seatsLeft <= 0) {
            setEnrollError("Selected session type is fully booked.");
            return;
        }

        const courseScheduleId = selectedSessionType?.courseScheduleId || selectedSessionType?.course_schedule_id;
        if (!courseScheduleId) {
            setEnrollError("Could not determine schedule for enrollment. Please try again.");
            return;
        }

        setEnrollError("");
        setEnrollLoading(true);

        try {
            await coursesApi.enrollInCourse({
                courseId: Number(course.id),
                courseScheduleId: Number(courseScheduleId),
                force,
            });

            await fetchCourse();

            setModalState({
                isOpen: true,
                variant: "confirm",
                text: "",
                courseName: course.title,
                conflictSchedule: "",
                onPrimaryAction: closeEnrollmentModal,
                onSecondaryAction: null,
            });
        } catch (error) {
            if (error.response?.status === 401) {
                setEnrollError("Your session has expired. Please log in again.");
                openLogin();
                return;
            }

            if (error.response?.status === 409) {
                const conflict = error.response?.data?.conflicts?.[0];
                if (conflict) {
                    setModalState({
                        isOpen: true,
                        variant: "conflict",
                        text: "",
                        courseName: conflict.conflictingCourseName || course.title,
                        conflictSchedule: conflict.schedule || "selected days and time",
                        onPrimaryAction: async () => {
                            closeEnrollmentModal();
                            await runEnrollment({ force: true });
                        },
                        onSecondaryAction: closeEnrollmentModal,
                    });
                } else {
                    setEnrollError(error.response?.data?.message || "Enrollment conflict detected.");
                }
                return;
            }

            if (error.response?.status === 422) {
                const firstError = Object.values(error.response?.data?.errors || {})?.[0]?.[0];
                setEnrollError(firstError || error.response?.data?.message || "Please check your selection and try again.");
                return;
            }

            setEnrollError(error.response?.data?.message || "Enrollment failed. Please try again.");
        } finally {
            setEnrollLoading(false);
        }
    };

    const runCompleteCourse = async () => {
        try {
            await coursesApi.completeCourse(course.enrollment.id);
            await fetchCourse();
            setModalState({
                isOpen: true,
                variant: "congratulations",
                text: `Course Completed!`,
                courseName: `${course?.title}`,
                conflictSchedule: "",
                onPrimaryAction: closeEnrollmentModal,
                onSecondaryAction: null,
            });
        } catch (error) {
            console.error("Failed to complete course", error);
        }
    };

    const runRateCourse = async (ratingVal) => {
        try {
            await coursesApi.rateCourse(id, ratingVal);
            await fetchCourse();
        } catch (error) {
            console.error("Failed to rate course", error);
        }
    };

    const runRetakeCourse = async () => {
        try {
            await coursesApi.deleteEnrollment(course.enrollment.id);
            await fetchCourse();
        } catch (error) {
            console.error("Failed to delete enrollment", error);
        }
    };

    if (loadingCourse) {
        return (
            <div className="flex flex-col gap-6 bg-greyscale-100 pointer-events-none select-none blur-xs opacity-70 transition-all duration-300 pb-20">
                <div className="flex flex-col gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0 pt-6">
                    <div className="">
                        <Breadcrumbs pages={{ pages: ['Home', 'Browse', 'Loading...'], hrefs: ['/', '/courses', '#'], currentPage: 'Loading...' }} />
                    </div>
                    <h1 className='type-heading-1 text-greyscale-900'>Loading Course...</h1>
                </div>

                <div className="flex flex-row gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0">
                    <div className='flex flex-row justify-between gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0 items-stretch'>

                        {/* LEFT PART */}
                        <div className="flex flex-col gap-6 w-225.75">
                            <div className="flex flex-col w-full gap-4.5">
                                <div className="w-full h-118.5">
                                    <img src={DummyImage} alt="Loading" className="w-full h-full object-cover rounded-lg" />
                                </div>

                                <div className="w-full flex flex-row gap-4.5">
                                    <div className="flex w-full flex-row gap-3 justify-between">
                                        <div className="flex flex-row gap-3">
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 4H17V2H15V4H9V2H7V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM5 20V8H19V6V20H5Z" fill="#525252" />
                                                </svg>
                                                <span className="type-body-xs text-greyscale-600">0 Weeks</span>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.5 12H12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span className="type-body-xs text-greyscale-600">0 Hours</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-1 items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.4807 7.17501C15.6224 7.47691 15.9052 7.68831 16.2349 7.73867L22.0755 8.63081C22.8801 8.75372 23.2087 9.73512 22.6402 10.3177L18.3519 14.7128C18.1302 14.94 18.0296 15.259 18.0807 15.5722L19.0847 21.7252C19.2192 22.5491 18.3446 23.1653 17.614 22.7615L12.4832 19.9255C12.1821 19.7591 11.8167 19.7591 11.5156 19.9255L6.38556 22.7614C5.65501 23.1653 4.78045 22.5492 4.91479 21.7253L5.91817 15.5722C5.96925 15.2589 5.8686 14.9401 5.64696 14.7129L1.35856 10.3177C0.790129 9.73512 1.11869 8.75372 1.92331 8.63081L7.76386 7.73867C8.09354 7.68831 8.37642 7.47691 8.51812 7.17501L11.0941 1.68645C11.4541 0.91962 12.5447 0.91962 12.9046 1.68645L15.4807 7.17501Z" fill="#F4A316" />
                                            </svg>
                                            <span className="type-body-s text-greyscale-600">0.0</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <ChipCategory name="Loading..." />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4.5">
                                    <ChipInstructor name="Loading Instructor..." />
                                    <h4 className="type-heading-4 text-greyscale-400">Course Description</h4>
                                    <p className="type-body-s text-greyscale-600">
                                        Loading course description...
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT PART */}
                        <div className="flex flex-col gap-6 items-center">
                            <Schedule
                                user={user}
                                onOpenLogin={openLogin}
                                onOpenProfile={openProfile}
                                onEnroll={() => {}}
                                isEnrolled={false}
                                enrollment={null}
                                weeklySchedules={[]}
                                timeSlots={[]}
                                sessionTypes={[]}
                                selectedWeeklyScheduleId={null}
                                selectedTimeSlotId={null}
                                selectedSessionTypeId={null}
                                loadingWeeklySchedules={false}
                                loadingTimeSlots={false}
                                loadingSessionTypes={false}
                                enrollLoading={false}
                                enrollError={""}
                                basePrice={0}
                                onSelectWeeklySchedule={() => {}}
                                onSelectTimeSlot={() => {}}
                                onSelectSessionType={() => {}}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return <div className="w-full py-20 text-center type-body-m text-helper-warning">{courseError || "Course not found."}</div>;
    }

    const isEnrolled = !!course.enrollment;

    return (
        <div className="flex flex-col gap-6 bg-greyscale-100">
            <div className="flex flex-col gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0">
                <div className="">
                    <Breadcrumbs pages={{ pages: ['Home', 'Browse', course.title], hrefs: ['/', '/courses', `/courses/${course.id}`], currentPage: course.title }} />
                </div>
                <h1 className='type-heading-1 text-greyscale-900'>{course.title}</h1>
            </div>

            <div className="flex flex-row gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0">

                <div className='flex flex-row justify-between gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0 items-stretch'>

                    {/* LEFT PART */}
                    <div className="flex flex-col gap-6 w-225.75">

                        {/* Photo container */}
                        <div className="flex flex-col w-full gap-4.5">
                            <div className="w-full h-118.5">
                                {course.image ? <img src={course.image} alt={course.title} className="w-full h-full object-cover rounded-lg" /> : <PlaceholderImage />}
                            </div>

                            <div className="w-full flex flex-row gap-4.5">

                                <div className="flex w-full flex-row gap-3 justify-between">

                                    {/* Weeks and Hours */}
                                    <div className="flex flex-row gap-3">

                                        {/* Weeks */}
                                        <div className="flex flex-row gap-1 items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 4H17V2H15V4H9V2H7V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM5 20V8H19V6V20H5Z" fill="#525252" />
                                            </svg>
                                            <span className="type-body-xs text-greyscale-600">{course.durationWeeks} Weeks</span>
                                        </div>

                                        {/* Hours */}
                                        <div className="flex flex-row gap-1 items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.5 12H12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span className="type-body-xs text-greyscale-600">{course.hours} Hours</span>
                                        </div>

                                    </div>

                                    {/* Rating */}
                                    <div className="flex flex-row gap-1 items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.4807 7.17501C15.6224 7.47691 15.9052 7.68831 16.2349 7.73867L22.0755 8.63081C22.8801 8.75372 23.2087 9.73512 22.6402 10.3177L18.3519 14.7128C18.1302 14.94 18.0296 15.259 18.0807 15.5722L19.0847 21.7252C19.2192 22.5491 18.3446 23.1653 17.614 22.7615L12.4832 19.9255C12.1821 19.7591 11.8167 19.7591 11.5156 19.9255L6.38556 22.7614C5.65501 23.1653 4.78045 22.5492 4.91479 21.7253L5.91817 15.5722C5.96925 15.2589 5.8686 14.9401 5.64696 14.7129L1.35856 10.3177C0.790129 9.73512 1.11869 8.75372 1.92331 8.63081L7.76386 7.73867C8.09354 7.68831 8.37642 7.47691 8.51812 7.17501L11.0941 1.68645C11.4541 0.91962 12.5447 0.91962 12.9046 1.68645L15.4807 7.17501Z" fill="#F4A316" />
                                        </svg>
                                        <span className="type-body-s text-greyscale-600">{rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3">
                                    <ChipCategory name={course.category?.name} icon={course.category?.icon} />
                                </div>

                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-4.5">

                                <ChipInstructor name={course.instructor?.name} photo={course.instructor?.avatar} />

                                <h4 className="type-heading-4 text-greyscale-400">Course Description</h4>
                                <p className="type-body-s text-greyscale-600">
                                    {course.description}
                                </p>

                            </div>
                        </div>
                    </div>



                    {/* RIGHT PART */}
                    {course.enrollment ? (
                        <div className="mr-10">
                            <ProgressEnrolled 
                                weeklySchedule={course.enrollment.schedule?.weeklySchedule?.label}
                                timeSlot={course.enrollment.schedule?.timeSlot?.label}
                                sessionType={course.enrollment.schedule?.sessionType?.name}
                                location={course.enrollment.schedule?.location || "Tbilisi, Chavchavadze St.30"}
                                progressPercent={course.enrollment.progress}
                                onComplete={runCompleteCourse}
                                onRetake={runRetakeCourse}
                                isRated={course.isRated}
                                userRating={course.isRated ? (course.reviews?.find(r => r.userId === user?.id)?.rating || 0) : 0}
                                onRateCourse={runRateCourse}
                            />
                        </div>) : (
                        <div className="flex flex-col gap-6 items-center">
                            <Schedule
                                user={user}
                                onOpenLogin={openLogin}
                                onOpenProfile={openProfile}
                                onEnroll={() => runEnrollment({ force: false })}
                                isEnrolled={isEnrolled}
                                enrollment={course.enrollment}
                                weeklySchedules={weeklySchedules}
                                timeSlots={timeSlots}
                                sessionTypes={sessionTypes}
                                selectedWeeklyScheduleId={selectedWeeklyScheduleId}
                                selectedTimeSlotId={selectedTimeSlotId}
                                selectedSessionTypeId={selectedSessionTypeId}
                                loadingWeeklySchedules={loadingWeeklySchedules}
                                loadingTimeSlots={loadingTimeSlots}
                                loadingSessionTypes={loadingSessionTypes}
                                enrollLoading={enrollLoading}
                                enrollError={enrollError}
                                basePrice={toNumber(course.basePrice)}
                                onSelectWeeklySchedule={(weeklyScheduleId) => setSelectedWeeklyScheduleId(weeklyScheduleId)}
                                onSelectTimeSlot={(timeSlotId) => setSelectedTimeSlotId(timeSlotId)}
                                onSelectSessionType={(sessionTypeId) => setSelectedSessionTypeId(sessionTypeId)}
                            />
                        </div>
                    )}

                </div>
            </div>

            <EnrollmentModal
                isOpen={modalState.isOpen}
                onClose={closeEnrollmentModal}
                variant={modalState.variant}
                text={modalState.text}
                courseName={modalState.courseName}
                conflictSchedule={modalState.conflictSchedule}
                onPrimaryAction={modalState.onPrimaryAction || closeEnrollmentModal}
                onSecondaryAction={modalState.onSecondaryAction || closeEnrollmentModal}
                isRated={course?.isRated}
                initialRating={course?.isRated ? (course.reviews?.find(r => r.userId === user?.id)?.rating || 0) : 0}
                onRate={runRateCourse}
            />
        </div>
    )
}

export default CoursePage