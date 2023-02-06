// const guid = () => {
//   let idString = () => {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   };
//   return `${idString}${idString}-${idString}-${idString}`;
// };

const guidd = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export default guidd;
