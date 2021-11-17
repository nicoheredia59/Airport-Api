export const genToken = (lenght: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charLenght = characters.length;
  for (let i = 0; i < lenght; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLenght));
  }
  return result;
};
