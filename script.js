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

    // --- WARP CALCULATIONS ---
    let warp1Weight = 0;
    let warp2Weight = 0;
    let warpPatternTotal = warpPattern1 + warpPattern2;
    
    const warpCrimp = 1.05; // Standard 5% warp take-up
    const weftCrimp = 1.05; // Standard 5% weft take-up

    if (warpPatternTotal > 0 && reedSpace > 0 && reed > 0) {
        let totalEnds = reed * reedSpace;
        
        if (warpPattern1 > 0 && warpCount1 > 0) {
            let ends1 = (totalEnds * warpPattern1) / warpPatternTotal;
            warp1Weight = (ends1 * warpCrimp) / (warpCount1 * 840 * 0.00059);
        }
        if (warpPattern2 > 0 && warpCount2 > 0) {
            let ends2 = (totalEnds * warpPattern2) / warpPatternTotal;
            warp2Weight = (ends2 * warpCrimp) / (warpCount2 * 840 * 0.00059);
        }
    }
    let totalWarpWeight = warp1Weight + warp2Weight;

    // Calculate Warp Blend Percentages
    let warp1BlendPct = 0;
    let warp2BlendPct = 0;
    if (totalWarpWeight > 0) {
        warp1BlendPct = (warp1Weight / totalWarpWeight) * 100;
        warp2BlendPct = (warp2Weight / totalWarpWeight) * 100;
    }

    // --- WEFT CALCULATIONS ---
    let weft1Weight = 0;
    let weft2Weight = 0;
    let weftPatternTotal = weftPattern1 + weftPattern2;

    if (weftPatternTotal > 0 && reedSpace > 0 && pick > 0) {
        if (weftPattern1 > 0 && weftCount1 > 0) {
            let picks1 = (pick * weftPattern1) / weftPatternTotal;
            weft1Weight = (picks1 * reedSpace * weftCrimp) / (weftCount1 * 840 * 0.00059);
        }
        if (weftPattern2 > 0 && weftCount2 > 0) {
            let picks2 = (pick * weftPattern2) / weftPatternTotal;
            weft2Weight = (picks2 * reedSpace * weftCrimp) / (weftCount2 * 840 * 0.00059);
        }
    }
    let totalWeftWeight = weft1Weight + weft2Weight;

    // Calculate Weft Blend Percentages
    let weft1BlendPct = 0;
    let weft2BlendPct = 0;
    if (totalWeftWeight > 0) {
        weft1BlendPct = (weft1Weight / totalWeftWeight) * 100;
        weft2BlendPct = (weft2Weight / totalWeftWeight) * 100;
    }

    // --- GRAND TOTAL & GSM ---
    let grandTotalWeight = totalWarpWeight + totalWeftWeight;
    let linearWeight = grandTotalWeight * 1.09361; 
    
    let calculatedGsm = 0;
    if (fw > 0) {
        calculatedGsm = (grandTotalWeight / (fw * 0.0254)) * 100;
    }

    // --- DISPLAY RESULTS ---
    document.getElementById('warpWeight').innerText = totalWarpWeight.toFixed(2);
    document.getElementById('weftWeight').innerText = totalWeftWeight.toFixed(2);
    
    // Display Calculated Blend Percentages
    document.getElementById('warp1Blend').innerText = warp1BlendPct.toFixed(2) + "%";
    document.getElementById('warp2Blend').innerText = warp2BlendPct.toFixed(2) + "%";
    document.getElementById('weft1Blend').innerText = weft1BlendPct.toFixed(2) + "%";
    document.getElementById('weft2Blend').innerText = weft2BlendPct.toFixed(2) + "%";
    
    document.getElementById('grandTotal').innerText = grandTotalWeight.toFixed(2);
    document.getElementById('linearWeight').innerText = linearWeight.toFixed(2);
    document.getElementById('gsm').innerText = calculatedGsm.toFixed(2);
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
