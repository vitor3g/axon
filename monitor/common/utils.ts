import figlet from "figlet";

export const generateColors = () => {
  const colors: string[] = [];
  for (let i = 16; i <= 231; i++) {
    colors.push(`\x1b[38;5;${i}m`);
  }
  return colors;
};

export const drawFiglet = async () =>
  new Promise((resolve, reject) => {
    figlet("Axon", (err, data) => {
      if (err) {
        console.dir(err);
        return;
      }

      console.clear();
      console.log(data);

      resolve(resolve);
    });
});
