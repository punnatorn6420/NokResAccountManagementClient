export interface IApiResponse<T> {
  status: string;
  data: T;
  correlationId?: string;
}
