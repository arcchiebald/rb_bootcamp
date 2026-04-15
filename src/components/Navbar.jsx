import Button from './Button'

const Navbar = ({ user, onOpenRegistration, onOpenLogin, onOpenProfile, onOpenSidebar }) => {
  return (
    <nav className={`
        w-full h-27
        flex
        px-44.25 py-6 
        mb-15
        bg-greyscale-100 border-b border-greyscale-200
        shadow-[0px_0px_11.7px_0px_#0000000A]
        `}>
      <div className='flex h-15 w-15 shrink-0 items-center justify-center rounded-[14px] bg-purple-500 px-4.25 py-4 cursor-pointer'>
        <svg className='h-7.5 w-7.25 shrink-0 fill-transparent stroke-greyscale-50' viewBox='0 0 32 33' xmlns='http://www.w3.org/2000/svg'>
          <path d="M15.6282 21.5001L11.1667 16.8848M15.6282 21.5001C17.7056 20.6828 19.6984 19.652 21.5769 18.4232M15.6282 21.5001V29.1923C15.6282 29.1923 20.1344 28.3462 21.5769 26.1155C23.1831 23.6232 21.5769 18.4232 21.5769 18.4232M11.1667 16.8848C11.9581 14.7609 12.9546 12.725 14.141 10.808C15.8739 7.94182 18.2867 5.58194 21.1501 3.9528C24.0135 2.32365 27.2322 1.47941 30.5 1.50038C30.5 5.68494 29.34 13.0387 21.5769 18.4232M11.1667 16.8848L3.73077 16.8848C3.73077 16.8848 4.54872 12.2233 6.70513 10.731C9.11436 9.06952 14.141 10.731 14.141 10.731M4.47436 23.8078C2.24359 25.7462 1.5 31.5 1.5 31.5C1.5 31.5 7.06205 30.7308 8.9359 28.4231C9.9918 27.1308 9.97692 25.1462 8.80205 23.9463C8.22399 23.3755 7.46254 23.0457 6.66382 23.0201C5.86511 22.9946 5.08541 23.2751 4.47436 23.8078Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      {/* Right Part */}

      <div className='ml-auto flex items-center gap-9'>
        <div className='flex items-center gap-2 text-greyscale-600 fill-greyscale-600 hover:text-purple-500 hover:fill-purple-500 transition-colors duration-200 type-body-l cursor-pointer'>

          <svg width="26px" height="26px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
            <path d="M 26.6875 12.6602 C 26.9687 12.6602 27.1094 12.4961 27.1797 12.2383 C 27.9062 8.3242 27.8594 8.2305 31.9375 7.4570 C 32.2187 7.4102 32.3828 7.2461 32.3828 6.9648 C 32.3828 6.6836 32.2187 6.5195 31.9375 6.4726 C 27.8828 5.6524 28.0000 5.5586 27.1797 1.6914 C 27.1094 1.4336 26.9687 1.2695 26.6875 1.2695 C 26.4062 1.2695 26.2656 1.4336 26.1953 1.6914 C 25.3750 5.5586 25.5156 5.6524 21.4375 6.4726 C 21.1797 6.5195 20.9922 6.6836 20.9922 6.9648 C 20.9922 7.2461 21.1797 7.4102 21.4375 7.4570 C 25.5156 8.2774 25.4687 8.3242 26.1953 12.2383 C 26.2656 12.4961 26.4062 12.6602 26.6875 12.6602 Z M 15.3438 28.7852 C 15.7891 28.7852 16.0938 28.5039 16.1406 28.0821 C 16.9844 21.8242 17.1953 21.8242 23.6641 20.5821 C 24.0860 20.5117 24.3906 20.2305 24.3906 19.7852 C 24.3906 19.3633 24.0860 19.0586 23.6641 18.9883 C 17.1953 18.0977 16.9609 17.8867 16.1406 11.5117 C 16.0938 11.0899 15.7891 10.7852 15.3438 10.7852 C 14.9219 10.7852 14.6172 11.0899 14.5703 11.5352 C 13.7969 17.8164 13.4687 17.7930 7.0469 18.9883 C 6.6250 19.0821 6.3203 19.3633 6.3203 19.7852 C 6.3203 20.2539 6.6250 20.5117 7.1406 20.5821 C 13.5156 21.6133 13.7969 21.7774 14.5703 28.0352 C 14.6172 28.5039 14.9219 28.7852 15.3438 28.7852 Z M 31.2344 54.7305 C 31.8438 54.7305 32.2891 54.2852 32.4062 53.6524 C 34.0703 40.8086 35.8750 38.8633 48.5781 37.4570 C 49.2344 37.3867 49.6797 36.8945 49.6797 36.2852 C 49.6797 35.6758 49.2344 35.2070 48.5781 35.1133 C 35.8750 33.7070 34.0703 31.7617 32.4062 18.9180 C 32.2891 18.2852 31.8438 17.8633 31.2344 17.8633 C 30.6250 17.8633 30.1797 18.2852 30.0860 18.9180 C 28.4219 31.7617 26.5938 33.7070 13.9140 35.1133 C 13.2344 35.2070 12.7891 35.6758 12.7891 36.2852 C 12.7891 36.8945 13.2344 37.3867 13.9140 37.4570 C 26.5703 39.1211 28.3281 40.8321 30.0860 53.6524 C 30.1797 54.2852 30.6250 54.7305 31.2344 54.7305 Z" />
          </svg>

          <p>Browse Courses</p>

        </div>
        
        {!user ? (
          <div className='h-15 flex gap-4.25'>

            <Button onClick={onOpenLogin} variant='outline' className='h-full'>Log In</Button>
            <Button onClick={onOpenRegistration} variant='primary' className='h-full'>Sign Up</Button>

          </div>) : (
          <div className='flex gap-9'>
            <div 
              onClick={onOpenSidebar}
              className='flex items-center gap-2 text-greyscale-600 stroke-greyscale-600 hover:text-purple-500 hover:stroke-purple-500 transition-colors duration-200 type-body-l cursor-pointer'
            >

              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7.58333V22.75M13 7.58333C13 6.43406 12.5434 5.33186 11.7308 4.5192C10.9181 3.70655 9.8159 3.25 8.66663 3.25H3.24996C2.96264 3.25 2.68709 3.36414 2.48393 3.5673C2.28076 3.77047 2.16663 4.04602 2.16663 4.33333V18.4167C2.16663 18.704 2.28076 18.9795 2.48393 19.1827C2.68709 19.3859 2.96264 19.5 3.24996 19.5H9.74996C10.6119 19.5 11.4386 19.8424 12.0481 20.4519C12.6576 21.0614 13 21.888 13 22.75M13 7.58333C13 6.43406 13.4565 5.33186 14.2692 4.5192C15.0818 3.70655 16.184 3.25 17.3333 3.25H22.75C23.0373 3.25 23.3128 3.36414 23.516 3.5673C23.7192 3.77047 23.8333 4.04602 23.8333 4.33333V18.4167C23.8333 18.704 23.7192 18.9795 23.516 19.1827C23.3128 19.3859 23.0373 19.5 22.75 19.5H16.25C15.388 19.5 14.5614 19.8424 13.9519 20.4519C13.3424 21.0614 13 21.888 13 22.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <p>Enrolled Courses</p>

            </div>


            <div onClick={onOpenProfile} className='relative flex h-14 w-14 cursor-pointer items-center justify-center overflow-visible rounded-full bg-purple-50 hover:ring-[1.5px] ring-purple-200 transition-shadow duration-200'>
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="h-full w-full rounded-full object-cover" />
              ) : (
                <svg className='h-9.5 w-9.5' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.0833 33.25V30.0833C30.0833 28.4036 29.416 26.7927 28.2283 25.605C27.0406 24.4173 25.4297 23.75 23.75 23.75H14.25C12.5703 23.75 10.9593 24.4173 9.77162 25.605C8.58389 26.7927 7.91663 28.4036 7.91663 30.0833V33.25" stroke="#736BEA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M19 17.4167C22.4978 17.4167 25.3333 14.5811 25.3333 11.0833C25.3333 7.58553 22.4978 4.75 19 4.75C15.5022 4.75 12.6666 7.58553 12.6666 11.0833C12.6666 14.5811 15.5022 17.4167 19 17.4167Z" stroke="#736BEA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              )}
              
              <div className={`absolute -bottom-0.5 -right-0.5 h-4.25 w-4.25 rounded-full border-2 border-greyscale-50 transition-colors duration-200 ${user.profileComplete ? 'bg-helper-success' : 'bg-helper-warning'}`}></div>
            </div>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar