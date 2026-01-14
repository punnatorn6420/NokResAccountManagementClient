export interface IResponse<T> {
  correlationId: string;
  status: string;
  data: T;
}

export interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
