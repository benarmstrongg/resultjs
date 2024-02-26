import { Result as R, ResultErr, ResultOk } from './types';

export type Result<T = any> = R<T>;
export const Result = {
    Ok: <T>(data: T): ResultOk<T> => ({ data, error: null }),
    Err: (error: Error | string): ResultErr => ({
        data: null,
        error,
    }),
};
