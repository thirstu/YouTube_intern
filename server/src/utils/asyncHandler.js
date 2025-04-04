const asyncHandler=(fn)=>async(req,res,next)=>{  
    try {
       await fn(req,res,next);
    } catch (err) {
        console.error(err);
        res.status(err.code||500).json({
            success:false,
            message:err.message
        })
        next(err);
        
    }
  }



export {asyncHandler}