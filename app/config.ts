export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Next.js App",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: process.env.NEXT_PUBLIC_SITE_LOCALE || "ru-RU",
  isIndexable:
    process.env.NODE_ENV === "production" &&
    process.env.SITE_NOINDEX === "false" &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.VERCEL_ENV !== "development",
};
