import { StatusCode } from "./status-code";

export interface ErrorCode {
  readonly code: string;
  readonly msg: string;
  readonly status: StatusCode;
}

export const ErrorCode = {
  BAD_REQUEST: { code: 'BAD_REQUEST', statusCode: StatusCode.BadRequest, msg: 'Bad request' },
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: StatusCode.Unauthorized, msg: 'Unauthorized' },
  FORBIDDEN: { code: 'FORBIDDEN', status: StatusCode.Forbidden, msg: 'Forbidden'},
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', status: StatusCode.InternalServer, msg: 'Internal server error'},
  LOGIN_INVALID: { code: 'LOGIN_INVALID', status: StatusCode.Unauthorized, msg: 'Invalid Login Credential. The information you entered is incorrect.' },
  INVALID_SIGNATURE: { code: 'INVALID_SIGNATURE', status: StatusCode.BadRequest, msg: 'Invalid signature' },
};
