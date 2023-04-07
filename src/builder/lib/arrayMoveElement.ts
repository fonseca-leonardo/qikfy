export function arrayMoveElement<T = any>(
  arr: Array<T>,
  fromIndex: any,
  toIndex: any
): Array<T> {
  const copyArray = [...arr];
  const element = arr[fromIndex];
  copyArray.splice(fromIndex, 1);
  copyArray.splice(toIndex, 0, element);
  return copyArray;
}
