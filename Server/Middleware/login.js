const jwt = require('jsonwebtoken');
const z = require('zod');
const dotenv =require('dotenv');
dotenv.config();

const registerSchema = z.object({
    username : z.string(),
    phoneNumber : z.number().gte(10),
    password : z.string().min(8),
    gender : z.enum(["Male" , "Female"])
})

const signInSchema = z.object({
    username: z.string(),
    password: z.string().length(8)
});

const signIn = (req,res,next)=>{

    const details = req.body;
    const validate = signInSchema.safeParse(details);
    if(!validate.success){
        return res.status(403).json({msg : "invalid credentials!"});
    }
    next();
}

const register = async (req,res,next)=>{
    const details = req.body;

    const validate = registerSchema.safeParse(details);
    if(!validate.success){
        return res.status(403).json({msg : "invalid credentials!"});
    }
    next();
}
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader ||!authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg:"invalid token"})
    }

    const token = authHeader.split(' ')[1];

    try{
        const verified = jwt.verify(token, "hello@123");
        const decoded = jwt.decode(token);
        req.user = decoded.userId; 
        //set req parameter if required
        next();
    }
    catch(err){
        console.error("Error autorizing: ", err);
        return res.status(403).json({msg : "Unauthorized login!"});
    }
};

module.exports= { 
authMiddleware,
register,
signIn
};