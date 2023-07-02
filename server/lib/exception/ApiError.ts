export class ApiError extends Error {
    readonly message: string;

    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    public static notFound(message: string) {
        return new ApiError(404, message);
    }

    public static notAcceptable(message: string) {
        return new ApiError(406, message);
    }

    public static unknown() {
        return new ApiError(500, 'Unknown error.');
    }
}
