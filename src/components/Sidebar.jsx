import EnrollmentCard from './cards/EnrollmentCard';
import Button from './Button';
import { useEffect } from 'react';

const Sidebar = ({ isOpen, onClose, enrolledCourses = [], isLoadingEnrollments }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-198.5 max-w-full bg-greyscale-100 z-50 transform transition-transform duration-300 ease-in-out shadow-[0px_0px_35px_0px_#8A82D440] ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-greyscale-100 z-10 flex flex-row justify-between items-end px-18.5 pt-12 pb-6">
          <h2 className="type-heading-1 text-greyscale-950 m-0">Enrolled Courses</h2>
          <span className="type-body-s text-greyscale-950 mb-1">
            Total Enrollments {enrolledCourses.length}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-21 gap-3 pb-8">
          {isLoadingEnrollments ? (
            <div className="flex flex-col gap-4.5 w-full">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="blur-sm opacity-60 pointer-events-none select-none">
                  <EnrollmentCard />
                </div>
              ))}
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full mt-36 gap-3">

              <div className="flex items-center justify-center w-40 h-40 rounded-full mt-10">
                <svg width="130" height="132" viewBox="0 0 130 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65 121V71.5" stroke="#D1D1D1" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M82.1706 12.1544C83.5196 11.3885 85.0395 10.9863 86.5851 10.9863C88.1308 10.9863 89.6506 11.3885 90.9997 12.1544L113.75 25.1344C115.361 26.0595 116.701 27.4024 117.634 29.0258C118.567 30.6492 119.058 32.495 119.058 34.3744C119.058 36.2538 118.567 38.0996 117.634 39.723C116.701 41.3464 115.361 42.6893 113.75 43.6144L47.7747 81.3444C46.4216 82.1281 44.8908 82.5402 43.3331 82.5402C41.7753 82.5402 40.2445 82.1281 38.8914 81.3444L16.2497 68.3644C14.6385 67.4393 13.2981 66.0964 12.3655 64.473C11.4328 62.8496 10.9414 61.0038 10.9414 59.1244C10.9414 57.245 11.4328 55.3992 12.3655 53.7758C13.2981 52.1524 14.6385 50.8095 16.2497 49.8844L82.1706 12.1544Z" stroke="#D1D1D1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M108.334 71.5V92.785C108.336 94.861 107.776 96.8976 106.716 98.6726C105.656 100.448 104.135 101.893 102.321 102.85L69.8212 119.79C68.3321 120.576 66.6785 120.986 65.0003 120.986C63.3221 120.986 61.6686 120.576 60.1795 119.79L27.6795 102.85C25.8654 101.893 24.3452 100.448 23.2848 98.6726C22.2245 96.8976 21.6649 94.861 21.667 92.785V71.5" stroke="#D1D1D1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M113.75 68.3658C115.361 67.4407 116.701 66.0979 117.634 64.4744C118.567 62.851 119.058 61.0053 119.058 59.1258C119.058 57.2464 118.567 55.4007 117.634 53.7772C116.701 52.1538 115.361 50.8109 113.75 49.8858L47.8289 12.1008C46.4849 11.3193 44.9631 10.9082 43.4143 10.9082C41.8656 10.9082 40.3437 11.3193 38.9997 12.1008L16.2497 25.1358C14.6385 26.061 13.2981 27.4038 12.3655 29.0272C11.4328 30.6507 10.9414 32.4964 10.9414 34.3758C10.9414 36.2553 11.4328 38.101 12.3655 39.7244C13.2981 41.3478 14.6385 42.6907 16.2497 43.6158L82.2247 81.3458C83.568 82.1295 85.0901 82.5418 86.6393 82.5418C88.1885 82.5418 89.7106 82.1295 91.0539 81.3458L113.75 68.3658Z" stroke="#D1D1D1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <div className="flex flex-col items-center gap-2">
                <h3 className="type-heading-3 text-purple-800 text-center">No Enrolled Courses Yet</h3>
                <p className="type-body-xs font-normal text-purple-800 text-center max-w-68.5">
                  Your learning journey starts here! Browse courses to get started.
                </p>
              </div>
              <Button variant="primary" className='mt-2'><a href="/courses">Browse Courses</a></Button>
            </div>

          ) : (
            <div className="flex flex-col gap-4.5 w-full">
              {enrolledCourses.map((enrollment) => (
                <EnrollmentCard
                  key={enrollment.id}
                  id={enrollment.course.id}
                  title={enrollment.course.title}
                  instructor={enrollment.course.instructor.name}
                  rating={enrollment.course.avgRating}
                  image={enrollment.course.image}
                  progressPercent={enrollment.progress}
                  weeklySchedule={enrollment.schedule?.weeklySchedule?.label || 'Schedule TBA'}
                  timeSlot={enrollment.schedule?.timeSlot?.label || 'Time slot TBA'}
                  sessionType={enrollment.schedule?.sessionType?.name || 'online'}
                  location={enrollment.schedule?.location}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;