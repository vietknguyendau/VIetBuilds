export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const isDev = process.env.NODE_ENV === "development";

/** True for absolute http(s) URLs we are willing to render as outbound links. */
export function isPublicUrl(url: string | undefined): url is string {
  return !!url && /^https?:\/\//.test(url);
}
