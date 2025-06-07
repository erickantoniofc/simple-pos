export  const formatNrc = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 7); // 6 + 1
  if (digits.length <= 6) return digits;
  return `${digits.slice(0, 6)}-${digits.slice(6)}`;
};