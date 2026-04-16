import Button from "../Button";
import enrollmentImg from '../../assets/enrollment_img.png';

const PlaceholderImage = () => (
    <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-400">
        [ Image ]
    </div>
);

const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-helper-warning">
        <path d="M9 2L11.163 6.38L16 7.086L12.5 10.495L13.326 15L9 12.721L4.674 15L5.5 10.495L2 7.086L6.837 6.38L9 2Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ProgressCard = ({
    image = enrollmentImg,
    instructor = "Sarah Johnson",
    rating = "4.9",
    title = "Advanced React & TypeScript Development",
    progressPercent = 65,
    blurred = false
}) => {
    return (
        <div className={`box-border flex flex-col 
                        items-start p-5 gap-4.5 w-126.5 min-h-54.75 
                        shadow-[0px_0px_11.7px_0px_#0000000A] bg-greyscale-50 
                        border-[0.5px] border-greyscale-100 rounded-xl 
                        hover:border-purple-200 hover:shadow-[0px_0px_25px_0px_8A82D440] 
                        active:border active:border-purple-300 active:shadow-[0px_0px_35px_0px_#8A82D440] 
                        transition-all duration-300
                        ${blurred ? 'filter blur-sm' : ''}`}>
            <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-start gap-4.5 w-full">
                    <div className="w-35 h-30.75 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {image ? <img src={image} alt={title} className="w-full h-full object-cover" /> : <PlaceholderImage />}
                    </div>

                    <div className="flex flex-col items-start gap-2 grow">
                        <div className="flex flex-row justify-between items-center w-full">
                            <div>
                                <span className="type-body-xs text-greyscale-400">
                                    Lecturer&nbsp;
                                </span>
                                <span className="type-body-xs text-greyscale-500">
                                    {instructor}
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <StarIcon />
                                <span className="type-body-xs text-greyscale-600">{rating}</span>
                            </div>
                        </div>

                        <h4 className="font-semibold text-xl leading-6 text-greyscale-900 w-64.25">
                            {title}
                        </h4>
                    
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center gap-5 w-full h-12 mt-2">
                    {/* Progress Bar */}
                    <div className="flex flex-col justify-center items-start gap-2 grow h-10 w-111.5">
                        <span className="font-medium text-xs leading-3.75 text-greyscale-900">
                            {`${progressPercent}% Complete`}
                        </span>
                        <div className="relative w-full h-3.75 bg-purple-100 rounded-[30px] overflow-hidden mt-1">
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-purple-500 rounded-[30px]"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    <Button variant="outline">View</Button>
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;