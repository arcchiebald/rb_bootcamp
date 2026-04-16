import Breadcrumbs from "../components/Breadcrumbs"
import DashboardImage from '../assets/dashboardcard_img.jpg'
import ChipCategory from "../components/chips/ChipCategory";
import ChipInstructor from "../components/chips/ChipInstructor";
import Schedule from "../components/schedules/Schedule";


const PlaceholderImage = () => (
    <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-400">
        [ Image Placeholder ]
    </div>
);

const CoursePage = ({ image = DashboardImage, title }) => {
    return (
        <div className="flex flex-col gap-6 bg-greyscale-100">
            <div className="flex flex-col gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0">
                <div className="">
                    <Breadcrumbs pages={{ pages: ['Home', 'Browse', 'Course'], hrefs: ['/', '/browse', '/course'], currentPage: 'Course' }} />
                </div>
                <h1 className='type-heading-1 text-greyscale-900'>Advanced React & TypeScript Development</h1>
            </div>

            <div className="flex flex-row gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0">

                <div className='flex flex-row justify-between gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0 items-stretch'>

                    {/* LEFT PART */}
                    <div className="flex flex-col gap-6 w-225.75">

                        {/* Photo container */}
                        <div className="flex flex-col w-full gap-4.5">
                            <div className="w-full h-118.5">
                                {image ? <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" /> : <PlaceholderImage />}
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
                                            <span className="type-body-xs text-greyscale-600">{'12'} Weeks</span>
                                        </div>

                                        {/* Hours */}
                                        <div className="flex flex-row gap-1 items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.5 12H12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span className="type-body-xs text-greyscale-600">{'128'} Hours</span>
                                        </div>

                                    </div>

                                    {/* Rating */}
                                    <div className="flex flex-row gap-1 items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.4807 7.17501C15.6224 7.47691 15.9052 7.68831 16.2349 7.73867L22.0755 8.63081C22.8801 8.75372 23.2087 9.73512 22.6402 10.3177L18.3519 14.7128C18.1302 14.94 18.0296 15.259 18.0807 15.5722L19.0847 21.7252C19.2192 22.5491 18.3446 23.1653 17.614 22.7615L12.4832 19.9255C12.1821 19.7591 11.8167 19.7591 11.5156 19.9255L6.38556 22.7614C5.65501 23.1653 4.78045 22.5492 4.91479 21.7253L5.91817 15.5722C5.96925 15.2589 5.8686 14.9401 5.64696 14.7129L1.35856 10.3177C0.790129 9.73512 1.11869 8.75372 1.92331 8.63081L7.76386 7.73867C8.09354 7.68831 8.37642 7.47691 8.51812 7.17501L11.0941 1.68645C11.4541 0.91962 12.5447 0.91962 12.9046 1.68645L15.4807 7.17501Z" fill="#F4A316" />
                                        </svg>
                                        <span className="type-body-s text-greyscale-600">{'4.9'}</span>
                                    </div>
                                </div>

                                <ChipCategory name="Development" icon="development" />

                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-4.5">

                                <ChipInstructor name="Sarah Johnson" photo={DashboardImage} />

                                <h4 className="type-heading-4 text-greyscale-400">Course Description</h4>
                                <p className="type-body-s text-greyscale-600">
                                    This course focuses on building scalable, production-level front-end applications using React and TypeScript. It covers advanced component architecture, strong typing strategies, state management patterns, and performance optimization techniques used in modern web products.
                                </p>

                            </div>
                        </div>
                    </div>



                    {/* RIGHT PART */}
                    <div className="flex flex-col gap-6 items-center">
                        <Schedule />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CoursePage