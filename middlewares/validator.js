export const validator = (schema) => [
    (req, res, next) => {
        console.log('Request Body Data:', req.body);
        const validation = schema.validate(req.body, { abortEarly: false });

        if (validation.error) {
            console.error('Validation Error:', validation.error);
            return res.status(400).json({
                success: false,
                message: validation.error.details.map(error => error.message)
            });
        }
        return next();
    }
];
