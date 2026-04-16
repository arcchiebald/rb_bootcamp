
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



const ChipInstructor = ({ photo = null, name = 'Marilyn Mango', active = false, disabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` 
                    w-max h-9.75 flex items-center rounded-xl py-2 px-3 gap-3 
                    border box-border transition-colors duration-200 group
                    ${disabled 
                      ? 'bg-greyscale-100 border-transparent cursor-not-allowed' 
                      : active 
                        ? 'bg-purple-100 border-purple-600 cursor-pointer' 
                        : 'bg-greyscale-50 border-transparent hover:bg-purple-100 cursor-pointer active:border-purple-600'
                    }`}
    >
      <Icon photo={photo} name={name} />
      <span className={`transition-colors duration-200 ${
        disabled 
          ? 'text-greyscale-600' 
          : active 
            ? 'text-purple-600' 
            : 'text-greyscale-600 group-hover:text-purple-600'
      }`}>
        {name}
      </span>
    </button>
  )
}

export default ChipInstructor