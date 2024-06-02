import { setupWorker } from "msw/browser";
import { requestHandlers } from "./requestHandlers";

export const worker = setupWorker(...requestHandlers);
