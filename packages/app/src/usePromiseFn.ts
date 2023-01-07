import { useCallback, useEffect, useRef, useState } from "react";

type UsePromiseState<TValue> =
  | { type: "idle"; value: TValue | undefined }
  | { type: "pending"; value: TValue | undefined }
  | { type: "fulfilled"; value: TValue }
  | { type: "rejected"; error: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFunction = (...args: any[]) => PromiseLike<any>;

export type UsePromiseOptions = {
  enabled?: boolean;
};

export const usePromiseFn = <TFunc extends AsyncFunction>(
  createPromise: TFunc,
  options: UsePromiseOptions = {}
): [
  UsePromiseState<Awaited<ReturnType<TFunc>>>,
  ((...args: Parameters<TFunc>) => ReturnType<TFunc>) | null
] => {
  const enabled = options.enabled ?? true;

  const mounted = useRef(false);
  const lastPromiseId = useRef(0);
  const [state, setState] = useState<
    UsePromiseState<Awaited<ReturnType<TFunc>>>
  >({
    type: "idle",
    value: undefined,
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled && state.type !== "idle") {
      lastPromiseId.current++;
      setState({
        type: "idle",
        value: undefined,
      });
    }
  }, [enabled, state.type]);

  const createAndResolvePromise = useCallback(
    (...args: Parameters<TFunc>) => {
      if (!mounted.current) {
        throw new Error(
          "usePromiseFn: tried to create promise while not mounted"
        );
      }

      setState({
        type: "pending",
        value: undefined,
      });
      const promiseId = ++lastPromiseId.current;
      const promise = createPromise(...args) as ReturnType<TFunc>;
      promise.then(
        (value) =>
          mounted.current &&
          promiseId === lastPromiseId.current &&
          setState({ type: "fulfilled", value }),
        (error) =>
          mounted.current &&
          promiseId === lastPromiseId.current &&
          setState({ type: "rejected", error })
      );
      return promise;
    },
    [createPromise]
  );

  return [state, enabled ? createAndResolvePromise : null];
};
