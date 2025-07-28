import * as Yup from 'yup';

// Most used single validation for reusable
const nameValidation = Yup.string().min(5).max(20).required('Name is required');

const emailValidation = Yup.string()
  .email('Invalid email format')
  .required('Email is required');

const userMessageValidation = Yup.string()
  .min(20, 'Message must be at least 20 characters')
  .max(500, 'Message must be less than 500 characters')
  .required('Message is required');

const usernameValidation = Yup.string()
  .min(4, 'Username must be at least 4 characters')
  .max(20, 'Username must be less than 20 characters')
  .matches(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores'
  )
  .required('Username is required');

const passwordValidation = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

// Login form schema validation
export const loginSchema = Yup.object({
  emailOrUsername: Yup.string()
    .required('This field is required')
    .test('email-or-username', 'Must be a valid email or username', (value) => {
      return (
        emailValidation.isValidSync(value) ||
        usernameValidation.isValidSync(value)
      );
    }),
  password: passwordValidation,
});

// Login form schema validation
export const signupSchema = Yup.object({
  username: usernameValidation,
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});
// Forgot password schema validation
export const forgotPasswordSchema = Yup.object({
  email: emailValidation,
});
// Reset password schema validation
export const resetPasswordSchema = Yup.object({
  password: passwordValidation,
  confirm_password: Yup.string()
    .required('Please confirm your password')
    .min(6, 'Password must be at least 6 characters')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

// Contact form schema validation
export const contactFormSchema = Yup.object({
  name: nameValidation,
  email: emailValidation,
  message: userMessageValidation,
})
