import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from "../../../repos/user.repo.js";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({
            name,
            email,
            password: hashedPassword
        });
        
        console.log(`signup for user ${user.name} with email ${user.email}`);
        return res.status(201).json({
            status:"success",
            message: "User created",
            userId: user.id
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}