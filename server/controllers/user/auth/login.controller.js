import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from "../../../repos/user.repo.js"
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        
        console.log(`login for user ${user.name} and token=${token}`);
        return res.status(200).json({
            status:"success",
            jwt:token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}