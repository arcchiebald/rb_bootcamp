import Breadcrumbs from "../components/Breadcrumbs"
import ChipCategory from "../components/chips/ChipCategory"
import ChipInstructor from "../components/chips/ChipInstructor"
import ChipTopic from "../components/chips/ChipTopic"
import { useState, useEffect } from 'react'
import api from '../services/api'

const CourseCatalog = () => {
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [instructors, setInstructors] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);

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

    const toggleCategory = (id) => {
        setSelectedCategories(prev => 
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const toggleTopic = (id) => {
        setSelectedTopics(prev => 
            prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
        );
    };

    const toggleInstructor = (id) => {
        setSelectedInstructors(prev => 
            prev.includes(id) ? prev.filter(iId => iId !== id) : [...prev, id]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedTopics([]);
        setSelectedInstructors([]);
    };

    const activeFiltersCount = selectedCategories.length + selectedTopics.length + selectedInstructors.length;

    return (
        <div className="flex flex-col gap-16 bg-greyscale-100">
            <div className='flex flex-row gap-8 w-full max-w-391.5 mx-auto px-4 2xl:px-0'>

                {/* LEFT PART */}
                <div className="flex flex-col gap-6 w-77.25">

                    <Breadcrumbs pages={{ pages: ['Home', 'Course Catalog'], hrefs: ['/', '/catalog'], currentPage: 'Course Catalog' }} />

                    {/* Filters Text */}
                    <div className="flex justify-between">
                        <h1 className="type-heading-1 text-greyscale-950">Filters</h1>
                        <button onClick={clearAllFilters} className="flex flex-row gap-1.75 items-center cursor-pointer group">
                            <span className="type-buttons-s text-greyscale-400 group-hover:text-greyscale-600 transition-colors duration-200">Clear All Filters</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" className='stroke-greyscale-400 group-hover:stroke-greyscale-600 transition-colors duration-200' xmlns="http://www.w3.org/2000/svg">
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

                <div>
                    <h1 className="type-heading-1 text-greyscale-950">Course Catalog</h1>
                </div>

            </div>
        </div>
    )
}

export default CourseCatalog