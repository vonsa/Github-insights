import { Observable, OperatorFunction, pipe, UnaryFunction } from 'rxjs'
import { filter, takeWhile } from 'rxjs/operators'

export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(filter((x) => x != null) as OperatorFunction<T | null | undefined, T>)
}

export function filterNullishWithCallback<T>(
  filterCallback: <A>(value: A, index: number) => boolean,
): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(filter(filterCallback) as OperatorFunction<T | null | undefined, T>)
}

export function takeWhileNotNullish<T>(): UnaryFunction<
  Observable<T | null | undefined>,
  Observable<T>
> {
  return pipe(
    takeWhile((...args) =>
      args.every((arg) => arg !== null && arg !== undefined),
    ) as OperatorFunction<T | null | undefined, T>,
  )
}

export function inputIsNotNullOrUndefined<T>(input: null | undefined | T): input is T {
  return input !== null && input !== undefined
}
