import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from '../Input';
import Button from '../Button';
import DragDropUpload from '../DragDropUpload';
import api from '../../services/api';

const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    age: '',
    avatar: null
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Determine completeness
  const isComplete = user?.profileComplete;

  const validateField = (name, value) => {
    let error = null;
    if (name === 'fullName') {
      if (!value) error = 'Name is required';
      else if (value.length < 3) error = 'Name must be at least 3 characters';
      else if (value.length > 50) error = 'Name must not exceed 50 characters';
      else if (!/^[a-zA-Z\s]*$/.test(value)) error = 'Name must contain only letters and spaces';
    } else if (name === 'mobileNumber') {
      if (!value) error = 'Mobile number is required';
      else {
        const clean = value.replace(/\s/g, '');
        if (!clean.startsWith('5')) error = 'Georgian mobile numbers must start with 5';
        else if (clean.length !== 9 || !/^\d+$/.test(clean)) error = 'Mobile number must be exactly 9 digits';
      }
    } else if (name === 'age') {
      if (!value) error = 'Age is required';
      else if (isNaN(value)) error = 'Age must be a number';
      else {
        const num = Number(value);
        if (num < 16) error = 'You must be at least 16 years old to enroll';
        else if (num > 120) error = 'Please enter a valid age';
      }
    }
    return error;
  };

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        mobileNumber: user.mobileNumber || '',
        age: user.age || '',
        avatar: null
      });
      setErrors({});
    }
  }, [user, isOpen]);

  // Determine completeness
  // Note: user.avatar from api might be a string (URL). Let's check both the actual user object strings and new avatar
  // (We use the isComplete variable defined above)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = [error];
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleAvatarChange = (file) => {
    setFormData(prev => ({ ...prev, avatar: file }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.avatar;
      return newErrors;
    });
  };

  const handleClose = () => {
    // If not complete and trying to close, ask for confirmation
    if (!isComplete) {
      if (window.confirm("Your profile is incomplete. You won't be able to enroll in courses until you complete it. Close anyway?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  const handleUpdate = async () => {
    let newErrors = {};
    ['fullName', 'mobileNumber', 'age'].forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = [err];
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();
      data.append('_method', 'PUT'); 
      data.append('full_name', formData.fullName);
      data.append('mobile_number', formData.mobileNumber);
      data.append('age', formData.age);
      
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }

      const response = await api.post('/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setUser(response.data.data);
      handleClose();
    } catch (err) {
      if (err.response?.data?.errors) {
        const apiErrors = err.response.data.errors;
        const mappedErrors = {};
        if (apiErrors.full_name) mappedErrors.fullName = apiErrors.full_name;
        if (apiErrors.mobile_number) mappedErrors.mobileNumber = apiErrors.mobile_number;
        if (apiErrors.age) mappedErrors.age = apiErrors.age;
        if (apiErrors.avatar) mappedErrors.avatar = apiErrors.avatar;
        setErrors(mappedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Modal isOpen={isOpen} quit={true} onQuit={handleClose}>
      <div className="flex flex-col items-center gap-6 w-full max-w-115">
        <h2 className="type-heading-2 text-greyscale-900 text-center">Profile</h2>

        <div className="flex items-center gap-3 w-full">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 shrink-0">
            {formData.avatar ? (
              <img src={URL.createObjectURL(formData.avatar)} alt="Avatar" className="h-full w-full rounded-full object-cover" />
            ) : user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="h-full w-full rounded-full object-cover" />
            ) : (
              <svg className='h-9.5 w-9.5' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.0833 33.25V30.0833C30.0833 28.4036 29.416 26.7927 28.2283 25.605C27.0406 24.4173 25.4297 23.75 23.75 23.75H14.25C12.5703 23.75 10.9593 24.4173 9.77162 25.605C8.58389 26.7927 7.91663 28.4036 7.91663 30.0833V33.25" stroke="#736BEA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 17.4167C22.4978 17.4167 25.3333 14.5811 25.3333 11.0833C25.3333 7.58553 22.4978 4.75 19 4.75C15.5022 4.75 12.6666 7.58553 12.6666 11.0833C12.6666 14.5811 15.5022 17.4167 19 17.4167Z" stroke="#736BEA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 h-4.25 w-4.25 rounded-full border-2 border-greyscale-50 transition-colors duration-200 ${isComplete ? 'bg-helper-success' : 'bg-helper-warning'}`}></div>
          </div>
          
          <div className="flex flex-col gap-1 w-full">
            <h4 className="type-heading-4 text-greyscale-950 truncate">{user?.username || 'Username'}</h4>
            <p className={`text-micro-helper-regular-xs leading-3 h-3 ${isComplete ? 'text-helper-success' : 'text-helper-warning'}`}>
              {isComplete ? 'Profile is Complete' : 'Incomplete Profile'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Input 
            label="Full Name" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Username" 
            error={!!errors.fullName}
            success={!errors.fullName && formData.fullName?.length >= 3 && formData.fullName?.length <= 50}
            helperText={errors.fullName?.[0]}
          />
          <Input 
            label="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email@gmail.com" 
            error={!!errors.email}
            helperText={errors.email?.[0]}
            disabled={true}
            readOnly={true}
            className="opacity-70"
          />
          
          <div className="flex w-full gap-2">
            <div className="grow">
              <Input 
                label="Mobile Number" 
                name="mobileNumber" 
                value={formData.mobileNumber} 
                onChange={handleChange}
                onBlur={handleBlur}
                prefix="+995 "
                placeholder="" 
                error={!!errors.mobileNumber}
                success={!errors.mobileNumber && formData.mobileNumber?.replace(/\s/g, '').length === 9 && formData.mobileNumber?.replace(/\s/g, '').startsWith('5')}
                helperText={errors.mobileNumber?.[0]}
              />
            </div>
            <div className="w-21.25 shrink-0">
              <Input 
                label="Age" 
                name="age" 
                value={formData.age} 
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="29" 
                error={!!errors.age}
                success={!errors.age && Number(formData.age) >= 16 && Number(formData.age) <= 120}
                helperText={errors.age?.[0]}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center h-auto">
          <div className="w-full">
              <label className="block w-full h-4.25 type-body-xs text-greyscale-700 mb-2">Upload Avatar</label>
              <DragDropUpload 
                  value={formData.avatar} 
                  onChange={handleAvatarChange} 
                  error={!!errors.avatar}
                  helperText={errors.avatar?.[0]}
              />
          </div>
        </div>

        <Button onClick={handleUpdate} variant="primary" className="w-full mt-2" disabled={loading || Object.keys(errors).length > 0}>
          {loading ? 'Saving...' : 'Update Profile'}
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
