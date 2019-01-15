import { ReadonlyVec, dist } from "@thi.ng/vectors3";

export const polyArcLength =
    (pts: ReadonlyVec[], num = pts.length, closed = false) => {
        if (num < 2) return 0;
        let res = 0;
        let p = pts[0];
        let q = pts[1];
        for (let i = 1; i < num; p = q, q = pts[++i]) {
            res += dist(p, q);
        }
        return closed ?
            res + dist(p, pts[0]) :
            res;
    };