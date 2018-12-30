import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { dot4 } from "@thi.ng/vectors3/dot";
import { maddN4 } from "@thi.ng/vectors3/maddn";
import { mulN4 } from "@thi.ng/vectors3/muln";
import { set4 } from "@thi.ng/vectors3/set";

export const mixQ =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, t: number, eps = 1e-3) => {
        const d = dot4(a, b);
        if (Math.abs(d) < 1.0) {
            const theta = Math.acos(d);
            const stheta = Math.sqrt(1 - d * d);
            let u: number, v: number;
            if (Math.abs(stheta) < eps) {
                u = v = 0.5;
            } else {
                u = Math.sin(theta * (1 - t)) / stheta;
                v = Math.sin(theta * t) / stheta;
            }
            return maddN4(null, mulN4(out, a, u), b, v);
        }
        return a !== out ? set4(out, a) : out;
    };