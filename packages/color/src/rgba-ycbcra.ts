import { setC3 } from "@thi.ng/vectors3";
import { Color, ReadonlyColor } from "./api";
import { clamp } from "./clamp";
import { luminanceRGB } from "./luminance";

export const rgbaYcbcra =
    (out: Color, src: ReadonlyColor) => {
        out = clamp(out || src, src);
        const y = luminanceRGB(src);
        return setC3(
            out,
            y,
            (src[2] - y) * 0.565,
            (src[0] - y) * 0.713
        );
    };