import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

type AsyncController<
  Params = ParamsDictionary,
  ResponseBody = unknown,
  RequestBody = unknown,
  RequestQuery = ParsedQs,
> = (
  request: Request<
    Params,
    ResponseBody,
    RequestBody,
    RequestQuery
  >,
  response: Response<ResponseBody>,
  next: NextFunction,
) => Promise<void>;

export const asyncHandler = <
  Params = ParamsDictionary,
  ResponseBody = unknown,
  RequestBody = unknown,
  RequestQuery = ParsedQs,
>(
  controller: AsyncController<
    Params,
    ResponseBody,
    RequestBody,
    RequestQuery
  >,
): RequestHandler<
  Params,
  ResponseBody,
  RequestBody,
  RequestQuery
> => {
  return (request, response, next): void => {
    void controller(request, response, next).catch(next);
  };
};