export type ResultOk<T> = { data: T; error: null };
export type ResultErr = { data: null; error: Error | string };
export type Result<T = any> = ResultErr | ResultOk<T>;
