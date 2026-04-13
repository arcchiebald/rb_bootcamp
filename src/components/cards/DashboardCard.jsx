import Button from "../Button";
import DashboardImage from "../../assets/dashboardcard_img.jpg";
const PlaceholderImage = () => (
    <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-400">
        [ Image Placeholder ]
    </div>
);

const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-helper-warning">
        <path d="M9 2L11.163 6.38L16 7.086L12.5 10.495L13.326 15L9 12.721L4.674 15L5.5 10.495L2 7.086L6.837 6.38L9 2Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


export const DashboardCard = ({
    image = DashboardImage,
    instructor = "Marilyn Mango",
    rating = "4.9",
    title = "Advanced React & TypeScript Development",
    description = "Master modern React patterns, hooks, and TypeScript integration for building scalable web applications.",
    price = "$299",
}) => {
    return (
        <div className={`box-border flex flex-col items-start p-5 gap-6 w-126.5 min-h-144 shadow-[0px_0px_11.7px_0px_#0000000A] bg-greyscale-50 border-[0.5px] border-greyscale-100 rounded-xl hover:border-purple-200 hover:shadow-[0px_0px_25px_0px_#8A82D440] active:border-purple-300 active:shadow-[0px_0px_35px_0px_#8A82D440] transition-all duration-200`}>
            <div className="flex flex-col items-start gap-4 w-full">
                <div className="w-full h-65.5 rounded-[10px] overflow-hidden bg-gray-100">
                    {image ? <img src={image} alt={title} className="w-full h-full object-cover" /> : <PlaceholderImage />}
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                    <div className="flex flex-col items-start gap-3 w-full">
                        <div className="flex flex-row justify-between items-center flex-wrap w-full">
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

                        <h3 className="type-heading-3 text-greyscale-900 ">
                            {title}
                        </h3>
                        <p className="type-body-s text-greyscale-500 w-100">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center gap-2">
                    <span className="type-micro-helper-medium text-greyscale-400">
                        Starting from
                    </span>
                    <span className="type-heading-2 leading-9.75 text-greyscale-900">
                        {price}
                    </span>
                </div>

                <Button variant='primary'>Details</Button>
            </div>
        </div>
    );
};

export default DashboardCard;