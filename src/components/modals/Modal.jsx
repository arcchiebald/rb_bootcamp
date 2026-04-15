import React, { useEffect, useState } from 'react'

const QuitIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className='transition-color duration-200 fill-greyscale-400 hover:fill-greyscale-500 active:fill-greyscale-600' xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3 5.71022C18.2075 5.61752 18.0976 5.54397 17.9766 5.49379C17.8556 5.44361 17.7259 5.41778 17.595 5.41778C17.464 5.41778 17.3343 5.44361 17.2134 5.49379C17.0924 5.54397 16.9825 5.61752 16.89 5.71022L12 10.5902L7.10998 5.70022C7.0174 5.60764 6.90749 5.5342 6.78652 5.4841C6.66556 5.43399 6.53591 5.4082 6.40498 5.4082C6.27405 5.4082 6.1444 5.43399 6.02344 5.4841C5.90247 5.5342 5.79256 5.60764 5.69998 5.70022C5.6074 5.79281 5.53396 5.90272 5.48385 6.02368C5.43375 6.14464 5.40796 6.27429 5.40796 6.40522C5.40796 6.53615 5.43375 6.6658 5.48385 6.78677C5.53396 6.90773 5.6074 7.01764 5.69998 7.11022L10.59 12.0002L5.69998 16.8902C5.6074 16.9828 5.53396 17.0927 5.48385 17.2137C5.43375 17.3346 5.40796 17.4643 5.40796 17.5952C5.40796 17.7262 5.43375 17.8558 5.48385 17.9768C5.53396 18.0977 5.6074 18.2076 5.69998 18.3002C5.79256 18.3928 5.90247 18.4662 6.02344 18.5163C6.1444 18.5665 6.27405 18.5922 6.40498 18.5922C6.53591 18.5922 6.66556 18.5665 6.78652 18.5163C6.90749 18.4662 7.0174 18.3928 7.10998 18.3002L12 13.4102L16.89 18.3002C16.9826 18.3928 17.0925 18.4662 17.2134 18.5163C17.3344 18.5665 17.464 18.5922 17.595 18.5922C17.7259 18.5922 17.8556 18.5665 17.9765 18.5163C18.0975 18.4662 18.2074 18.3928 18.3 18.3002C18.3926 18.2076 18.466 18.0977 18.5161 17.9768C18.5662 17.8558 18.592 17.7262 18.592 17.5952C18.592 17.4643 18.5662 17.3346 18.5161 17.2137C18.466 17.0927 18.3926 16.9828 18.3 16.8902L13.41 12.0002L18.3 7.11022C18.68 6.73022 18.68 6.09022 18.3 5.71022Z" />
        </svg>
    )
}

const BackIcon = () => {
    return (
        <svg width="16" height="32" viewBox="0 0 16 32" className='transition-color duration-200 fill-greyscale-400 hover:fill-greyscale-500 active:fill-greyscale-600' xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7307 8.77332L11.316 7.35999L3.61068 15.0627C3.48648 15.1861 3.38791 15.3328 3.32064 15.4945C3.25338 15.6562 3.21875 15.8296 3.21875 16.0047C3.21875 16.1798 3.25338 16.3531 3.32064 16.5148C3.38791 16.6765 3.48648 16.8232 3.61068 16.9467L11.316 24.6533L12.7294 23.24L5.49735 16.0067L12.7307 8.77332Z" />
        </svg>
    )
}

const Modal = ({
    isOpen = false,
    width = "w-[460px]",
    height = 'h-auto',
    children,
    quit = false,
    onQuit = () => { },
    onBack = () => { },
    stages = null, // e.g. { current: 1, total: 3 }
}) => {
    const [render, setRender] = useState(isOpen);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRender(true);
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
            const timer = setTimeout(() => setRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && quit && isOpen) {
                onQuit();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [quit, onQuit, isOpen]);

    if (!render) return null;

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center bg-[#00000040] z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
            onClick={onQuit}
        >
            <div
                className={`relative ${width} ${height}
                         bg-greyscale-50 rounded-xl shadow-lg p-12.5
                         flex flex-col items-center gap-4
                         transition-all duration-300 transform
                         ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
            `}
                onClick={(e) => e.stopPropagation()}
            >
                {(stages && stages.current != 1) && (
                    <button
                        onClick={onBack}
                        className="absolute top-5 left-4"
                    >
                        <BackIcon />
                    </button>
                )}
                {quit && (
                    <button
                        onClick={onQuit}
                        className="absolute top-5 right-4"
                    >
                        <QuitIcon />
                    </button>
                )}

                {children}

            </div>
        </div>
    )
}

export default Modal