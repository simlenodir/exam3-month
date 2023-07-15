import http from "http"

export default (err, req, res, next) => {
    if (process.env.NODE_ENV == 'development') {
       return res.status(err.status).json({
            message: err.message,
            status: err.status
        })
    }

    if (process.env.NODE_ENV == 'production') {
       return res.status(err.status).json({
            message: http.STATUS_CODES[err.status],
            status: err.status
        })
    }
}