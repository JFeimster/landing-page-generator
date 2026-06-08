export type ActionResult<T = unknown> = {
  status: 'ok' | 'error' | 'placeholder';
  data?: T;
  error?: string;
};
