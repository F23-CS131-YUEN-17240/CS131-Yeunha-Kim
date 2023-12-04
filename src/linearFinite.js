function linearFinite(n, k) {
  result = [];
  const beadsKinds = [];
  for (let i = 0; i < n; i++) beadsKinds[i] = i;

  function generate(availableBeads, prevBeads) {
    if (availableBeads.length === 0) {
      result.push(prevBeads);
      return;
    }

    for (let i = 0; i < availableBeads.length; i++) {
      const nextPermute = [...prevBeads, availableBeads[i]];
      const beadsLeft = availableBeads.filter((_, index) => i !== index);
      generate(beadsLeft, nextPermute);
    }

    return [];
  }
  generate(beadsKinds, "");
  return result;
}
