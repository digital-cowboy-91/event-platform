type TError = { success: false };
type TSuccess<T> = { success: true } & Awaited<T>;

const signalError = () => {
  throw {
    success: false,
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
