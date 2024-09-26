export const Messages = {
    USER: {
        USER_CREATED: 'User created successfully.',
        USER_NOT_FOUND: 'User not found.',
        USER_ALREADY_EXISTS: 'User already exists with this username.',
        PROFILE_UPDATED: 'User profile updated successfully.',
        PASSWORD_CHANGED: 'Password changed successfully.',
        PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
        PASSWORD_RESET_FAILED: 'Password reset failed.',
        USER_FETCHED: 'User fetched successfully. '
    },

    ROLE: {
      NOT_FOUND: 'Role not found.',
    },

    AUTH: {
      LOGIN_SUCCESS: 'Login successful.',
      LOGIN_FAILED: 'Invalid credentials, please try again.',
      UNAUTHORIZED: 'You are not authorized to access this resource.',
      TOKEN_MISSING: 'Authentication token is missing.',
      TOKEN_INVALID: 'Authentication token is invalid or expired.',
      LOGOUT_SUCCESS: 'Logout successful.',
    },
  
    VALIDATION: {
      INVALID_INPUT: 'Invalid input provided.',
      EMAIL_REQUIRED: 'Email is required.',
      PASSWORD_REQUIRED: 'Password is required.',
      NAME_REQUIRED: 'Name is required.',
      PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    },
  
    DATABASE: {
      CONNECTION_FAILED: 'Failed to connect to the database.',
      QUERY_FAILED: 'Database query failed.',
      UPDATE_FAILED: 'Failed to update the record.',
      DELETE_FAILED: 'Failed to delete the record.',
    },
  
    GENERIC: {
      INTERNAL_SERVER_ERROR: 'An internal server error occurred. Please try again later.',
      SUCCESS: 'Operation completed successfully.',
      NOT_FOUND: 'Resource not found.',
      BAD_REQUEST: 'The request could not be understood or was missing required parameters.',
    },
  
    API: {
      RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later.',
      INVALID_ENDPOINT: 'The requested API endpoint does not exist.',
      METHOD_NOT_ALLOWED: 'HTTP method not allowed on this endpoint.',
    },
  
    PERMISSION: {
      ACCESS_DENIED: 'Access denied. You do not have sufficient permissions.',
      ROLE_NOT_FOUND: 'The specified role does not exist.',
    },
  
    SESSION: {
      SESSION_EXPIRED: 'Your session has expired. Please log in again.',
      SESSION_ACTIVE: 'Session is still active.',
    },
};
  