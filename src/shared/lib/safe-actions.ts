import {createSafeActionClient} from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError: (err: Error) => {
        return err.message || "Unknown error";
    }
})