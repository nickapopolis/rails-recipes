export function replace<T>(array: T[], targetIndex: number, newValue: T) {
  return array.map((value, index) => {
      if (index !== targetIndex) {
      return value;
    }

      return newValue;
    });
}
