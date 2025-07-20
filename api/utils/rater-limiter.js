import rateLimit from "express-rate-limit";

const limiter=rateLimit({
    windowMs:1000*60,
    max:10,
})

export default limiter;