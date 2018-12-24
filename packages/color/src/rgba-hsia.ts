import { setC3 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { clamp } from "./clamp";
import { SQRT3, THIRD, TAU } from "@thi.ng/math/api";
import { atan2Abs } from "@thi.ng/math/angle";

// https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma

const SQRT32 = SQRT3 / 2;

export const rgbaHsia =
    (out: Color, rgba: ReadonlyColor) => {
        out = clamp(out || rgba, rgba);
        const r = out[0];
        const g = out[1];
        const b = out[2];
        const i = THIRD * (r + g + b);
        return i < 1e-6 || (r === g && r === b) ?
            setC3(out, 0, 0, i) :
            setC3(
                out,
                atan2Abs(
                    SQRT32 * (g - b),
                    0.5 * (2 * r - g - b)
                ) / TAU,
                1 - Math.min(r, g, b) / i,
                i
            );
    };