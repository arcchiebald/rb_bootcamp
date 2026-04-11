const Button = ({ children, variant = 'primary',type = 'button', onClick, disabled }) => {
  
  // ვარიაციები ფიგმის მიხედვით
  const variants = {
    primary: `
      w-[114px] h-[58px]
      py-[17px] px-[25px]
      rounded-[8px] gap-[10px]
      flex items-center justify-center opacity-100 text-greyscale-50 type-buttons-m 
      bg-purple-500 
      hover:bg-purple-600 
      active:bg-purple-700
      focus:bg-purple-600 focus:ring-[2px] focus:ring-purple-700
      disabled:bg-greyscale-300 disabled:text-greyscale-400 disabled:cursor-not-allowed
    `,
    outline: `
          w-[96px] h-[48px]
          py-[12px] px-[16px] 
          rounded-[8px] gap-[2px]
          flex items-center justify-center type-buttons-m text-purple-500
          ring-[2px] ring-purple-300 
          hover:bg-purple-600 hover:text-greyscale-50 hover:ring-0
          active:bg-purple-700 active:text-greyscale-50 active:ring-0
          focus:bg-purple-700 focus:border-2 focus:border-dashed focus:border-purple-100 focus:ring-0 focus:text-greyscale-50
          disabled:bg-greyscale-300 disabled:text-greyscale-400 disabled:ring-[1px] disabled:ring-greyscale-400 disabled:cursor-not-allowed
    `,
    ghost: `
          w-[75px] h-[48px]
          py-[1px] gap-[10px]
          type-buttons-s text-purple-500
          border-b-1 border-purple-500 
          hover:border-purple-600 hover:text-purple-600
          hover:border-purple-700 hover:text-purple-700
          focus:text-purple-700 focus:border-b-2 focus:border-dashed focus:border-purple-700 f
          disabled:text-greyscale-300 disabled:border-greyscale-300 disabled:cursor-not-allowed
    `,
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]}`}
    >
      {children}
    </button>
  );
};



export default Button;