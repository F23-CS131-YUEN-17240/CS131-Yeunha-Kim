/**
 *  REFERENCES
 * [1] H. Fredricksen and I. J. Kessler, "An algorithm for generating necklaces of beads in two colors," Discrete Mathematics 61 (1986) 181-188
 * [2] H. Fredricksen and J. Maiorana, "Necklaces of beads in k colors and k-ary de Bruijn sequences," Discrete Mathematics 23, No. 3 (1978) 207-210
 * [3] F. Ruskey, C. Savage, and T. Wang, "Generating Necklaces," Journal of Algorithms 13, No.3 (1992) 414-430
 * [4] J.Sawada, "Generating bracelets in constant amortized time,", Society for Industrial and Applied Mathematics 31, No.1 (2001) 259-268
 * [5] J.Davies, “Combinatorial Necklaces and Bracelets”, www.jasondavies.com/necklaces, Accessed 15 Nov. 2023
 */

const BEADS_RADIUS = 5;
const BEADS_COLOR = ["red", "orange", "green", "blue", "purple"];

document.addEventListener("DOMContentLoaded", function (event) {
  const length = document.querySelector(".length");
  const kind = document.querySelector(".kind");
  const type = document.querySelector(".type");
  const generateButton = document.querySelector(".generate");
  const result = document.querySelector(".result");
  const resultNum = document.querySelector(".result-number");

  generateButton.addEventListener("click", (event) => {
    [result.innerHTML, resultNum.innerHTML] = generate(
      length.value,
      kind.value,
      type.value
    );
  });
});

function getCoordinates(length) {
  let angle = (Math.PI * 2) / length;
  const angles = [];
  const coordinates = [];
  for (let i = 0; i < length; i++) {
    angles.push(angle * i);
  }
  for (beadsAngle of angles) {
    coordinates.push([Math.sin(beadsAngle), -Math.cos(beadsAngle)]);
  }
  return coordinates;
}

const generate = (length, kind, type) => {
  const resultArr =
    type === "0" ? getNecklaces(length, kind) : getBracelets(length, kind);

  const beadsCoordinates = getCoordinates(length);
  let drawing = "";
  resultArr.forEach((uniqueOutcome, i) => {
    drawing += `<svg width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"  viewBox="-7.5 -7.5 15 15"
    <defs>
      
    </defs>
    >
      <circle cx="0" cy="0" r="5" stroke-width="0.2" stroke="silver"></circle>`;
    uniqueOutcome.forEach((bead, j) => {
      drawing += `<circle cx="${beadsCoordinates[j][0] * BEADS_RADIUS}" cy="${
        beadsCoordinates[j][1] * BEADS_RADIUS
      }" r="1" fill="url(#beadGradient${i}_${j}_${bead})"></circle>
      <defs>
        <radialGradient id="beadGradient${i}_${j}_${bead}" cx="40%" cy="40%" >
          <stop offset="0%" style="stop-color: #ffffc6; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: ${
            BEADS_COLOR[bead]
          }; stop-opacity: 1" />
        </radialGradient>
      </defs>`;
    });
    drawing += `</svg>`;
  });
  return [drawing, "Number of unique arrangements: " + resultArr.length];
};
