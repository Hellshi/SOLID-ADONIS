export const badRequest = (error: Error) => {
  return {
    statusCode: 400,
    body: error.message,
  }
}

export const ok = (data: any) => {
  return {
    statusCode: 200,
    body: data,
  }
}

export const internalServerError = (error: Error) => {
  return {
    statusCode: 500,
    body: error.message,
  }
}
