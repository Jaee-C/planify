import { UNKNOWN_ERROR } from "@/lib/data/errors";

export default class AppError extends Error {
  public readonly code: number;
  public readonly message: string;

  public constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }

  public toJSONString(): string {
    return JSON.stringify({
      code: this.code,
      message: this.message,
    });
  }

  public static generateAppError(
    err: unknown,
    defaultCode: number = UNKNOWN_ERROR
  ): AppError {
    if (err instanceof AppError) {
      return err;
    } else if (err instanceof Error) {
      return new AppError(defaultCode, err.message);
    } else {
      return new AppError(UNKNOWN_ERROR, "Unknown error");
    }
  }
}
