export interface IApiErrorDetail {
  field?: string;
  message: string;
}

export interface IApiErrorResponse {
  status: string;
  correlationId?: string;
  message?: string;
  userMessage?: string;
  errors?: IApiErrorDetail[];
  code?: string;
}

export interface IApiResponse<T> {
  status: string;
  data: T;
  correlationId?: string;
}
