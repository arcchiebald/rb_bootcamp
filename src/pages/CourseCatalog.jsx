import Breadcrumbs from "../components/Breadcrumbs"
import ChipCategory from "../components/chips/ChipCategory"
import ChipInstructor from "../components/chips/ChipInstructor"
import ChipTopic from "../components/chips/ChipTopic"
import { useState, useEffect } from 'react'
import api from '../services/api'
import ListingCard from "../components/cards/ListingCard"
import SortingDropdown from "../components/listings/SortingDropdown"
import Pagination from "../components/listings/Pagination"

const CourseCatalog = () => {
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [instructors, setInstructors] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);

    const [courses, setCourses] = useState([]);
    const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, perPage: 0, total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('newest');

    useEffect(() => {
        api.get('/categories')
            .then(res => setCategories(res.data.data || []));

        api.get('/instructors')
            .then(res => setInstructors(res.data.data || []));
    }, []);

    useEffect(() => {
        // Fetch topics globally or filtered by selected categories
        const params = new URLSearchParams();
        selectedCategories.forEach(id => params.append('categories[]', id));

        api.get('/topics', { params })
            .then(res => {
                const fetchedTopics = res.data.data || [];
                setTopics(fetchedTopics);
                // Ensure selected topics are still in the valid list
                const validTopicIds = fetchedTopics.map(t => t.id);
                setSelectedTopics(prev => prev.filter(tId => validTopicIds.includes(tId)));
            });
    }, [selectedCategories]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(true);
        const params = new URLSearchParams();
        
        selectedCategories.forEach(id => params.append('categories[]', id));
        selectedTopics.forEach(id => params.append('topics[]', id));
        selectedInstructors.forEach(id => params.append('instructors[]', id));
        
        if (sort) params.append('sort', sort);
        params.append('page', page);

        api.get('/courses', { params })
            .then(res => {
                setCourses(res.data.data || []);
                setMeta(res.data.meta || { currentPage: 1, lastPage: 1, perPage: 0, total: 0 });
            })
            .catch(err => {
                console.error('Error fetching courses:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedCategories, selectedTopics, selectedInstructors, sort, page]);

    const toggleCategory = (id) => {
        setPage(1);
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const toggleTopic = (id) => {
        setPage(1);
        setSelectedTopics(prev =>
            prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
        );
    };

    const toggleInstructor = (id) => {
        setPage(1);
        setSelectedInstructors(prev =>
            prev.includes(id) ? prev.filter(iId => iId !== id) : [...prev, id]
        );
    };

    const clearAllFilters = () => {
        setPage(1);
        setSort('newest');
        setSelectedCategories([]);
        setSelectedTopics([]);
        setSelectedInstructors([]);
    };

    const activeFiltersCount = selectedCategories.length + selectedTopics.length + selectedInstructors.length;

    return (
        <div className="flex flex-col gap-6 bg-greyscale-100">
            <div className="flex flex-row gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0">
                <Breadcrumbs pages={{ pages: ['Home', 'Browse'], hrefs: ['/', '/courses'], currentPage: 'Browse' }} />
            </div>
            <div className='flex flex-row justify-between gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0 items-stretch'>

                {/* LEFT PART */}
                <div className="flex flex-col gap-6 w-77.25">

                    {/* Filters Text */}
                    <div className="flex justify-between">
                        <h1 className="type-heading-1 text-greyscale-950">Filters</h1>
                        <button onClick={clearAllFilters} className="flex flex-row gap-1.75 items-center cursor-pointer group">
                            <span className="type-buttons-s text-greyscale-400 group-hover:text-purple-500 transition-colors duration-300">Clear All Filters</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" className='stroke-greyscale-400 group-hover:stroke-purple-500 transition-colors duration-300' xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.75 5.75L0.75 0.75M5.75 5.75L10.75 10.75M5.75 5.75L10.75 0.75M5.75 5.75L0.75 10.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-6">
                        <span className="type-body-m text-greyscale-500">Categories</span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <ChipCategory
                                    key={cat.id}
                                    name={cat.name}
                                    icon={cat.icon}
                                    active={selectedCategories.includes(cat.id)}
                                    onClick={() => toggleCategory(cat.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-col gap-6">
                        <span className="type-body-m text-greyscale-500">Topics</span>
                        <div className="flex flex-wrap gap-2">
                            {topics.map(topic => (
                                <ChipTopic
                                    key={topic.id}
                                    name={topic.name}
                                    active={selectedTopics.includes(topic.id)}
                                    onClick={() => toggleTopic(topic.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Instructors */}
                    <div className="flex flex-col gap-6">
                        <span className="type-body-m text-greyscale-500">Instructor</span>
                        <div className="flex flex-wrap gap-2">
                            {instructors.map(inst => (
                                <ChipInstructor
                                    key={inst.id}
                                    photo={inst.avatar}
                                    name={inst.name}
                                    active={selectedInstructors.includes(inst.id)}
                                    onClick={() => toggleInstructor(inst.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col border-t border-greyscale-300 pt-4">
                        <span className="type-body-xs text-greyscale-400">{activeFiltersCount} Filters Active</span>
                    </div>

                </div>
                {/* LEFT PART END */}

                {/* RIGHT PART START */}

                <div className="relative w-291.75">
                    <div className="absolute flex flex-col w-full h-[calc(100%+80px)]">
                        
                        <div className="flex flex-row items-center justify-between shrink-0 pb-8">
                            <span className="type-body-s text-greyscale-500">Showing {courses.length} out of {meta.total || 0}</span>
                            <SortingDropdown sort={sort} onSortChange={(newSort) => { setSort(newSort); setPage(1); }} />
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 pb-4 scroll-smooth min-h-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isLoading ? (
                            // Empty placeholders to map your eventual course cards into
                            Array(12).fill(0).map((_, i) => (
                                <div 
                                    key={`loading-${i}`} 
                                    className={`pointer-events-none animate-pulse shrink-0 snap-start ${
                                        i % 3 === 0 ? '' : i % 3 === 1 ? 'delay-75' : 'delay-150'
                                    }`}
                                >
                                    <ListingCard blurred />
                                </div>
                            ))
                        ) : courses.length > 0 ? (
                            courses.map((course) => (
                                <ListingCard 
                                    key={course.id}
                                    id={course.id}
                                    image={course.image}
                                    instructor={course.instructor?.name || "Unknown"}
                                    duration={`${course.durationWeeks} Weeks`}
                                    rating={course.avgRating}
                                    title={course.title}
                                    icon={course.category?.icon || "development"}
                                    category={course.category?.name || "Category"}
                                    price={`$${course.basePrice}`}
                                />
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-24 type-body-m text-greyscale-500">
                                No courses found for the applied filters.
                            </div>
                        )}
                        </div>
                    </div>

                    {/* PAGINATION - fixed at bottom of the columns height */}
                    <div className="shrink-0 pt-6 flex justify-center bg-greyscale-100 z-10 w-full mt-auto">
                        <Pagination 
                            currentPage={meta.currentPage || 1} 
                            totalPages={meta.lastPage || 1} 
                            onPageChange={(page) => setPage(page)} 
                        />
                    </div>
                </div>
                </div>

            </div>
        </div>
    )
}

export default CourseCatalog