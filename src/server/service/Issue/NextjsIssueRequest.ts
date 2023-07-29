import IssueRequest from "@/server/service/Issue/IssueRequest";
import { NextApiRequest } from "next";

import { IssueFormValues } from "@/lib/types";

export function createIssueRequestWithKey(
  req: NextApiRequest,
  key: string
): IssueRequest {
  const issueRequest = createIssueRequest(req);
  issueRequest.key = key;
  return issueRequest;
}

export default function createIssueRequest(req: NextApiRequest): IssueRequest {
  const form: IssueFormValues = {
    title: req.body.title,
    description: req.body.description,
    status: toNumber(req.body.status),
    priority: toNumber(req.body.priority),
  };
  const newRequest = new IssueRequest(form);

  if (req.body.order) {
    newRequest.order = req.body.order;
  }

  return newRequest;
}

/**
 * Converts a string to a number. If the string is not a number, returns undefined.
 * Prevents NaN values to exist within the issue request to preserve known values.
 * @param {string} value string to convert
 * @returns {number | undefined} number or undefined
 */
function toNumber(value: string): number | undefined {
  const numberedValue: number = Number(value);
  if (Number.isNaN(numberedValue)) {
    return undefined;
  }
  return numberedValue;
}
