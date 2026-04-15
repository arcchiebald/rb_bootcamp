import { useState, useEffect } from 'react'
import api from '../services/api'
import HeroSlider from '../components/HeroSlider'
import EnrolledCard, { ProgressCard } from '../components/cards/ProgressCard'
import DashboardCard from '../components/cards/DashboardCard'
import EnrollmentCard from '../components/cards/EnrollmentCard'
import BlockedLectureCards from '../components/cards/BlockedLectureCards'
import RegistrationModal from '../components/modals/RegistrationModal'
const Homepage = ({ user }) => {
    const [featuredCourses, setFeaturedCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                // The api base URL already has '/api', so we likely just need '/courses/featured'
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

            {user && user.courses && (
                <div className='flex flex-col gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0'>

                    <div className='flex flex-col gap-1.5'>
                        <h1 className='type-heading-1 text-greyscale-950'>Continue Learning</h1>
                        <div className='flex justify-between items-center w-full'>
                            <p className='type-body-m text-greyscale-700'>Pick up where you left</p>
                            <a href='#' className='type-underlined-m text-purple-500 hover:text-purple-700 transition-colors duration-200'>See All</a>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between flex-wrap gap-6'>
                        <EnrolledCard />
                        <EnrolledCard />
                        <EnrolledCard />
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
                            <a href='#' className='type-underlined-m text-purple-500 hover:text-purple-700 transition-colors duration-200'>See All</a>
                        </div>
                    </div>
                    <BlockedLectureCards />

                </div>
            )}

        </div>
    )
}

export default Homepage