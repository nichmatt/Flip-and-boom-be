const errorHandler = (err, req, res, next) => {

    let message = '';
    let statusCode = 500;

    console.log(err.name);
    console.log(err)

    switch(err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            message = err.errors[0].message
            statusCode = 400;
            break;
        case 'Wrong password':
        case 'Invalid Email/Password':
        case "Login First":
            message = err.name;
            statusCode = 400;
            break;
        default:
            message = 'Internal server error'
    }

    res.status(statusCode).json({message})
};

module.exports = { errorHandler };
