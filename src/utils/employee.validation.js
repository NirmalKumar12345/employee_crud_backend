export const CreateEmployeeValidationSchema = {
    userName: {
        notEmpty: {
            errorMessage: "User name must not be empty",
            bail: true
        },
        isString: {
            errorMessage: "User name must be string"
        },
        trim: true
    },
    
    age: {
        notEmpty: {
            errorMessage: "Age must not empty",
            bail: true
        },
        isInt: {
            options: { min: 18 },
            errorMessage: "Age must be a number"
        },
        trim: true
    },

    position: {
        notEmpty: {
            errorMessage: "Position must not be empty",
            bail: true,
        },
        isString: {
            errorMessage: "Position must be a string",
        },
        trim: true,
    },

    company: {
        notEmpty: {
            errorMessage: "Company must not be empty",
            bail: true,
        },
        isString: {
            errorMessage: "Company must be a string",
        },
        trim: true,
    },

    salary: {
        notEmpty: {
            errorMessage: "Salary must not be empty",
            bail: true,
        },
        isInt: {
            options: { min: 0 },
            errorMessage: "Salary must be a positive number",
        },
    },
};