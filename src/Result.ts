import type { Ok, Err } from "@/types";

export function Ok<T>(val: T): Ok<T>{
    return {ok: true, value: val};
}

export function Err<E>(err: E): Err<E> {
    return {ok: false, error: err};
}