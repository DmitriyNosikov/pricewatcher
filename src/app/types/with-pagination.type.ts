export type WithPaginationType<T> = {
  data: T[] | null,
  limit: number,
  page: number,
  totalPages: number,
  totalItems: number;
}