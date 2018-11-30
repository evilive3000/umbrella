import { dotValues4, dotValues6 } from "@thi.ng/vectors3/dot-values";
import { MatOpM, MultiMatOpM } from "./api";
import { setValues23, setValues22, setValues44, setValues33 } from "./set-values";
import { detCoeffs44, det44FromCoeffs } from "./determinant";
import { vop } from "@thi.ng/vectors3/internal/vop";

const dp4 = dotValues4;
const dp6 = dotValues6;

export const invert: MultiMatOpM = vop(1);

export const invert22: MatOpM =
    invert.add(4, (out, m) => {
        const [m00, m01, m10, m11] = m;
        let det = dp4(m00, m11, -m01, m10);
        if (det === 0) return;
        det = 1.0 / det;
        return setValues22(
            out,
            m11 * det,
            -m01 * det,
            -m10 * det,
            m00 * det,
        );
    });

export const invert23: MatOpM =
    invert.add(6, (out, m) => {
        const [m00, m01, m10, m11, m20, m21] = m;
        let det = dp4(m00, m11, -m01, m10);
        if (det === 0) return;
        det = 1.0 / det;
        return setValues23(
            out,
            m11 * det,
            -m01 * det,
            -m10 * det,
            m00 * det,
            dp4(m10, m21, -m11, m20) * det,
            dp4(m01, m20, -m00, m21) * det
        );
    });

export const invert33: MatOpM =
    invert.add(9, (out, m) => {
        const [m00, m01, m02, m10, m11, m12, m20, m21, m22] = m;
        const d01 = dp4(m22, m11, -m12, m21);
        const d11 = dp4(m12, m20, -m22, m10);
        const d21 = dp4(m21, m10, -m11, m20);
        let det = dp6(m00, d01, m01, d11, m02, d21);
        if (det === 0) return;
        det = 1.0 / det;
        return setValues33(
            out,
            d01 * det,
            dp4(-m22, m01, m02, m21) * det,
            dp4(m12, m01, -m02, m11) * det,
            d11 * det,
            dp4(m22, m00, -m02, m20) * det,
            dp4(-m12, m00, m02, m10) * det,
            d21 * det,
            dp4(-m21, m00, m01, m20) * det,
            dp4(m11, m00, -m01, m10) * det,
        );
    });

export const invert44: MatOpM =
    invert.add(16, (out, m) => {
        const coeffs = detCoeffs44(m);
        let det = det44FromCoeffs(coeffs);
        if (det === 0) return;
        det = 1.0 / det;
        const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = m;
        const [d00, d01, d02, d03, d04, d05, d06, d07, d08, d09, d10, d11] = coeffs;
        return setValues44(
            out,
            dp6(m11, d11, -m12, d10, m13, d09) * det,
            dp6(-m01, d11, m02, d10, -m03, d09) * det,
            dp6(m31, d05, - m32, d04, m33, d03) * det,
            dp6(-m21, d05, m22, d04, -m23, d03) * det,
            dp6(-m10, d11, m12, d08, -m13, d07) * det,
            dp6(m00, d11, -m02, d08, m03, d07) * det,
            dp6(-m30, d05, m32, d02, -m33, d01) * det,
            dp6(m20, d05, -m22, d02, m23, d01) * det,
            dp6(m10, d10, -m11, d08, m13, d06) * det,
            dp6(-m00, d10, m01, d08, -m03, d06) * det,
            dp6(m30, d04, -m31, d02, m33, d00) * det,
            dp6(-m20, d04, m21, d02, -m23, d00) * det,
            dp6(-m10, d09, m11, d07, -m12, d06) * det,
            dp6(m00, d09, -m01, d07, m02, d06) * det,
            dp6(-m30, d03, m31, d01, -m32, d00) * det,
            dp6(m20, d03, -m21, d01, m22, d00) * det
        );
    });