import { Vec } from "./api";

export const setC2 =
    (out: Vec, x: number, y: number) => (
        out[0] = x,
        out[1] = y,
        out
    );

export const setC3 =
    (out: Vec, x: number, y: number, z: number) => (
        out[0] = x,
        out[1] = y,
        out[2] = z,
        out
    );

export const setC4 =
    (out: Vec, x: number, y: number, z: number, w: number) => (
        out[0] = x,
        out[1] = y,
        out[2] = z,
        out[3] = w,
        out
    );

export const setC =
    (out: Vec, ...xs: number[]) => {
        for (let i = 0, n = xs.length; i < n; i++) {
            out[i] = xs[i];
        }
        return out;
    };