declare module "react-toastify" {
    export const toast: {
        success: (msg: unknown) => void;
        error: (msg: unknown) => void;
        info: (msg: unknown) => void;
        warn: (msg: unknown) => void;
    };
}
