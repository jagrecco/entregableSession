function auth(req, res, next) {
    if (req.session.user == "pepe") return next();
    return res.status(401).send("error de autorización");
}

module.export = auth;