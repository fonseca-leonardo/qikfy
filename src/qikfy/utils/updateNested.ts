export default function updateNested(object: any, path: string, newValue: any) {
  let obj = { ...object };
  const keys = path.split(".");
  let currentObj = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (currentObj && currentObj.hasOwnProperty(key)) {
      currentObj = currentObj[key];
    } else {
      return obj; // Property not found along the path, return the original object
    }
  }

  const lastKey = keys[keys.length - 1];
  if (currentObj && currentObj.hasOwnProperty(lastKey)) {
    currentObj[lastKey] = newValue;
  }

  return obj;
}
