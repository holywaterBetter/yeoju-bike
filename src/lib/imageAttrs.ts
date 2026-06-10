export const eagerImageAttrs = {
  decoding: "async",
} as const;

export const lazyImageAttrs = {
  loading: "lazy",
  decoding: "async",
} as const;

export const asyncImageAttrs = {
  decoding: "async",
} as const;
