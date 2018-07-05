exports.handleError = (res, reason, message, code) => {
    console.error(`Error occured -> ${reason}`)
    res
        .status(code || 500)
        .send({
            success: false,
            message
        })
}