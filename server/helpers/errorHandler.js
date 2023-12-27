export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.message === "Database error!") {
        return res.status(500).json({
        error: 'Database Error',
        message: 'An error occurred while interacting with the database.',
});
}

    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
});
};