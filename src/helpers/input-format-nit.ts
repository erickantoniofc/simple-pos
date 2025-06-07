  export const formatNit = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14); // 4 + 6 + 3 + 1 = 14
  let formatted = "";

  if (digits.length > 0) formatted += digits.slice(0, 4);
  if (digits.length > 4) formatted += `-${digits.slice(4, 10)}`;
  if (digits.length > 10) formatted += `-${digits.slice(10, 13)}`;
  if (digits.length > 13) formatted += `-${digits.slice(13, 14)}`;

  return formatted;
 };
