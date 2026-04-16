import EnrollmentImage from "../../assets/dashboardcard_img.jpg";
import ChipCategory from "../chips/ChipCategory";
// პლეისჰოლდერები ხატულებისთვის
const PlaceholderImage = () => (
  <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-400">
    [ Image Placeholder ]
  </div>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9024 5.51207C12.0441 5.81396 12.327 6.02534 12.6566 6.0757L15.9456 6.57816C16.7502 6.70108 17.0787 7.68246 16.5103 8.26504L14.0685 10.7677C13.8469 10.9949 13.7462 11.3138 13.7973 11.627L14.3651 15.1084C14.4995 15.9323 13.625 16.5484 12.8944 16.1446L10.0455 14.5701C9.74449 14.4037 9.37906 14.4037 9.07802 14.5701L6.2302 16.1444C5.49964 16.5482 4.62508 15.9321 4.75945 15.1082L5.3272 11.6271C5.37829 11.3138 5.27762 10.9948 5.05591 10.7677L2.61365 8.26513C2.04512 7.68256 2.37366 6.70107 3.17833 6.57816L6.46776 6.07571C6.79748 6.02534 7.08039 5.8139 7.22207 5.51194L8.65664 2.45447C9.01648 1.68756 10.1072 1.68748 10.4672 2.45434L11.9024 5.51207Z" fill="#F4A316" />
  </svg>
);

const CategoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
    <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 6L11 9L7 12V6Z" fill="currentColor" />
  </svg>
);

export const ListingCard = ({
  image = EnrollmentImage,
  instructor = "Marilyn Mango",
  duration = "12 Weeks",
  rating = "4.9",
  title = "Advanced React & TypeScript Development",
  icon = "development",
  category = "Development",
  price = "$299",
  buttonText = "Details",
  blurred = false
}) => {
  return (
    <div className={`box-border flex flex-col items-start p-5 gap-6 w-93.25 min-h-112.75 bg-white border border-greyscale-100 rounded-xl hover:border-purple-200 hover:shadow-[0px_0px_15px_rgba(138,130,212,0.2)] active:border-purple-300 active:shadow-[0px_0px_15px_rgba(138,130,212,0.25)] transition-all duration-200 ${blurred ? "blur-[2px] opacity-70" : ""}`}>
      <div className="flex flex-col items-start gap-4.5 w-full">
        {/* სურათის ბლოკი */}
        <div className="w-83.25 h-45.25 rounded-[10px] overflow-hidden bg-gray-100">
          {image ? <img src={image} alt={title} className="w-full h-full object-cover" /> : <PlaceholderImage />}
        </div>

        {/* ინფო: ლექტორი, ხანგრძლივობა, რეიტინგი */}
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex flex-row justify-between items-center flex-wrap w-full">
              <div className="flex flex-row items-center gap-2">
                <span className="type-body-xs text-greyscale-400">
                  {instructor}
                </span>
                <div className="w-0.5 h-3.5 bg-greyscale-200 rounded-full"></div>
                <span className="type-body-xs text-greyscale-400">
                  {duration}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                {/* [ Placeholder: Star Icon ] */}
                <StarIcon />
                <span className="type-body-xs text-greyscale-600">{rating}</span>
              </div>
            </div>

            {/* სათაური */}
            <h3 className="type-heading-3 leading-7.25 text-greyscale-950 w-full">
              {title}
            </h3>
          </div>

          {/* კატეგორიის ჩიპი */}
          <ChipCategory name={category} icon={icon} disabled={true} />
        </div>
      </div>

      {/* ფასი და ღილაკი */}
      <div className="flex flex-row justify-between items-center w-full h-12 mt-auto">
        <div className="flex flex-col justify-center items-start">
          <span className="type-micro-helper-regular-s text-greyscale-400 leading-3.75">
            Starting from
          </span>
          <span className="type-heading-3  text-greyscale-800">
            {price}
          </span>
        </div>

        <button className="flex flex-row h-full justify-center items-center px-6.25 py-4.25 bg-purple-500 rounded-lg text-greyscale-50 type-buttons-s hover:bg-indigo-700 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
