export const isAuthenticated = (req, res, next) => {
	if (!req?.session?.user) {
		return res.status(401).json({ msg: 'unauthorized' });
	} else {
		res.user = req.session.user;
		next();
	}
};
