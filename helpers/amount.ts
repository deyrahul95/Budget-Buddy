export function sanitizeAmount(input: string): string {
  // Remove everything except digits and dot
  let value = input.replace(/[^0-9.]/g, "");

  // Prevent multiple dots
  const parts = value.split(".");
  if (parts.length > 2) {
    value = `${parts[0]}.${parts.slice(1).join("")}`;
  }

  return value;
}

export function isValidAmount(value: string): boolean {
  const num = Number(value);
  return !isNaN(num) && num > 0;
}
