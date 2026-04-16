
const ChipTopic = ({ name, active = false, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` 
                    w-max h-9.75 flex cursor-pointer 
                    ${active ? 'bg-purple-100 border border-purple-600' : 'bg-greyscale-50 border border-transparent'} 
                    hover:bg-purple-100 
                    active:border-purple-600 
                    disabled:bg-greyscale-100 disabled:cursor-not-allowed disabled:border-transparent
                    transition-colors duration-300
                    rounded-xl py-2 px-3 gap-2.5 
                    group`}
    >
      <span className={`${active ? 'text-purple-600' : 'text-greyscale-600'} group-hover:text-purple-600 group-disabled:text-greyscale-600`}>{name}</span>
    </button>
  )
}

export default ChipTopic