export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFields(values, required) {
  const errors = {};
  for (const name of required) {
    if (!String(values[name] || "").trim())
      errors[name] = "This field is required.";
  }
  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export async function submitForm(url, body, multipart = false) {
  const response = await fetch(url, {
    method: "POST",
    ...(multipart ? {} : { headers: { "Content-Type": "application/json" } }),
    body: multipart ? body : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

export function safeAssetUrl(url) {
  // Uploaded resources must be same-origin paths or HTTP(S), never executable URLs.
  if (typeof url !== "string") return undefined;
  if (/^\/(?!\/)/.test(url) || /^https?:\/\//i.test(url)) return url;
  return undefined;
}
