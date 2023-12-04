/*
  Frank Ruskey, Carla Savage, Terry Min Yih Wang,
  Generating necklaces,
  Journal of Algorithms,
  Volume 13, Issue 3,
  1992,
  Pages 414-430,
  ISSN 0196-6774,
  https://doi.org/10.1016/0196-6774(92)90047-G.
 */
function getNecklaces(length, kind) {
  const outcomes = [];
  const a = [];
  for (let i = 0; i <= length; i++) a[i] = 0;
  outcomes.push(a.slice(1, length + 1));
  let i = length;
  do {
    a[i] = a[i] + 1;
    for (let j = 1; j <= length - i; j++) {
      a[j + i] = a[j];
    }

    if (length % i === 0) {
      outcomes.push(a.slice(1, length + 1));
    }

    i = length;
    while (a[i] === kind - 1) {
      i = i - 1;
    }
  } while (i !== 0);

  return outcomes;
}
