import express from 'express';
import { prisma } from './lib/db.js';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import resumeRouter from './routes/resume.routes.js'

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/resume', resumeRouter);


app.get('/', (req, res)=>{
    res.json({
        status:"Success!",
        message:"welcome to job-recon server"
    })
});

app.listen(port, ()=>{
    console.log(`server started at ${port}`);
});