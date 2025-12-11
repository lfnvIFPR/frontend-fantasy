import type { Ok, Err, Result } from "@/types";

export function Ok<T>(val: T): Ok<T>{
    return {ok: true, value: val};
}

export function Err<E>(err: E): Err<E> {
    return {ok: false, error: err};
}

export function unwrap<T, E>(result: Result<T, E>): T {
    if (!result.ok) throw new Error(String(result.error));
    return result.value;
}