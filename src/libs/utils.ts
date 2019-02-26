export function MAP(x:number, inMin:number, inMax:number, outMin:number, ouMax:number) {
  return Math.round((x - inMin) * (ouMax - outMin) / (inMax - inMin) + outMin);
}

export function constrain(x:number, min:number, max:number) {
  x = x < min ? min : x;
  x = x > max ? max : x;
  return x;
}