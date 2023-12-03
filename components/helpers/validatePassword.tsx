export default function (password: string): boolean {
  if (password.trim().length < 6) return false;

  const containsDigit = (password: string): boolean => {
    const charList = password.split("");

    charList.filter((char) => char >= "0" && char <= "9");

    return charList.length > 0;
  };

  if (!containsDigit) return false;

  return true;
}
