import { getUserById } from "../../repos/user.repo.js"

export async function getProfile(req, res){
    try{
        const { id } = req.user;
        const user = await getUserById(id);

        console.log("getting user profile");
        return res.status(200).json({
            status:"success",
            id:user.id,
            name:user.name,
            email:user.email,
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            status:"failed",
            message:"Internal server error"
        });
    }
}