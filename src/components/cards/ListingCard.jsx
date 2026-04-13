
// პლეისჰოლდერები ხატულებისთვის
const PlaceholderImage = () => (
  <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-400">
    [ Image Placeholder ]
  </div>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500">
    <path d="M9 2L11.163 6.38L16 7.086L12.5 10.495L13.326 15L9 12.721L4.674 15L5.5 10.495L2 7.086L6.837 6.38L9 2Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
    <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 6L11 9L7 12V6Z" fill="currentColor" />
  </svg>
);

export const ListingCard = ({
  image = null,
  instructor = "Marilyn Mango",
  duration = "12 Weeks",
  rating = "4.9",
  title = "Advanced React & TypeScript Development",
  category = "Development",
  price = "$299",
  buttonText = "Details"
}) => {
  return (
    <div className="box-border flex flex-col items-start p-5 gap-6 w-93.25 min-h-112.75 bg-white border border-greyscale-100 rounded-xl hover:border-purple-200 hover:shadow-[0px_0px_15px_rgba(138,130,212,0.2)] active:border-purple-300 active:shadow-[0px_0px_15px_rgba(138,130,212,0.25)] transition-all duration-200">
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
                <span className="font-medium text-sm text-greyscale-400">
                  {instructor}
                </span>
                <div className="w-0.5 h-3.5 bg-greyscale-200 rounded-full"></div>
                <span className="font-medium text-sm text-greyscale-400">
                  {duration}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                {/* [ Placeholder: Star Icon ] */}
                <StarIcon />
                <span className="font-medium text-sm text-greyscale-600">{rating}</span>
              </div>
            </div>

            {/* სათაური */}
            <h3 className="font-semibold text-2xl leading-7.25 text-greyscale-950 w-full">
              {title}
            </h3>
          </div>

          {/* კატეგორიის ჩიპი */}
          <div className="flex flex-row justify-center items-center px-3 py-2 gap-1.5 bg-greyscale-100 rounded-xl">
            {/* [ Placeholder: Category Icon ] */}
            <CategoryIcon />
            <span className="font-medium text-base text-greyscale-600 text-center leading-6">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* ფასი და ღილაკი */}
      <div className="flex flex-row justify-between items-center w-full mt-auto">
        <div className="flex flex-col justify-center items-start">
          <span className="font-medium text-xs text-greyscale-400 leading-3.75">
            Starting from
          </span>
          <span className="font-semibold text-2xl leading-7.25 text-greyscale-800">
            {price}
          </span>
        </div>

        <button className="flex flex-row justify-center items-center px-6.25 py-4.25 bg-purple-500 rounded-lg text-white font-medium text-base leading-6 hover:bg-indigo-700 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
