const restrict = (req, res, next) => {
    console.log(req.session)
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Please Log In'})
    }
}

module.exports = {
    restrict,
}