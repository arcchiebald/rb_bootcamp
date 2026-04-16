import { useState, useId } from 'react';

const Input = ({
    label,
    placeholder = '',
    value,
    onChange,
    onBlur,
    disabled = false,
    readOnly = false,
    type = 'text',
    error = false,
    success = false,
    helperText = '',
    className = '',
    name = '',
    id,
    defaultValue = '',
    prefix = '',
    maxLength = undefined,
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [showPassword, setShowPassword] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const isFilled = currentValue.length > 0;
    const inputType = type === 'password' && showPassword ? 'text' : type;

    const handleChange = (e) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    // Determine input border color based on state
    let borderColorClass = 'border-greyscale-200'; // default
    let titleColorClass = 'text-greyscale-700'; // default title color

    if (error) {
        borderColorClass = 'border-helper-error';
        titleColorClass = 'text-helper-error';
    } else if (success) {
        borderColorClass = 'border-helper-success';
    } else if (isFilled) {
        borderColorClass = 'border-greyscale-300 placeholder:text-greyscale-100';
    }

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label htmlFor={inputId} className={`block w-full h-4.25 type-body-xs ${titleColorClass}`}>
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {prefix && (
                    <span className="absolute left-3.25 inset-y-0 flex items-center type-body-xs text-greyscale-300 pointer-events-none select-none">
                        {prefix}
                    </span>
                )}
                <input
                    id={inputId}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    value={currentValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    className={`
            w-full h-12
            ${prefix ? 'pl-13 pr-3.25' : 'px-3.25'} py-3
            rounded-lg
            border-[1.5px]
            outline-none
            transition-colors duration-300
            type-body-xs text-greyscale-700
            placeholder:text-greyscale-400
            caret-greyscale-400
            ${borderColorClass}
            ${type === 'password' ? 'pr-10' : success ? 'pr-10' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-greyscale-50' : 'bg-transparent'}
            ${type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}

            hover:border-greyscale-300 hover:placeholder:text-greyscale-200
            focus:border-greyscale-300 focus:placeholder:text-greyscale-100
            active:border-greyscale-300 active:placeholder:text-greyscale-100

            ${error ? 'hover:border-helper-error focus:border-helper-error active:border-helper-error text-helper-error' : ''}
            ${success ? 'hover:border-helper-success focus:border-helper-success active:border-helper-success' : ''}
          `}
                />

                {success && type !== 'password' && (
                    <div className="absolute right-3.25 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="#1DC31D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                )}

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.25 top-1/2 transform -translate-y-1/2 flex items-center justify-center cursor-pointer"
                        tabIndex="-1"
                    >
                        {showPassword ? (
                            <svg className={`w-5.5 h-5.5 fill-transparent ${error ? 'stroke-helper-error' : 'stroke-greyscale-400'}`} viewBox='0  0 24 24'>
                                <path d="M1.05938 11.348C0.980208 11.1235 0.980208 10.8765 1.05938 10.652C1.83045 8.68365 3.13931 7.00069 4.82002 5.81644C6.50073 4.6322 8.47759 4 10.5 4C12.5224 4 14.4993 4.6322 16.18 5.81644C17.8607 7.00069 19.1695 8.68365 19.9406 10.652C20.0198 10.8765 20.0198 11.1235 19.9406 11.348C19.1695 13.3163 17.8607 14.9993 16.18 16.1836C14.4993 17.3678 12.5224 18 10.5 18C8.47759 18 6.50073 17.3678 4.82002 16.1836C3.13931 14.9993 1.83045 13.3163 1.05938 11.348Z" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.5001 14.0005C12.0741 14.0005 13.35 12.6573 13.35 11.0003C13.35 9.34326 12.0741 8 10.5001 8C8.92619 8 7.65027 9.34326 7.65027 11.0003C7.65027 12.6573 8.92619 14.0005 10.5001 14.0005Z" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        ) : (
                            <svg className={`w-5.5 h-5.5 fill-transparent ${error ? 'stroke-helper-error' : 'stroke-greyscale-400'}`} viewBox='0  0 24 24' >
                                <path d="M2 9C2.85907 9.9609 3.87049 10.7965 5 11.4785M5 11.4785C6.2165 12.2111 7.57462 12.7204 9 12.9785C10.3213 13.2128 11.6787 13.2128 13 12.9785C14.4254 12.7204 15.7835 12.2111 17 11.4785M5 11.4785L3.5 13.1538M20 9C19.1409 9.9609 18.1295 10.7965 17 11.4785M17 11.4785L18.5 13.1538M9 12.9775L8.5 15M13 12.9775L13.5 15" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        )}
                    </button>
                )}
            </div>

            {helperText && (
                <p
                    className={`
            block w-full h-auto text-xs font-normal
            ${error ? 'text-helper-error' : 'text-greyscale-300'}
          `}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default Input;
