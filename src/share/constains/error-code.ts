export interface ErrorCode {
  readonly code: string;
  readonly msg: string;
  readonly status: number;
}
export const ErrorCodes = {
  OK: { code: 'OK', status: 200, msg: 'Successfully' },
  BAD_REQUEST: { code: 'BAD_REQUEST', status: 400, msg: 'Bad request' },
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: 401, msg: 'Unauthorized' },
  FORBIDDEN: { code: 'FORBIDDEN', status: 403, msg: 'Forbidden'},
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', status: 500, msg: 'Internal server error'},
  LOGIN_INVALID: { code: 'LOGIN_INVALID', status: 401, msg: 'Invalid Login Credential. The information you entered is incorrect.' },
  INVALID_SIGNATURE: { code: 'INVALID_SIGNATURE', status: 400, msg: 'Invalid signature' },
};
