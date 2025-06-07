export const formatDui = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 9); // máx. 9 dígitos (8 + 1)
  if (digits.length <= 8) return digits;
  return `${digits.slice(0, 8)}-${digits.slice(8)}`;
};