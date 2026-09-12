export type CaptchaResult = "verified" | "invalid" | "unavailable";
export async function verifyRecaptcha(
  token: string,
  secret: string | undefined,
  hostname: string,
  request: typeof fetch = fetch,
): Promise<CaptchaResult> {
  if (!secret) return "unavailable";
  if (!token || token.length > 4096) return "invalid";
  try {
    const response = await request(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      },
    );
    if (!response.ok) return "unavailable";
    const result = await response.json();
    if (
      result["error-codes"]?.some((code: string) =>
        ["invalid-input-secret", "missing-input-secret"].includes(code),
      )
    )
      return "unavailable";
    // Google enforces single use and token expiry. challenge_ts is the challenge
    // load time, so do not reject users who spent time completing a long form.
    return result.success === true && result.hostname === hostname
      ? "verified"
      : "invalid";
  } catch {
    return "unavailable";
  }
}
