import HeroSlider from '../components/HeroSlider'
import EnrolledCard from '../components/cards/EnrolledCard'
import DashboardCard from '../components/cards/DashboardCard'

const Homepage = () => {
    return (
        <div className="flex flex-col gap-16 items-center bg-greyscale-100">

            <HeroSlider />

            {/* Continue Learning */}
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
                    <DashboardCard />
                    <DashboardCard />
                    <DashboardCard />
                </div>

            </div>
            {/* =========================================== */}

        </div>
    )
}

export default Homepage