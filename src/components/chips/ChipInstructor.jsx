
const Icon = ({ photo, name }) => {
  return (
    <>
      {!photo ? (
        <div className="w-7.5 h-7.5 rounded-sm bg-greyscale-300 flex items-center justify-center"></div>
      ) : (
        <div>
          <img src={photo} alt={name} className="w-7.5 h-7.5 rounded-sm object-cover" />
        </div>
      )}
    </>
  )
}



const ChipInstructor = ({ photo = null, name = 'Marilyn Mango'}) => {
  return (
    <button
      className={` 
                    w-max h-9.75 flex items-center cursor-pointer 
                    bg-greyscale-50 hover:bg-purple-100 
                    border border-transparent
                    active:border active:border-purple-600 
                    disabled:bg-greyscale-100 disabled:cursor-not-allowed disabled:border-transparent
                    transition-colors duration-200 
                    rounded-xl py-2 px-3 gap-3 
                    group`}
    >
      <Icon photo={photo} name={name} />
      <span className="text-greyscale-600 group-hover:text-purple-600 group-disabled:text-greyscale-600 transition-colors duration-200">{name}</span>
    </button>
  )
}

export default ChipInstructor