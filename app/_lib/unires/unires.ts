type TError = { success: false; error: object };
type TSuccess<T> = { success: true } & Awaited<T>;

const signalError = (error: object) => {
  throw {
    success: false,
    error,
  };
};

type TSignalError = typeof signalError;
type TCallback<T> = (signalError: TSignalError) => T;

const unires = async <T>(cb: TCallback<T>): Promise<TError | TSuccess<T>> => {
  try {
    return {
      success: true,
      ...(await cb(signalError)),
    };
  } catch (err) {
    if (Object.prototype.hasOwnProperty.call(err, "success")) {
      return err as TError;
    }
    return Promise.reject(err);
  }
};

export default unires;
