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

    // Warp Weights (Individual Yarn Components)
    let warp1Weight = 0;
    let warp2Weight = 0;

    // Warp 1 Calculation using your exact formula
    let countW1 = Number(document.getElementById("warpCount1").value) || 0;
    let patternW1 = Number(document.getElementById("warpPattern1").value) || 0;
    if (countW1 > 0 && totalWarpPattern > 0) {
        warp1Weight = ((reed * reedSpace * 0.6501 * 2.8) / (10 * countW1)) * patternW1 / totalWarpPattern;
    }

    // Warp 2 Calculation using your exact formula
    let countW2 = Number(document.getElementById("warpCount2").value) || 0;
    let patternW2 = Number(document.getElementById("warpPattern2").value) || 0;
    if (countW2 > 0 && totalWarpPattern > 0) {
        warp2Weight = ((reed * reedSpace * 0.6501 * 2.8) / (10 * countW2)) * patternW2 / totalWarpPattern;
    }

    let totalWarpWeight = warp1Weight + warp2Weight;

    // Weft Weights (Individual Yarn Components)
    let weft1Weight = 0;
    let weft2Weight = 0;

    // Weft 1 Calculation using your exact formula
    let countWf1 = Number(document.getElementById("weftCount1").value) || 0;
    let patternWf1 = Number(document.getElementById("weftPattern1").value) || 0;
    if (countWf1 > 0 && totalWeftPattern > 0) {
        weft1Weight = ((pick * (reedSpace + 1.2) * 0.5901 * 2.8) / (10 * countWf1)) * patternWf1 / totalWeftPattern;
    }

    // Weft 2 Calculation using your exact formula
    let countWf2 = Number(document.getElementById("weftCount2").value) || 0;
    let patternWf2 = Number(document.getElementById("weftPattern2").value) || 0;
    if (countWf2 > 0 && totalWeftPattern > 0) {
        weft2Weight = ((pick * (reedSpace + 1.2) * 0.5901 * 2.8) / (10 * countWf2)) * patternWf2 / totalWeftPattern;
    }

    let totalWeftWeight = weft1Weight + weft2Weight;

    // Grand Total Weight
    let grandTotal = totalWarpWeight + totalWeftWeight;

    // CRITICAL FIX: Blend % calculated out of Grand Total (Matches Excel sheet exactly)
    let warp1BlendPct = 0;
    let warp2BlendPct = 0;
    let weft1BlendPct = 0;
    let weft2BlendPct = 0;

    if (grandTotal > 0) {
        warp1BlendPct = (warp1Weight / grandTotal) * 100;
        warp2BlendPct = (warp2Weight / grandTotal) * 100;
        weft1BlendPct = (weft1Weight / grandTotal) * 100;
        weft2BlendPct = (weft2Weight / grandTotal) * 100;
    }

    // Linear Weight using your exact formula
    let linearWeight = grandTotal * 10 * 0.96;

    // GSM using your exact formula
    let gsm = 0;
    if (fw > 0) {
        gsm = linearWeight / (fw * 0.0254);
    }

    // Display Results
    document.getElementById("warpWeight").innerHTML = totalWarpWeight.toFixed(2);
    document.getElementById("weftWeight").innerHTML = totalWeftWeight.toFixed(2);
    
    // Display the corrected Blend Percentages
    document.getElementById("warp1Blend").innerHTML = warp1BlendPct.toFixed(2) + "%";
    document.getElementById("warp2Blend").innerHTML = warp2BlendPct.toFixed(2) + "%";
    document.getElementById("weft1Blend").innerHTML = weft1BlendPct.toFixed(2) + "%";
    document.getElementById("weft2Blend").innerHTML = weft2BlendPct.toFixed(2) + "%";
    
    document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
    document.getElementById("linearWeight").innerHTML = linearWeight.toFixed(2);
    document.getElementById("gsm").innerHTML = gsm.toFixed(2);
}

// Yarn Count Converter
function convertCount() {
    let ne = Number(document.getElementById("ne").value) || 0;
    let nm = Number(document.getElementById("nm").value) || 0;
    document.getElementById("leaNe").value = (ne * 2.8).toFixed(2);
    document.getElementById("leaNm").value = (nm * 1.693).toFixed(2);
}

// Auto Save & Live Calculations
const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
        calculate();
        convertCount();
    });
});

// Restore Saved Data on window load
window.onload = function () {
    inputs.forEach(input => {
        const saved = localStorage.getItem(input.id);
        if (saved !== null) {
            input.value = saved;
        }
    });
    calculate();
    convertCount();
};
