const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  fullWidth = false,
  className = '',
}) => {

  // ვარიაციები ფიგმის მიხედვით
  const variants = {
    primary: `
      min-w-[114px] h-[58px]
      py-[17px] px-[25px]
      rounded-[8px] gap-[10px] cursor-pointer
      flex items-center justify-center opacity-100 text-greyscale-50 type-buttons-m 
      bg-purple-500 
      hover:bg-purple-600 
      active:bg-purple-700
      focus:bg-purple-600 focus:border-[2px] focus:border-purple-700
      disabled:bg-greyscale-300 disabled:text-greyscale-400 disabled:cursor-not-allowed
    `,
    outline: `
      min-w-[96px] h-[48px]
      py-[12px] px-[16px] 
      rounded-[8px] gap-[2px] cursor-pointer
      flex items-center justify-center type-buttons-m text-purple-500
      border-[2px] border-purple-300 
      hover:bg-purple-600 hover:text-greyscale-50 hover:border-0
      active:bg-purple-700 active:text-greyscale-50 active:border-0
      focus:bg-purple-700 focus:border-2 focus:border-dashed focus:border-purple-100 focus:border-0 focus:text-greyscale-50
      disabled:bg-greyscale-300 disabled:text-greyscale-400 disabled:border-[1px] disabled:border-greyscale-400 disabled:cursor-not-allowed
    `,
    ghost: `
      min-w-[75px] h-[48px]
      py-[1px] gap-[10px]
      type-buttons-s text-purple-500
      border-b-1 border-purple-500 cursor-pointer
      hover:border-purple-600 hover:text-purple-600
      active:border-purple-700 active:text-purple-700
      focus:text-purple-700 focus:border-b-2 focus:border-dashed focus:border-purple-700
      disabled:text-greyscale-300 disabled:border-greyscale-300 disabled:cursor-not-allowed
    `,
  };

  const selectedVariant = variants[variant] || variants.primary;
  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-colors duration-200 ${selectedVariant} ${widthClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
};



export default Button;