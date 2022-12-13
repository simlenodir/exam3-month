export class ErrorHandler extends Error {
    constructor(message, status=500) {
        super()
        this.message = message,
        this.status = status
    }
}