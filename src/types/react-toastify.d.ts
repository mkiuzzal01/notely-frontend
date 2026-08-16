declare module "react-toastify" {
    export const toast: {
        success: (msg: any) => void;
        error: (msg: any) => void;
        info: (msg: any) => void;
        warn: (msg: any) => void;
    };
}
