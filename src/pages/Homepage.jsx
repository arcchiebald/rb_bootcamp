import { useState, useEffect, useRef } from 'react'
import api from '../services/api'
import HeroSlider from '../components/HeroSlider'
import EnrolledCard, { ProgressCard } from '../components/cards/ProgressCard'
import DashboardCard from '../components/cards/DashboardCard'
import EnrollmentCard from '../components/cards/EnrollmentCard'
import BlockedLectureCards from '../components/cards/BlockedLectureCards'
import RegistrationModal from '../components/modals/RegistrationModal'
import { useOutletContext } from 'react-router-dom'
const Homepage = ({ user }) => {
    const { openSidebar } = useOutletContext()
    const [featuredCourses, setFeaturedCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [isLoadingEnrollments, setIsLoadingEnrollments] = useState(true)
    const scrollContainerRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState({ isAtStart: true, isAtEnd: true })

    const updateScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setScrollPosition({
                isAtStart: scrollLeft <= 0,
                isAtEnd: scrollLeft + clientWidth >= scrollWidth - 1
            })
        }
    }

    useEffect(() => {
        updateScrollPosition()
        window.addEventListener('resize', updateScrollPosition)
        return () => window.removeEventListener('resize', updateScrollPosition)
    }, [enrolledCourses, isLoadingEnrollments])

    useEffect(() => {
        if (user) {
            const fetchEnrollments = async () => {
                setIsLoadingEnrollments(true)
                try {
                    const response = await api.get('/enrollments')
                    setEnrolledCourses(response.data.data)
                } catch (error) {
                    console.error("Failed to fetch enrollments:", error)
                } finally {
                    setIsLoadingEnrollments(false)
                }
            }
            fetchEnrollments()
        } else {
            setEnrolledCourses([])
            setIsLoadingEnrollments(false)
        }
    }, [user])

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                const response = await api.get('/courses/featured')
                setFeaturedCourses(response.data.data || [])
            } catch (error) {
                console.error("Failed to fetch featured courses:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchFeaturedCourses()
    }, [])

    return (
        <div className="flex flex-col gap-16 items-center bg-greyscale-100">

            <HeroSlider />

            {user && (
                <div className='flex flex-col gap-8 w-full overflow-x-hidden'>

                    <div className='flex flex-col gap-1.5 w-full max-w-391.5 mx-auto px-4 2xl:px-0'>
                        <h1 className='type-heading-1 text-greyscale-950'>Your Enrollments</h1>
                        <div className='flex justify-between items-center w-full'>
                            <p className='type-body-m text-greyscale-700'>Track your current progress</p>
                            
                            <button onClick={openSidebar} className='type-underlined-m text-purple-500 hover:text-purple-700 transition-colors duration-200 cursor-pointer'>See All</button>
                        </div>
                    </div>
                    
                    <div className="relative w-full max-w-391.5 mx-auto pl-4 2xl:pl-0">
                        <div 
                            ref={scrollContainerRef}
                            onScroll={updateScrollPosition}
                            className='flex flex-row overflow-x-auto overflow-y-hidden flex-nowrap gap-6 pb-4 snap-x hidden-scrollbar pr-[120px]'
                            style={{ 
                                width: 'calc(100% + 120px)',
                                maskImage: (isLoadingEnrollments || enrolledCourses.length > 3) 
                                    ? (!scrollPosition.isAtStart && !scrollPosition.isAtEnd 
                                        ? 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' 
                                        : !scrollPosition.isAtStart 
                                            ? 'linear-gradient(to right, transparent 0%, black 10%, black 100%)' 
                                            : !scrollPosition.isAtEnd 
                                                ? 'linear-gradient(to right, black 90%, transparent 100%)' 
                                                : 'none') 
                                    : 'none',
                                WebkitMaskImage: (isLoadingEnrollments || enrolledCourses.length > 3) 
                                    ? (!scrollPosition.isAtStart && !scrollPosition.isAtEnd 
                                        ? 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' 
                                        : !scrollPosition.isAtStart 
                                            ? 'linear-gradient(to right, transparent 0%, black 10%, black 100%)' 
                                            : !scrollPosition.isAtEnd 
                                                ? 'linear-gradient(to right, black 90%, transparent 100%)' 
                                                : 'none') 
                                    : 'none'
                            }}
                        >
                            {isLoadingEnrollments ? (
                                 <>
                                    <div className='pointer-events-none animate-pulse shrink-0 snap-start'><ProgressCard blurred /></div>
                                    <div className='pointer-events-none animate-pulse delay-75 shrink-0 snap-start'><ProgressCard blurred /></div>
                                    <div className='pointer-events-none animate-pulse delay-150 shrink-0 snap-start'><ProgressCard blurred /></div>
                                 </>
                            ) : enrolledCourses.length > 0 ? (
                                enrolledCourses.map(enrollment => (
                                    <div key={enrollment.id} className="shrink-0 snap-start">
                                        <ProgressCard
                                            title={enrollment.course.title}
                                            instructor={enrollment.course.instructor.name}
                                            rating={enrollment.course.avgRating}
                                            image={enrollment.course.image}
                                            progressPercent={enrollment.progress}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="type-body-m text-greyscale-600">You are not enrolled in any courses yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            )}

            {/* =========================================== */}

            {/* Start Learning Today */}
            <div className='flex flex-col gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0'>

                <div className='flex flex-col gap-1.5'>
                    <h1 className='type-heading-1 text-greyscale-950'>Start Learning Today</h1>
                    <div className='flex justify-between items-center w-full'>
                        <p className='type-body-m text-greyscale-700'>Choose from our most popular courses and begin your journey</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between flex-wrap gap-6'>
                    {isLoading ? (
                        <>
                            <div className='blur-[2px] opacity-60 pointer-events-none animate-pulse'><DashboardCard id={1} /></div>
                            <div className='blur-[2px] opacity-60 pointer-events-none animate-pulse delay-75'><DashboardCard id={2} /></div>
                            <div className='blur-[2px] opacity-60 pointer-events-none animate-pulse delay-150'><DashboardCard id={3} /></div>
                        </>
                    ) : featuredCourses.length > 0 ? (
                        featuredCourses.map(course => (
                            <DashboardCard
                                key={course.id}
                                id={course.id}
                                image={course.image}
                                title={course.title}
                                description={course.description}
                                instructor={course.instructor?.name}
                                price={`$${course.basePrice}`}
                                rating={course.avgRating}
                            />
                        ))
                    ) : (
                        <>
                            <DashboardCard id={1} />
                            <DashboardCard id={2} />
                            <DashboardCard id={3} />
                        </>
                    )}
                </div>

            </div>
            {/* =========================================== */}

            {!user && (
                <div className='flex flex-col gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0'>

                    <div className='flex flex-col gap-1.5'>
                        <h1 className='type-heading-1 text-greyscale-950'>Continue Learning</h1>
                        <div className='flex justify-between items-center w-full'>
                            <p className='type-body-m text-greyscale-700'>Pick up where you left</p>
                            <p  className='type-underlined-m text-purple-500 hover:text-purple-700 transition-colors duration-200 cursor-pointer'>See All</p>
                        </div>
                    </div>
                    <BlockedLectureCards />

                </div>
            )}

        </div>
    )
}

export default Homepage