export const LoginValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: "Email id must not be empty"
        },
        isEmail: {
            errorMessage: "Invalid email id"
        },
        isString: {
            errorMessage: "Email id must be string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password must not be empty"
        },
        isString: {
            errorMessage: "Password must be string"
        }
    }
}

export const PasswordValidationSchema = {
    newPassword: {
        notEmpty: {
            errorMessage: "New Password must not be empty"
        },
        isString: {
            errorMessage: "New Password must be string"
        }
    }
}

export const SignUpValidationSchema = {
     email: {
        notEmpty: {
            errorMessage: "Email id must not be empty"
        },
        isEmail: {
            errorMessage: "Invalid email id"
        },
        isString: {
            errorMessage: "Email id must be string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password must not be empty"
        },
        isString: {
            errorMessage: "Password must be string"
        }
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: "Confirm Password must not be empty"
        },
        isString: {
            errorMessage: "Confirm Password must be string"
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password and Confirm Password do not match");
                }
                return true;
            }
        }
    }
}

export const GoogleValidationSchema = {
    idToken: {
        notEmpty: {
            errorMessage: "Google ID token is required"
        },
        isString: {
            errorMessage: "Google ID token must be a string"
        }
    }
}