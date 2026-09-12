import { createHmac, timingSafeEqual } from "node:crypto";
function secret() {
  const value = process.env.TOKEN_SECRET;
  if (!value || value.length < 32)
    throw new Error("Token signing is not configured");
  return value;
}
export function signToken(id: string, purpose: string, seconds = 86400) {
  const data = Buffer.from(
    JSON.stringify({
      id,
      purpose,
      exp: Math.floor(Date.now() / 1000) + seconds,
    }),
  ).toString("base64url");
  return `${data}.${createHmac("sha256", secret()).update(data).digest("base64url")}`;
}
export function verifyToken(token: string, purpose: string): string | null {
  try {
    if (token.length > 1024) return null;
    const [data, sig] = token.split(".");
    const expected = createHmac("sha256", secret()).update(data).digest();
    const supplied = Buffer.from(sig, "base64url");
    if (
      expected.length !== supplied.length ||
      !timingSafeEqual(expected, supplied)
    )
      return null;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString());
    if (
      payload.purpose !== purpose ||
      typeof payload.id !== "string" ||
      payload.exp <= Date.now() / 1000
    )
      return null;
    return payload.id;
  } catch {
    return null;
  }
}
