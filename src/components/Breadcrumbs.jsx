import React from 'react'

const RightArrow = () => (
    <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.45199 6.58023L3.51299 5.52024L9.29199 11.2972C9.38514 11.3898 9.45907 11.4999 9.50952 11.6211C9.55997 11.7424 9.58594 11.8724 9.58594 12.0037C9.58594 12.1351 9.55997 12.2651 9.50952 12.3863C9.45907 12.5076 9.38514 12.6177 9.29199 12.7102L3.51299 18.4902L2.45299 17.4302L7.87699 12.0052L2.45199 6.58023Z" fill="#666666" />
    </svg>
)

const Breadcrumbs = ({ pages }) => {

    return (
        <div>
            <div className='flex gap-1 items-center type-body-m px-0.5 py-1 text-greyscale-500'>
                {pages.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        <a href={pages.hrefs[index]} className={page === pages.currentPage ? 'text-purple-500 hover:text-purple-600' : 'text-greyscale-500 hover:text-greyscale-600'}>
                            {page}
                        </a>
                        {index < pages.pages.length - 1 && <RightArrow />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Breadcrumbs