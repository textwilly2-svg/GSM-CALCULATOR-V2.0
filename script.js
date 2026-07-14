function calculate() {
    // 1. Get Core Fabric Inputs
    const reed = parseFloat(document.getElementById('reed').value) || 0;
    const pick = parseFloat(document.getElementById('pick').value) || 0;
    const reedSpace = parseFloat(document.getElementById('reedSpace').value) || 0;
    const fw = parseFloat(document.getElementById('fw').value) || 0;

    // 2. Get Warp Inputs
    const warpCount1 = parseFloat(document.getElementById('warpCount1').value) || 0;
    const warpPattern1 = parseFloat(document.getElementById('warpPattern1').value) || 0;
    const warpCount2 = parseFloat(document.getElementById('warpCount2').value) || 0;
    const warpPattern2 = parseFloat(document.getElementById('warpPattern2').value) || 0;

    // 3. Get Weft Inputs
    const weftCount1 = parseFloat(document.getElementById('weftCount1').value) || 0;
    const weftPattern1 = parseFloat(document.getElementById('weftPattern1').value) || 0;
    const weftCount2 = parseFloat(document.getElementById('weftCount2').value) || 0;
    const weftPattern2 = parseFloat(document.getElementById('weftPattern2').value) || 0;

    // Standard textile multiplier constants for indirect cotton count formulas
    const CONSTANT_MULTIPLIER = 25.537;
    const warpCrimp = 1.05; // 5% Warp Crimp factor
    const weftCrimp = 1.05; // 5% Weft Crimp factor

    // --- WARP CALCULATIONS ---
    let totalWarpGsm = 0;
    let warp1BlendPct = 0;
    let warp2BlendPct = 0;
    let warpPatternTotal = warpPattern1 + warpPattern2;

    if (reed > 0 && warpPatternTotal > 0) {
        // Find individual EPI share based on pattern distribution
        let epi1 = (reed * warpPattern1) / warpPatternTotal;
        let epi2 = (reed * warpPattern2) / warpPatternTotal;

        let gsmWarp1 = (warpCount1 > 0) ? (epi1 / warpCount1) * CONSTANT_MULTIPLIER * warpCrimp : 0;
        let gsmWarp2 = (warpCount2 > 0) ? (epi2 / warpCount2) * CONSTANT_MULTIPLIER * warpCrimp : 0;
        
        totalWarpGsm = gsmWarp1 + gsmWarp2;

        // Calculate accurate percentage share based on structural weight contribution
        if (totalWarpGsm > 0) {
            warp1BlendPct = (gsmWarp1 / totalWarpGsm) * 100;
            warp2BlendPct = (gsmWarp2 / totalWarpGsm) * 100;
        }
    }

    // --- WEFT CALCULATIONS ---
    let totalWeftGsm = 0;
    let weft1BlendPct = 0;
    let weft2BlendPct = 0;
    let weftPatternTotal = weftPattern1 + weftPattern2;

    if (pick > 0 && weftPatternTotal > 0) {
        // Find individual PPI share based on pattern distribution
        let ppi1 = (pick * weftPattern1) / weftPatternTotal;
        let ppi2 = (pick * weftPattern2) / weftPatternTotal;

        let gsmWeft1 = (weftCount1 > 0) ? (ppi1 / weftCount1) * CONSTANT_MULTIPLIER * weftCrimp : 0;
        let gsmWeft2 = (weftCount2 > 0) ? (ppi2 / weftCount2) * CONSTANT_MULTIPLIER * weftCrimp : 0;

        totalWeftGsm = gsmWeft1 + gsmWeft2;

        if (totalWeftGsm > 0) {
            weft1BlendPct = (gsmWeft1 / totalWeftGsm) * 100;
            weft2BlendPct = (gsmWeft2 / totalWeftGsm) * 100;
        }
    }

    // --- FINAL RESULTS & CONVERSIONS ---
    let finalFabricGsm = totalWarpGsm + totalWeftGsm;
    
    // Calculate weights based on actual fabric size dimensions
    let warpWeightLbs = 0;
    let weftWeightLbs = 0;
    if (reedSpace > 0) {
        let totalEnds = reed * reedSpace;
        if (warpPatternTotal > 0) {
            let ends1 = (totalEnds * warpPattern1) / warpPatternTotal;
            let ends2 = (totalEnds * warpPattern2) / warpPatternTotal;
            warpWeightLbs += (warpCount1 > 0) ? (ends1 * warpCrimp) / (warpCount1 * 840) : 0;
            warpWeightLbs += (warpCount2 > 0) ? (ends2 * warpCrimp) / (warpCount2 * 840) : 0;
        }
        
        if (weftPatternTotal > 0) {
            weftWeightLbs += (weftCount1 > 0) ? (pick * (weftPattern1 / weftPatternTotal) * reedSpace * weftCrimp) / (weftCount1 * 840) : 0;
            weftWeightLbs += (weftCount2 > 0) ? (pick * (weftPattern2 / weftPatternTotal) * reedSpace * weftCrimp) / (weftCount2 * 840) : 0;
        }
    }

    let grandTotalWeight = warpWeightLbs + weftWeightLbs;
    let linearWeight = grandTotalWeight * 1.09361; // conversion factor to linear units

    // --- DISPLAY INTERFACE OUTPUTS ---
    document.getElementById('warpWeight').innerText = warpWeightLbs.toFixed(2);
    document.getElementById('weftWeight').innerText = weftWeightLbs.toFixed(2);
    
    document.getElementById('warp1Blend').innerText = warp1BlendPct.toFixed(2) + "%";
    document.getElementById('warp2Blend').innerText = warp2BlendPct.toFixed(2) + "%";
    document.getElementById('weft1Blend').innerText = weft1BlendPct.toFixed(2) + "%";
    document.getElementById('weft2Blend').innerText = weft2BlendPct.toFixed(2) + "%";
    
    document.getElementById('grandTotal').innerText = grandTotalWeight.toFixed(2);
    document.getElementById('linearWeight').innerText = linearWeight.toFixed(2);
    document.getElementById('gsm').innerText = finalFabricGsm.toFixed(2);
}

function convertCount() {
    let ne = parseFloat(document.getElementById('ne').value) || 0;
    let nm = parseFloat(document.getElementById('nm').value) || 0;

    if (ne > 0) {
        document.getElementById('leaNe').value = (ne * 2.8).toFixed(2);
    }
    if (nm > 0) {
        document.getElementById('leaNm').value = (nm * 1.693).toFixed(2);
    }
}
