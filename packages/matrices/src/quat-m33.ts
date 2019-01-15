import { ReadonlyVec, setC, Vec } from "@thi.ng/vectors3";

export const quatToMat33 =
    (out: Vec, q: ReadonlyVec) => {
        const [x, y, z, w] = q;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        return setC(
            out || [],
            1 - yy - zz, xy + wz, xz - wy,
            xy - wz, 1 - xx - zz, yz + wx,
            xz + wy, yz - wx, 1 - xx - yy
        );
    };