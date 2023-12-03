export default function (password: string): boolean {
  if (password.trim().length < 6) return false;

  const containsDigit = (password: string): boolean => {
    const charList = password.split("");

    const filtered = charList.filter((char) => !Number.isNaN(Number(char)));

    return filtered.length > 0;
  };

  if (!containsDigit(password)) return false;

  return true;
}
