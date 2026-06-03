/** Khớp CMS — `headers` chứa "1" thì dòng được in đậm. */
export const SERVICE_DESCRIPTION_BOLD_HEADER = "1";

export const isServiceDescriptionBold = (headers?: string[] | null): boolean =>
  headers?.includes(SERVICE_DESCRIPTION_BOLD_HEADER) ?? false;
