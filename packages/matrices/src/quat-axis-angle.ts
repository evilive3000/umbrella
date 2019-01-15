import { EPS } from "@thi.ng/math";
import { normalize, ReadonlyVec } from "@thi.ng/vectors3";

export const quatFromAxisAngle =
    (axis: ReadonlyVec, theta: number) => {
        theta /= 2;
        return normalize(
            [0, 0, 0, Math.cos(theta)],
            axis,
            Math.sin(theta)
        );
    };

export const quatToAxisAngle =
    (quat: ReadonlyVec) => {
        const n = normalize([], quat);
        const w = n[3];
        const m = Math.sqrt(1 - w * w);
        const theta = 2 * Math.acos(w);
        return m > EPS ?
            [[n[0] / m, n[1] / m, n[2] / m], theta] :
            [[n[0], n[1], n[2]], theta];
    };