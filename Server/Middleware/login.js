const jwt = require('jsonwebtoken');
const z = require('zod');
const JWT_Secret_Key = "1234";

const registerSchema = z.object({
    name : z.string(),
    //email : z.string().email(),
    phoneNumber : z.number().gte(10),
    password : z.string().min(8),
})

const register =async (req,res,next)=>{
    const details = req.body;

    const validate = registerSchema.safeParse(details);
    if(!validate.success){
        return res.status(403).json({msg : "invalid credentials!"});
    }
    next();
}
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.autorization;
    
    if(!authHeader ||!authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg:"invalid token"})
    }

    const token = authHeader.split(' ')[1];

    try{
        const verified = jwt.verify(token,JWT_Secret_Key);

        const decoded = jwt.decode(token);

        //set req parameter if required
        next();
    }
    catch(err){
        return res.status(403).json({msg : "Unauthorized login!"});
    }
};

module.exports= { 
authMiddleware,
register
};