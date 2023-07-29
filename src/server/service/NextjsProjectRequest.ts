import "server-only";
import { NextApiRequest } from "next";
import ProjectRequest from "./ProjectRequest";
import AppError from "@/server/service/AppError";
import { INVALID_DATA_TYPES } from "@/lib/client-data/errors";

export default class NextjsProjectRequest extends ProjectRequest {
  public constructor(req: NextApiRequest) {
    super();
    this.name = req.body.name;
    this.description = req.body.description;
    this.key = req.body.key;
  }

  public isValidRequest(): boolean {
    return this.isValidName() && this.isValidKey();
  }

  private isValidName(): boolean {
    if (this.name === undefined || this.name.length == 0) {
      throw new AppError(INVALID_DATA_TYPES, "Project name is required");
    }
    return true;
  }

  private isValidKey(): boolean {
    if (this.key === undefined || this.key.length == 0) {
      throw new AppError(INVALID_DATA_TYPES, "Project key is required");
    }

    if (this.key.length > 4) {
      throw new AppError(
        INVALID_DATA_TYPES,
        "Project key must be 4 characters or less"
      );
    }
    return true;
  }
}
