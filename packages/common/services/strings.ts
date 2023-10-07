function capitalize(str: string): string {
  return str
    ? `${`${str}`.slice(0, 1).toUpperCase()}${`${str}`.slice(1)}` // ???!
    : str;
}

export { capitalize };
