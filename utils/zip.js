import _ from "lodash";
export default function infiniteZip(arrObj) {
  const arrs = Object.values(arrObj);
  const keys = Object.keys(arrObj);

  return _.zipWith(...arrs, (...args) =>
    keys.reduce(
      (res, key, idx) => ({
        ...res,
        [key]: args[idx],
      }),
      {}
    )
  );
}
