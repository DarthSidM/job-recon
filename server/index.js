import express from 'express';
import cors from 'cors';
import { prisma } from './lib/db.js';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import resumeRouter from './routes/resume.routes.js'
import matcherRouter from './routes/matcher.routes.js'
import resumeBuilderRouter from './routes/resume-builder.routes.js'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ].filter(Boolean),
    credentials: true,
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/resume', resumeRouter);
app.use('/api/v1/matcher', matcherRouter);
app.use('/api/v1/builder', resumeBuilderRouter);


app.get('/', (req, res)=>{
    res.json({
        status:"Success!",
        message:"welcome to job-recon server"
    })
});

app.listen(port, ()=>{
    console.log(`server started at ${port}`);
});