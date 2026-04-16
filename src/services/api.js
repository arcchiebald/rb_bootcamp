import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.redclass.redberryinternship.ge/api',
  headers: {
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const coursesApi = {
  getCourseById: (id) => api.get(`/courses/${id}`),
  getWeeklySchedules: (id) => api.get(`/courses/${id}/weekly-schedules`),
  getTimeSlots: (id, weeklyScheduleId) => api.get(`/courses/${id}/time-slots`, {
    params: { weekly_schedule_id: weeklyScheduleId },
  }),
  getSessionTypes: (id, weeklyScheduleId, timeSlotId) => api.get(`/courses/${id}/session-types`, {
    params: {
      weekly_schedule_id: weeklyScheduleId,
      time_slot_id: timeSlotId,
    },
  }),
  enrollInCourse: ({ courseId, courseScheduleId, force = false }) => api.post('/enrollments', {
    courseId,
    courseScheduleId,
    force,
  }),
  completeCourse: (enrollmentId) => api.patch(`/enrollments/${enrollmentId}/complete`),
  rateCourse: (courseId, rating) => api.post(`/courses/${courseId}/reviews`, { rating }),
  deleteEnrollment: (enrollmentId) => api.delete(`/enrollments/${enrollmentId}`),
};

export default api;