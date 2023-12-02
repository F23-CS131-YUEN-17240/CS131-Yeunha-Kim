/*
  Joe Sawada,
  Generating bracelets in constant amortized time,
  Society for Industrial and Applied Mathematics,
  Volume 31, Issue 1,
  2001,
  Pages 259-268,
  https://epubs.siam.org/doi/10.1137/S0097539700377037
 */
function getBracelets(n, k) {
  const a = [];
  for (let i = 0; i < n; i++) a[i] = 0;

  return generateBracelets(1, 1, 1, -1, 0, false);

  function checkRev(t, i) {
    for (let j = i + 1; j <= (t + 1) / 2; j++) {
      if (a[j] < a[t - j + 1]) return 0;
      if (a[j] > a[t - j + 1]) return -1;
    }
    return 1;
  }

  function generateBracelets(t, p, r, u, v, rs) {
    let outcomes = [];
    if (t - 1 > (n - r) / 2 + r) {
      if (a[t - 1] > a[n - t + 2 + r]) rs = false;
      else if (a[t - 1] < a[n - t + 2 + r]) rs = true;
    }
    if (t > n) {
      if (!rs && n % p === 0) outcomes.push(a.slice(1));
    } else {
      a[t] = a[t - p];

      if (a[t] === a[1]) v++;
      else v = 0;

      if (u === -1 && a[t - 1] !== a[1]) u = r = t - 2;
      if (u === -1 || t !== n || a[n] !== a[1]) {
        if (u === v) {
          let rev = checkRev(t, u);
          if (rev !== -1)
            outcomes = outcomes.concat(
              generateBracelets(t + 1, p, rev ? t : r, u, v, rev ? false : rs)
            );
        } else {
          outcomes = outcomes.concat(generateBracelets(t + 1, p, r, u, v, rs));
        }
      }
      for (let j = a[t - p] + 1; j < k; j++) {
        a[t] = j;
        outcomes = outcomes.concat(generateBracelets(t + 1, t, r, u, 0, rs));
      }
    }
    return outcomes;
  }
}
