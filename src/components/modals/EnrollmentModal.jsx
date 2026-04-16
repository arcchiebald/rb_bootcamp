import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import Button from '../Button';

const IncompleteIcon = () => (
  <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M74.4167 82.25V74.4167C74.4167 70.2616 72.7661 66.2767 69.828 63.3387C66.89 60.4006 62.9051 58.75 58.75 58.75H35.25C31.095 58.75 27.1101 60.4006 24.172 63.3387C21.234 66.2767 19.5834 70.2616 19.5834 74.4167V82.25" stroke="var(--color-purple-500)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M47 43.0833C55.6525 43.0833 62.6667 36.0691 62.6667 27.4167C62.6667 18.7642 55.6525 11.75 47 11.75C38.3476 11.75 31.3334 18.7642 31.3334 27.4167C31.3334 36.0691 38.3476 43.0833 47 43.0833Z" stroke="var(--color-purple-500)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CongratulationsIcon = () => (
  <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21.886 42.2248L7.83301 81.795L47.4032 67.779M15.2293 11.5302H15.2663M81.796 30.0209H81.833M55.909 7.83203H55.946M81.796 74.3987H81.833M81.796 7.83203L73.5122 10.6056C71.1542 11.3911 69.1422 12.9711 67.8201 15.0757C66.498 17.1802 65.9479 19.6787 66.2638 22.1439C66.6336 25.3243 64.1558 28.1719 60.9015 28.1719H59.4962C56.3158 28.1719 53.5791 30.3907 52.9874 33.4972L52.2108 37.4172M81.796 48.5117L78.7635 47.2913C75.5831 46.0339 72.0329 48.0309 71.4412 51.3962C71.0344 53.9849 68.7785 55.908 66.1528 55.908H63.3053M41.1164 7.83203L42.3368 10.8645C43.5941 14.0449 41.5971 17.5951 38.2318 18.1869C35.6431 18.5567 33.7201 20.8495 33.7201 23.4752V26.3228" stroke="var(--color-helper-success)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M41.1164 48.5121C48.2538 55.6495 51.5822 63.9334 48.5127 67.0028C45.4432 70.0723 37.1594 66.744 30.0219 59.6065C22.8845 52.4691 19.5562 44.1852 22.6256 41.1158C25.6951 38.0463 33.979 41.3746 41.1164 48.5121Z" stroke="var(--color-helper-success)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConflictIcon = () => (
  <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15.7101 81.9277H78.2899C79.3063 81.9276 80.3053 81.6637 81.1892 81.1619C82.0731 80.6601 82.8117 79.9376 83.3328 79.065C83.854 78.1924 84.1398 77.1995 84.1624 76.1833C84.185 75.1672 83.9436 74.1625 83.4617 73.2676L52.1737 15.1602C49.954 11.0404 44.046 11.0404 41.8264 15.1602L10.5383 73.2676C10.0565 74.1625 9.81504 75.1672 9.83763 76.1833C9.86023 77.1995 10.1461 78.1924 10.6672 79.065C11.1883 79.9376 11.9269 80.6601 12.8109 81.1619C13.6948 81.6637 14.6937 81.9276 15.7101 81.9277Z" stroke="var(--color-helper-warning)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M45.9462 35.8717L47 58.2702L48.052 35.8809C48.0585 35.7378 48.0358 35.5948 47.9851 35.4608C47.9345 35.3268 47.8571 35.2044 47.7576 35.1013C47.6581 34.9982 47.5386 34.9165 47.4065 34.8611C47.2743 34.8058 47.1323 34.778 46.989 34.7793C46.8483 34.7807 46.7092 34.8103 46.58 34.8663C46.4509 34.9223 46.3343 35.0036 46.2371 35.1055C46.1399 35.2073 46.064 35.3275 46.0141 35.4592C45.9641 35.5908 45.941 35.7311 45.9462 35.8717Z" stroke="var(--color-helper-warning)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M47 72.9336C46.2738 72.9336 45.5639 72.7182 44.96 72.3148C44.3562 71.9113 43.8855 71.3378 43.6076 70.6669C43.3297 69.9959 43.257 69.2576 43.3987 68.5454C43.5404 67.8331 43.8901 67.1788 44.4036 66.6653C44.9171 66.1518 45.5714 65.8021 46.2837 65.6604C46.9959 65.5187 47.7342 65.5914 48.4052 65.8693C49.0761 66.1473 49.6496 66.6179 50.0531 67.2217C50.4565 67.8256 50.6719 68.5355 50.6719 69.2617C50.6719 70.2356 50.285 71.1695 49.5964 71.8581C48.9078 72.5467 47.9738 72.9336 47 72.9336Z" fill="var(--color-helper-warning)"/>
  </svg>
);

const ConfirmIcon = () => (
  <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M36.4166 40.5282L49.8106 50.5757C50.6404 51.1981 51.6748 51.4837 52.7064 51.3755C53.7379 51.2672 54.6904 50.773 55.373 49.992L81.6388 19.9727" stroke="var(--color-purple-500)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M85.75 48.7493C85.7501 56.4804 83.3286 64.0173 78.8255 70.3015C74.3224 76.5857 67.9639 81.3014 60.6431 83.7865C53.3223 86.2715 45.407 86.4009 38.0089 84.1566C30.6108 81.9123 24.1015 77.407 19.3953 71.2734C14.6891 65.1398 12.0224 57.6861 11.7698 49.9592C11.5171 42.2323 13.6912 34.6203 17.9867 28.1924C22.2821 21.7645 28.4832 16.8435 35.7189 14.1207C42.9546 11.3979 50.8614 11.01 58.3289 13.0114" stroke="var(--color-purple-500)" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

const FullStar = ({ onClick }) => (
  <button type="button" onClick={onClick} className="h-11.5 w-11.5" aria-label="Set rating">
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.8807 14.6595C30.0224 14.9614 30.3052 15.1728 30.6349 15.2231L44.0761 17.2764C44.8808 17.3993 45.2093 18.3807 44.6409 18.9633L34.8524 28.9962C34.6308 29.2233 34.5301 29.5422 34.5812 29.8555L36.8833 43.9676C37.0177 44.7914 36.1431 45.4076 35.4125 45.0037L23.4837 38.41C23.1827 38.2436 22.8172 38.2436 22.5162 38.41L10.5874 45.0037C9.85682 45.4076 8.98227 44.7914 9.11667 43.9676L11.4187 29.8555C11.4698 29.5422 11.3692 29.2233 11.1475 28.9962L1.35903 18.9633C0.790626 18.3807 1.11919 17.3993 1.92379 17.2764L15.365 15.2231C15.6947 15.1728 15.9776 14.9614 16.1193 14.6595L22.0947 1.92862C22.4546 1.16181 23.5453 1.16181 23.9052 1.92862L29.8807 14.6595Z" fill="var(--color-helper-warning)"/>
    </svg>
  </button>
);

const HoverStar = ({ onClick }) => (
  <button type="button" onClick={onClick} className="h-11.5 w-11.5" aria-label="Preview rating">
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.8807 14.6595C30.0224 14.9614 30.3052 15.1728 30.6349 15.2231L44.0761 17.2764C44.8808 17.3993 45.2093 18.3807 44.6409 18.9633L34.8524 28.9962C34.6308 29.2233 34.5301 29.5422 34.5812 29.8555L36.8833 43.9676C37.0177 44.7914 36.1431 45.4076 35.4125 45.0037L23.4837 38.41C23.1827 38.2436 22.8172 38.2436 22.5162 38.41L10.5874 45.0037C9.85682 45.4076 8.98227 44.7914 9.11667 43.9676L11.4187 29.8555C11.4698 29.5422 11.3692 29.2233 11.1475 28.9962L1.35903 18.9633C0.790626 18.3807 1.11919 17.3993 1.92379 17.2764L15.365 15.2231C15.6947 15.1728 15.9776 14.9614 16.1193 14.6595L22.0947 1.92862C22.4546 1.16181 23.5453 1.16181 23.9052 1.92862L29.8807 14.6595Z" fill="var(--color-helper-warning)" fillOpacity="0.4"/>
    </svg>
  </button>
);

const EmptyStar = ({ onClick }) => (
  <button type="button" onClick={onClick} className="h-11.5 w-11.5" aria-label="Set rating">
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M22.0947 1.92862C22.4546 1.16182 23.5453 1.16181 23.9052 1.92862L29.8806 14.6592C30.0223 14.9611 30.3052 15.1725 30.6348 15.2229L44.0762 17.2765C44.8808 17.3994 45.2093 18.3808 44.6409 18.9634L34.8524 28.9958C34.6308 29.223 34.5301 29.5419 34.5812 29.8552L36.8832 43.9676C37.0176 44.7914 36.143 45.4076 35.4125 45.0037L23.4838 38.4097C23.1827 38.2433 22.8172 38.2433 22.5162 38.4097L10.5875 45.0037C9.85689 45.4076 8.98232 44.7914 9.11671 43.9676L11.4187 29.8552C11.4698 29.5419 11.3692 29.223 11.1475 28.9958L1.35904 18.9634C0.79063 18.3808 1.11917 17.3994 1.92376 17.2765L15.3651 15.2229C15.6947 15.1725 15.9776 14.9611 16.1193 14.6592L22.0947 1.92862Z" fill="var(--color-greyscale-100)"/>
      <path d="M15.3651 15.2229L15.4406 15.7171L15.3651 15.2229ZM1.92376 17.2765L1.84825 16.7822L1.92376 17.2765ZM11.1475 28.9958L11.5054 28.6466L11.1475 28.9958ZM10.5875 45.0037L10.3456 44.5661L10.5875 45.0037ZM9.11671 43.9675L8.62324 43.8871L9.11671 43.9675ZM23.4838 38.4097L23.7256 37.9721L23.4838 38.4097ZM22.5162 38.4097L22.2743 37.9721L22.5162 38.4097ZM36.8832 43.9675L36.3897 44.048L36.8832 43.9675ZM35.4125 45.0037L35.1706 45.4413L35.4125 45.0037ZM34.8524 28.9958L35.2103 29.345L34.8524 28.9958ZM34.5812 29.8552L35.0747 29.7747L34.5812 29.8552ZM44.0762 17.2765L44.0006 17.7708L44.0762 17.2765ZM44.6409 18.9634L44.283 18.6142L44.6409 18.9634ZM30.6348 15.2229L30.5593 15.7171L30.6348 15.2229ZM22.0947 1.92862L21.6421 1.71617L22.0947 1.92862ZM23.9052 1.92862L23.4526 2.14107L29.428 14.8717L29.8806 14.6592L30.3333 14.4468L24.3578 1.71617L23.9052 1.92862ZM30.6348 15.2229L30.5593 15.7171L44.0006 17.7708L44.0762 17.2765L44.1517 16.7822L30.7104 14.7286L30.6348 15.2229ZM44.6409 18.9634L44.283 18.6142L34.4945 28.6466L34.8524 28.9958L35.2103 29.345L44.9988 19.3126L44.6409 18.9634ZM34.5812 29.8552L34.0877 29.9356L36.3897 44.048L36.8832 43.9675L37.3767 43.8871L35.0747 29.7747L34.5812 29.8552ZM35.4125 45.0037L35.6544 44.5661L23.7256 37.9721L23.4838 38.4097L23.2419 38.8473L35.1706 45.4413L35.4125 45.0037ZM22.5162 38.4097L22.2743 37.9721L10.3456 44.5661L10.5875 45.0037L10.8294 45.4413L22.7581 38.8473L22.5162 38.4097ZM9.11671 43.9675L9.61019 44.048L11.9122 29.9356L11.4187 29.8552L10.9252 29.7747L8.62324 43.8871L9.11671 43.9675ZM11.1475 28.9958L11.5054 28.6466L1.71692 18.6142L1.35904 18.9634L1.00116 19.3126L10.7896 29.345L11.1475 28.9958ZM1.92376 17.2765L1.99928 17.7708L15.4406 15.7171L15.3651 15.2229L15.2896 14.7286L1.84825 16.7822L1.92376 17.2765ZM16.1193 14.6592L16.5719 14.8717L22.5473 2.14107L22.0947 1.92862L21.6421 1.71617L15.6667 14.4468L16.1193 14.6592ZM15.3651 15.2229L15.4406 15.7171C15.9351 15.6416 16.3594 15.3245 16.5719 14.8717L16.1193 14.6592L15.6667 14.4468C15.5958 14.5977 15.4544 14.7034 15.2896 14.7286L15.3651 15.2229ZM1.35904 18.9634L1.71692 18.6142C1.43271 18.3229 1.59698 17.8322 1.99928 17.7708L1.92376 17.2765L1.84825 16.7822C0.641352 16.9666 0.148546 18.4387 1.00116 19.3126L1.35904 18.9634ZM11.4187 29.8552L11.9122 29.9356C11.9888 29.4658 11.8379 28.9874 11.5054 28.6466L11.1475 28.9958L10.7896 29.345C10.9005 29.4586 10.9508 29.618 10.9252 29.7747L11.4187 29.8552ZM10.5875 45.0037L10.3456 44.5661C9.98028 44.7681 9.543 44.46 9.61019 44.048L9.11671 43.9675L8.62324 43.8871C8.42165 45.1229 9.7335 46.0471 10.8294 45.4413L10.5875 45.0037ZM23.4838 38.4097L23.7256 37.9721C23.2741 37.7225 22.7259 37.7225 22.2743 37.9721L22.5162 38.4097L22.7581 38.8473C22.9086 38.7641 23.0913 38.7641 23.2419 38.8473L23.4838 38.4097ZM36.8832 43.9675L36.3897 44.048C36.4569 44.46 36.0196 44.7681 35.6544 44.5661L35.4125 45.0037L35.1706 45.4413C36.2664 46.0471 37.5783 45.1229 37.3767 43.8871L36.8832 43.9675ZM34.8524 28.9958L34.4945 28.6466C34.1621 28.9874 34.0111 29.4658 34.0877 29.9356L34.5812 29.8552L35.0747 29.7747C35.0491 29.618 35.0995 29.4586 35.2103 29.345L34.8524 28.9958ZM44.0762 17.2765L44.0006 17.7708C44.4029 17.8322 44.5672 18.3229 44.283 18.6142L44.6409 18.9634L44.9988 19.3126C45.8514 18.4387 45.3586 16.9666 44.1517 16.7822L44.0762 17.2765ZM29.8806 14.6592L29.428 14.8717C29.6406 15.3245 30.0648 15.6416 30.5593 15.7171L30.6348 15.2229L30.7104 14.7286C30.5455 14.7034 30.4041 14.5977 30.3333 14.4468L29.8806 14.6592ZM23.9052 1.92862L24.3578 1.71617C23.8179 0.565964 22.182 0.565965 21.6421 1.71617L22.0947 1.92862L22.5473 2.14107C22.7273 1.75767 23.2726 1.75767 23.4526 2.14107L23.9052 1.92862Z" fill="var(--color-greyscale-200)"/>
    </svg>
  </button>
);

const EnrollmentModal = ({
  isOpen = false,
  onClose = () => {},
  variant = 'incomplete',
  text = 'You need to complete your profile before enrolling in this course.',
  courseName,
  conflictSchedule,
  onPrimaryAction,
  onSecondaryAction,
  onRate,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const resolvedCourseName = courseName || 'this course';
  const resolvedConflictSchedule = conflictSchedule || 'the same schedule';

  const content = useMemo(() => {
    switch (variant) {
      case 'incomplete':
        return {
          icon: <IncompleteIcon />,
          title: 'Complete your profile to continue',
          description: text,
          primaryLabel: 'Cancel',
          secondaryLabel: 'Complete Profile',
          showRating: false,
          splitButtons: true,
        };
      case 'conflict':
        return {
          icon: <ConflictIcon />,
          title: 'Enrollment Conflict',
          description: `You are already enrolled in "${resolvedCourseName}" with the same schedule: ${resolvedConflictSchedule}. Are you sure you want to continue?`,
          primaryLabel: 'Continue Anyway',
          secondaryLabel: 'Cancel',
          showRating: false,
          splitButtons: true,
        };
      case 'congratulations':
        return {
          icon: <CongratulationsIcon />,
          title: 'Congratulations!',
          description: `You've completed "${resolvedCourseName}"!`,
          primaryLabel: 'Done',
          secondaryLabel: null,
          showRating: true,
          splitButtons: false,
        };
      case 'confirm':
      default:
        return {
          icon: <ConfirmIcon />,
          title: 'Enrollment Confirmed!',
          description: `You've successfully enrolled to "${resolvedCourseName}"!`,
          primaryLabel: 'Done',
          secondaryLabel: null,
          showRating: false,
          splitButtons: false,
        };
    }
  }, [variant, text, resolvedCourseName, resolvedConflictSchedule]);

  const handleRate = (nextRating) => {
    setRating(nextRating);
    if (onRate) onRate(nextRating);
  };

  const handlePrimary = () => {
    if (onPrimaryAction) onPrimaryAction();
    else onClose();
  };

  const handleSecondary = () => {
    if (onSecondaryAction) onSecondaryAction();
  };

  return (
    <Modal
      isOpen={isOpen}
      onQuit={onClose}
      width="w-[476px]"
      quit={false}
    >
      <div className="flex w-full max-w-89 flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="h-23.5 w-23.5">{content.icon}</div>

          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h2 className="type-heading-2 text-greyscale-700">{content.title}</h2>
            <p className="type-body-l text-greyscale-700">{content.description}</p>
          </div>
        </div>

        {content.showRating && (
          <div className="flex w-full max-w-75.5 flex-col items-center gap-4.5">
            <p className="type-body-s text-purple-400">Rate your experience</p>
            <div
              className="flex items-center justify-center gap-4.5"
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const isFilled = value <= rating;
                const isHoveredPreview = hoverRating > 0 && value <= hoverRating && !isFilled;

                if (isFilled) {
                  return (
                    <div key={value} onMouseEnter={() => setHoverRating(value)}>
                      <FullStar onClick={() => handleRate(value)} />
                    </div>
                  );
                }

                if (isHoveredPreview) {
                  return (
                    <div key={value} onMouseEnter={() => setHoverRating(value)}>
                      <HoverStar onClick={() => handleRate(value)} />
                    </div>
                  );
                }

                return (
                  <div key={value} onMouseEnter={() => setHoverRating(value)}>
                    <EmptyStar onClick={() => handleRate(value)} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex w-full gap-2">
          {content.splitButtons && content.secondaryLabel && (
            <Button
              variant="outline"
              text="s"
              height="[58px]"
              fullWidth={true}
              onClick={handleSecondary}
            >
              {content.secondaryLabel}
            </Button>
          )}

          <Button
            variant="primary"
            text="s"
            height="[58px]"
            fullWidth={true}
            onClick={handlePrimary}
          >
            {content.primaryLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EnrollmentModal;