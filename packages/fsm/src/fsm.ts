import { IObjectOf } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import {
    ensureReduced,
    isReduced,
    reduced,
    unreduced
} from "@thi.ng/transducers/reduced";
import { Match, Matcher } from "./api";

/**
 * Finite-state machine transducer w/ support for single lookahead
 * value. Takes an object of `states` and their matchers, an arbitrary
 * context object and an `initial` state ID.
 *
 * The returned transducer consumes inputs of type `T` and produces
 * results of type `R`. The results are produced by callbacks of the
 * given state matchers. Each can produce any number of values. If a
 * callback returns a result wrapped w/ `reduced()`, the FSM causes
 * early termination of the overall transducer pipeline.
 *
 * @param states
 * @param ctx
 * @param initialState
 */
export const fsm = <T, C, R>(
    states: IObjectOf<Matcher<T, C, R>>,
    ctx: C,
    initialState: string | number = "start"
): Transducer<T, R> =>
    ([init, complete, reduce]: Reducer<any, R>) => {
        let currID = initialState;
        let curr = states[initialState] ?
            states[initialState]() :
            illegalArgs(`invalid initial state: ${initialState}`);
        return [
            init,
            complete,
            (acc, x) => {
                while (true) {
                    const { type, body } = curr(ctx, x);
                    if (type >= Match.FULL) {
                        const next = body && states[body[0]];
                        if (next) {
                            currID = body[0];
                            curr = next();
                        } else {
                            illegalState(`unknown tx: ${currID} -> ${body && body[0]}`);
                        }
                        const res = body[1];
                        if (res) {
                            for (let y of unreduced(res)) {
                                acc = reduce(acc, y);
                                if (isReduced(acc)) {
                                    break;
                                }
                            }
                            isReduced(res) && (acc = ensureReduced(acc));
                        }
                        if (type === Match.FULL_NC && !isReduced(acc)) {
                            continue;
                        }
                    } else if (type === Match.FAIL) {
                        return reduced(acc);
                    }
                    break;
                }
                return acc;
            }
        ];
    };
