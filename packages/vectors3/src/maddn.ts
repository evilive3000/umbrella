import { MultiVecOpVVN, VecOpVVN } from "./api";
import { defOp } from "./internal/codegen";

/**
 * Returns `out = a + b * n`.
 */
export const [maddN, maddN2, maddN3, maddN4] =
    defOp<MultiVecOpVVN, VecOpVVN>(
        ([o, a, b]) => `${o}=${a}+${b}*n;`,
        "o,a,b,n"
    );