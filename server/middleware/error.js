const error = (err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
};

export default error;
