function linearInfinite(n, k) {
  result = [];
  const beadsKinds = [];
  for (let i = 0; i < n; i++) beadsKinds[i] = i;

  function generate(prevBeads) {
    if (prevBeads.length === n) {
      result.push(prevBeads);
      return;
    }
    for (let i = 0; i < n; i++) {
      const nextPermute = [...prevBeads, beadsKinds[i]];
      generate(nextPermute);
    }
  }
  generate("");
  return result;
}
