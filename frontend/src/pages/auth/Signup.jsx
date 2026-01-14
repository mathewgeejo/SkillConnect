import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight, FiBriefcase } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'worker';
  const [role, setRole] = useState(initialRole);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role }
  });
  const { register: registerUser, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const result = await registerUser({ ...data, role });
      const dashboardRoute = result.role === 'worker'
        ? '/dashboard/worker'
        : '/dashboard/employer';
      navigate(dashboardRoute);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join SkillConnect Kerala today</p>
      </div>

      {/* Role Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setRole('worker')}
          className={`p-4 border-2 rounded-lg transition ${
            role === 'worker'
              ? 'border-secondary-500 bg-secondary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiUser className="mx-auto mb-2 text-2xl" />
          <div className="font-medium">I'm a Worker</div>
        </button>

        <button
          type="button"
          onClick={() => setRole('employer')}
          className={`p-4 border-2 rounded-lg transition ${
            role === 'employer'
              ? 'border-secondary-500 bg-secondary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiBriefcase className="mx-auto mb-2 text-2xl" />
          <div className="font-medium">I'm an Employer</div>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">Full Name</label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              className="input pl-12"
              placeholder="Your full name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email Address</label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="input pl-12"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number</label>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number',
                },
              })}
              className="input pl-12"
              placeholder="9876543210"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Employer-specific fields */}
        {role === 'employer' && (
          <>
            <div>
              <label className="label">Company Name</label>
              <input
                type="text"
                {...register('companyName', {
                  required: role === 'employer' ? 'Company name is required' : false,
                })}
                className="input"
                placeholder="Your company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label className="label">Company Type</label>
              <select
                {...register('companyType', {
                  required: role === 'employer' ? 'Company type is required' : false,
                })}
                className="input"
              >
                <option value="">Select company type</option>
                <option value="individual">Individual</option>
                <option value="company">Company</option>
                <option value="contractor">Contractor</option>
                <option value="agency">Agency</option>
              </select>
              {errors.companyType && (
                <p className="text-red-500 text-sm mt-1">{errors.companyType.message}</p>
              )}
            </div>
          </>
        )}

        {/* Worker-specific fields */}
        {role === 'worker' && (
          <div>
            <label className="label">Profession</label>
            <input
              type="text"
              {...register('profession', {
                required: role === 'worker' ? 'Profession is required' : false,
              })}
              className="input"
              placeholder="e.g., Electrician, Plumber, Carpenter"
            />
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>
            )}
          </div>
        )}

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="input pl-12"
              placeholder="Create a password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label">Confirm Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              className="input pl-12"
              placeholder="Confirm your password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register('terms', {
              required: 'You must accept the terms and conditions',
            })}
            className="mt-1"
          />
          <label className="text-sm text-gray-600">
            I agree to the{' '}
            <Link to="/terms" className="text-secondary-500 hover:underline">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-secondary-500 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? (
            <div className="spinner border-white"></div>
          ) : (
            <>
              Create Account
              <FiArrowRight />
            </>
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-secondary-500 hover:text-secondary-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Back to Home */}
      <div className="mt-4 text-center">
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Signup;
