// 格式错误 (FORMAT_INVALID)
// 数据已存在 (DATA_EXISTED)
// 数据无效 (DATA_INVALID)
// 授权错误 (AUTHORIZATION_FAILURE)
// 权限不足 (PERMISSION_DENIED)
// 资源不存在 (NOT_FOUND)
const ERROR = {
  FORMAT_INVALID: 'FORMAT_INVALID',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  DATA_EXISTED: 'DATA_EXISTED',
  DATA_INVALID: 'DATA_INVALID',
  AUTHORIZATION_FAILURE: 'AUTHORIZATION_FAILURE',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOT_FOUND: 'NOT_FOUND'
}
const ERROR_MAP = {
  FORMAT_INVALID: {
    code: 1,
    description: 'The request format is invalid'
  },
  DATA_EXISTED: {
    code: 3,
    description: 'The data has exist in database'
  },
  DATA_INVALID: {
    code: 4,
    description: 'The data is invalid'
  },
  AUTHORIZATION_FAILURE: {
    code: 5,
    description: 'Logon status invalid'
  },
  PERMISSION_DENIED: {
    code: 6,
    description: 'You have no permission to operate'
  },
  NOT_FOUND: {
    code: 7,
    description: 'This resource does not exist'
  }
}

class HttpError extends Error {
  constructor(type, message) {
    super()
    Error.captureStackTrace(this, this.constructor)

    let error = ERROR_MAP[type]
    if (!error) {
      error = {
        success: false,
        code: 500,
        description: 'Internal Server Error'
      }
    }

    this.type = error.code !== 500 ? type : 'UNDEFINED'
    this.success = false
    this.code = error.code
    this.description = error.description
    this.message = message
  }
}

class ParameterError extends HttpError {
  constructor(message = 'Parameter error'){
    super(ERROR.FORMAT_INVALID, message)
  }
}
class AuthorizationError extends HttpError {
  constructor(message = 'Authorization error'){
    super(ERROR.AUTHORIZATION_FAILURE, message)
  }
}
class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden error'){
    super(ERROR.PERMISSION_DENIED, message)
  }
}
class NotFoundError extends HttpError {
  constructor(message = '404 Not Found') {
    super(ERROR.NOT_FOUND, message)
  }
}

const createHttpError = message => new HttpError(null, message)
const createParameterError = message => new ParameterError(message)
const createAuthorizationError = message => new AuthorizationError(message)
const createForbiddenError = message => new ForbiddenError(message)
const createNotFoundError = message => new NotFoundError(message)

module.exports = {
  ERROR,
  createHttpError,
  createParameterError,
  createAuthorizationError,
  createForbiddenError,
  createNotFoundError
}
