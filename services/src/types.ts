export type Finding = { code: string; severity: 'error' | 'warning' | 'info'; message: string; location?: string };
export type ActionResult<T = unknown> = { status: 'ok'; data: T } | { status: 'error'; error: { code: string; message: string } };
