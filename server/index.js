import express from 'express';
import { prisma } from './lib/db.js';

const app = express();
app.use(express.json());
app.get('/', (req, res)=>{
    res.send("hello world");
});

app.post('/', async (req, res) => {
    const {name, email, password} = req.body;
    const newuser = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    });
    res.status(200).json({
        msg:"user created",
        user:newuser
    })
})
app.listen(3000, ()=>{
    console.log("sever started at 3000");
});