import jwt from 'jsonwebtoken';

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ msg: 'Token not found' });
	}

	const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: payload.userId,
        };
        return next();
    }
    catch(error){
        return res.status(401).json({ msg: 'Not authorized to access this route' });
    }
};

export default authenticationMiddleware;