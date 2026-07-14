function calculate() {

    // Basic Inputs
    let reed = Number(document.getElementById("reed").value) || 0;
    let pick = Number(document.getElementById("pick").value) || 0;
    let reedSpace = Number(document.getElementById("reedSpace").value) || 0;
    let fw = Number(document.getElementById("fw").value) || 0;

    // Total Warp Pattern
    let totalWarpPattern =
        (Number(document.getElementById("warpPattern1").value) || 0) +
        (Number(document.getElementById("warpPattern2").value) || 0);

    // Total Weft Pattern
    let totalWeftPattern =
        (Number(document.getElementById("weftPattern1").value) || 0) +
        (Number(document.getElementById("weftPattern2").value) || 0);

    // ==========================
    // Warp Weight
    // ==========================
    let totalWarpWeight = 0;

    for (let i = 1; i <= 2; i++) {

        let count = Number(document.getElementById("warpCount" + i).value) || 0;
        let pattern = Number(document.getElementById("warpPattern" + i).value) || 0;

        if (count > 0 && totalWarpPattern > 0) {

            let wt =
                ((reed * reedSpace * 0.6501 * 2.8) /
                    (10 * count))
                * pattern
                / totalWarpPattern;

            totalWarpWeight += wt;
        }
    }

    // ==========================
    // Weft Weight
    // ==========================
    let totalWeftWeight = 0;

    for (let i = 1; i <= 2; i++) {

        let count = Number(document.getElementById("weftCount" + i).value) || 0;
        let pattern = Number(document.getElementById("weftPattern" + i).value) || 0;

        if (count > 0 && totalWeftPattern > 0) {

            let wt =
                ((pick * (reedSpace + 1.2) * 0.5901 * 2.8) /
                    (10 * count))
                * pattern
                / totalWeftPattern;

            totalWeftWeight += wt;
        }
    }

    // Grand Total
    let grandTotal = totalWarpWeight + totalWeftWeight;

    // Blend %
    let warpBlend = 0;
    let weftBlend = 0;

    if (grandTotal > 0) {
        warpBlend = (totalWarpWeight / grandTotal) * 100;
        weftBlend = (totalWeftWeight / grandTotal) * 100;
    }

    // Linear Weight
    let linearWeight = grandTotal * 10 * 0.96;

    // GSM
    let gsm = 0;

    if (fw > 0) {
        gsm = linearWeight / (fw * 0.0254);
    }

    // Display Results
    document.getElementById("warpWeight").innerHTML = totalWarpWeight.toFixed(2);
    document.getElementById("weftWeight").innerHTML = totalWeftWeight.toFixed(2);
    document.getElementById("warpBlend").innerHTML = warpBlend.toFixed(2) + "%";
    document.getElementById("weftBlend").innerHTML = weftBlend.toFixed(2) + "%";
    document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
    document.getElementById("linearWeight").innerHTML = linearWeight.toFixed(2);
    document.getElementById("gsm").innerHTML = gsm.toFixed(2);

// Save all input values automatically
const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
    });
});

// Restore values when the app opens
window.onload = function () {

    inputs.forEach(input => {
        const saved = localStorage.getItem(input.id);
        if (saved !== null) {
            input.value = saved;
        }
    });

    calculate();

function convertCount() {

    let ne = Number(document.getElementById("ne").value) || 0;
    let nm = Number(document.getElementById("nm").value) || 0;

    // Ne to Lea
    let leaFromNe = ne * 2.8;

    // Nm to Lea
    let leaFromNm = nm * 1.693;

    document.getElementById("leaNe").value = leaFromNe.toFixed(2);
    document.getElementById("leaNm").value = leaFromNm.toFixed(2);

}