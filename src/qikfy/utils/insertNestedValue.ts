export default function insertNestedValue(
  obj: any,
  path: string,
  newValue: any
) {
  const keys = path.split(".");
  const copy = { ...obj };
  let currentObj = copy;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!currentObj[key]) {
      currentObj[key] = {}; // Create an empty object if the property doesn't exist
    }

    currentObj = currentObj[key];
  }

  const lastKey = keys[keys.length - 1];
  currentObj[lastKey] = newValue;

  return copy;
}
