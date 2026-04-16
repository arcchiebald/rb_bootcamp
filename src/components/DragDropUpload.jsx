import { useState, useEffect, useId } from 'react';

const DragDropUpload = ({
    label,
    value,
    onChange,
    className = '',
    id,
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    
    const [isOver, setIsOver] = useState(false);
    const [internalFile, setInternalFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [lastFile, setLastFile] = useState(null);

    const isControlled = value !== undefined;
    const actualFile = isControlled ? value : internalFile;

    // Reset preview immediately during render when the file is cleared
    if (actualFile !== lastFile) {
        setLastFile(actualFile);
        if (!actualFile) {
            setPreview(null);
        }
    }

    useEffect(() => {
        if (!actualFile || !(actualFile instanceof File)) {
            return;
        }

        let isActive = true;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (isActive) {
                setPreview(reader.result);
            }
        };
        reader.readAsDataURL(actualFile);
        
        return () => {
            isActive = false;
        };
    }, [actualFile]);

    const handleFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 2 * 1024 * 1024;
        
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                alert("Please upload a valid image file (JPG, PNG, or WebP).");
                return;
            }
            if (file.size > maxSize) {
                alert("File is too large. Please upload an image smaller than 2MB.");
                return;
            }
            if (!isControlled) {
                setInternalFile(file);
            }
            onChange?.(file);
        }
    };

    // 1. Drag & Drop ლოგიკა
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsOver(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    return (
        <div className={`flex flex-col gap-2 items-center w-full`}>
            {label && (
                <label htmlFor={inputId} className={`block w-full h-4.25 type-body-xs text-greyscale-700`}>
                    {label}
                </label>
            )}
            {!actualFile || !preview ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-35 
                    rounded-lg border-[1.5px] 
                    flex flex-col items-center justify-center 
                    gap-2 p-4 transition-colors duration-300
                    hover:bg-purple-50 hover:border-purple-100
                    ${isOver ? 'border-purple-200 bg-purple-100' : 'border-greyscale-200 bg-greyscale-50'}
                    ${className}
                    `}
                >
                    <svg className={`${isOver ? 'stroke-greyscale-400' : 'stroke-greyscale-300'} fill-transparent w-8 h-8`} viewBox='0 0 34 34' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.75 21.25V26.9167C29.75 27.6681 29.4515 28.3888 28.9201 28.9201C28.3888 29.4515 27.6681 29.75 26.9167 29.75H7.08333C6.33189 29.75 5.61122 29.4515 5.07986 28.9201C4.54851 28.3888 4.25 27.6681 4.25 26.9167V21.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M24.0834 11.3333L17 4.25L9.91669 11.3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17 4.25V21.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>


                    <p className="type-body-xs text-greyscale-500">
                        Drag and drop or
                        <label className="text-purple-600 font-medium cursor-pointer hover:text-purple-700 transition-colors ml-1 underline">
                            <input
                                id={inputId}
                                type="file"
                                className="hidden"
                                accept="image/jpeg, image/png, image/webp"
                                onChange={handleFileSelect}
                            />
                            Upload file
                        </label>
                    </p>

                    <p className="type-micro-helper-regular-s text-gray-400">
                        JPG, PNG or WebP
                    </p>
                </div>) : (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-35 
                    rounded-lg border-[1.5px] 
                    flex flex-row items-center 
                    gap-2 pb-7.5 pt-7.5 transition-colors duration-300
                    bg-purple-50 border-purple-100
                    ${isOver ? 'border-purple-200 bg-purple-100' : 'border-greyscale-200 bg-greyscale-50'}`}
                >
                    <div className='pl-10 pr-10 flex items-center gap-2.5'>
                        <img src={preview} alt="Preview" className="w-13.5 h-13.5 shrink-0 object-cover rounded-[40px]" />
                        <div className="flex min-w-0 flex-col gap-1">
                            <p className="type-micro-helper-regular-s max-w-full truncate text-greyscale-600">
                                {actualFile?.name.split('.')[0]}.{actualFile?.name.split('.').pop().toUpperCase()}
                            </p>
                            <p className="type-micro-helper-regular-xs text-greyscale-300">
                                Size - {niceBytes(actualFile?.size)}
                            </p>
                            <label className="type-micro-helper-regular-xs underline underline-offset-3 text-purple-500 cursor-pointer hover:text-purple-700 transition-colors">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleFileSelect}
                                />
                                Change
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

function niceBytes(x) {

    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export default DragDropUpload;