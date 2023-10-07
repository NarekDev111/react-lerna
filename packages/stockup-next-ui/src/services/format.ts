function format_cr(val: number): string {
  return val.toFixed(1);
}

function mileage(val: number) {
  return val.toLocaleString();
}

function price(val: number, cents = false): string {
  return `$${cents ? val.toFixed(2) : val.toLocaleString()}`;
}

export { format_cr, mileage, price };
