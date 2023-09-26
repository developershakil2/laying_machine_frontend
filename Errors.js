



const errorHandler = (err, req, res, next)=>{
                const statusCode = err.statusCode || 500;
                const status = err.status || 'error something went wrong';

                res.status(statusCode).json({
                    status,
                    message:err.message
                })
}


module.exports = errorHandler;