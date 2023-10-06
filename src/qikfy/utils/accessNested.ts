function accessNested(obj: any, path: string) {
  let copy = { ...obj };
  const keys = path.split(".");

  for (const key of keys) {
    if (copy && copy.hasOwnProperty(key)) {
      copy = copy[key];
    } else {
      return undefined; // Property not found along the path
    }
  }

  return copy;
}

export default accessNested;
