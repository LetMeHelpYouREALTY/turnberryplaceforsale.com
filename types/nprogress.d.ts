/**
 * Minimal shim for `nprogress` which ships no TypeScript types.
 * Only declares the handful of methods actually used in `pages/_app.tsx`.
 */
declare module "nprogress" {
  interface NProgressStatic {
    configure: (options: { showSpinner?: boolean }) => NProgressStatic
    start: () => NProgressStatic
    done: () => NProgressStatic
    set: (n: number) => NProgressStatic
    inc: (amount?: number) => NProgressStatic
    remove: () => void
  }
  const NProgress: NProgressStatic
  export default NProgress
}
