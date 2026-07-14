function calculate() {
    // 1. Get Core Fabric Inputs
    const reed = parseFloat(document.getElementById('reed').value) || 0;
    const pick = parseFloat(document.getElementById('pick').value) || 0;
    const reedSpace = parseFloat(document.getElementById('reedSpace').value) || 0;
    const fw = parseFloat(document.getElementById('fw').value) || 0;

    // 2. Get Warp Inputs
    const warpCount1 = parseFloat(document.getElementById('warpCount1').value) || 0;
    const warpPattern1 = parseFloat(document.getElementById('warpPattern1').value) || 0;
    const w1b1 = parseFloat(document.getElementById('warp1Blend1').value) || 0;
    const w1b2 = parseFloat(document.getElementById('warp1Blend2').value) || 0;

    const warpCount2 = parseFloat(document.getElementById('warpCount2').value) || 0;
    const warpPattern2 = parseFloat(document.getElementById('warpPattern2').value) || 0;
    const w2b1 = parseFloat(document.getElementById('warp2Blend1').value) || 0;
    const w2b2 = parseFloat(document.getElementById('warp2Blend2').value) || 0;

    // 3. Get Weft Inputs
    const weftCount1 = parseFloat(document.getElementById('weftCount1').value) || 0;
    const weftPattern1 = parseFloat(document.getElementById('weftPattern1').value) || 0;
    const wf1b1 = parseFloat(document.getElementById('weft1Blend1').value) || 0;
    const wf1b2 = parseFloat(document.getElementById('weft1Blend2').value) || 0;

    const weftCount2 = parseFloat(document.getElementById('weftCount2').value) || 0;
    const weftPattern2 = parseFloat(document.getElementById('weftPattern2').value) || 0;
    const wf2b1 = parseFloat(document.getElementById('weft2Blend1').value) || 0;
    const wf2b2 = parseFloat(document.getElementById('weft2Blend2').value) || 0;

    // --- WARP CALCULATIONS ---
    let totalWarpWeight = 0;
    let warpPatternTotal = warpPattern1 + warpPattern2;
    
    // Default crimp factor/waste allowances (Adjust percentages as needed for your loom setups)
    const warpCrimp = 1.05; 
    const weftCrimp = 1.05;

    if (warpPatternTotal > 0 && reedSpace > 0 && reed > 0) {
        let totalEnds = reed * reedSpace;
        
        if (warpPattern1 > 0 && warpCount1 > 0) {
            let ends1 = (totalEnds * warpPattern1) / warpPatternTotal;
            totalWarpWeight += (ends1 * warpCrimp) / (warpCount1 * 840 * 0.00059);
        }
        if (warpPattern2 > 0 && warpCount2 > 0) {
            let ends2 = (totalEnds * warpPattern2) / warpPatternTotal;
            totalWarpWeight += (ends2 * warpCrimp) / (warpCount2 * 840 * 0.00059);
        }
    }

    // --- WEFT CALCULATIONS ---
    let totalWeftWeight = 0;
    let weftPatternTotal = weftPattern1 + weftPattern2;

    if (weftPatternTotal > 0 && reedSpace > 0 && pick > 0) {
        if (weftPattern1 > 0 && weftCount1 > 0) {
            let picks1 = (pick * weftPattern1) / weypPatternTotal; // relative pick count
            totalWeftWeight += (picks1 * reedSpace * weftCrimp) / (weftCount1 * 840 * 0.00059);
        }
        if (weftPattern2 > 0 && weftCount2 > 0) {
            let picks2 = (pick * weftPattern2) / weftPatternTotal;
            totalWeftWeight += (picks2 * reedSpace * weftCrimp) / (weftCount2 * 840 * 0.00059);
        }
    }

    // Convert raw structural weights out to ounces/grams per standard sizing units
    // Standard Calculation values for Fabric weight outputs:
    let grandTotalWeight = totalWarpWeight + totalWeftWeight;
    let linearWeight = grandTotalWeight * 1.09361; // Adjusted for linear yards/meters
    
    let calculatedGsm = 0;
    if (fw > 0) {
        calculatedGsm = (grandTotalWeight / (fw * 0.0254)) * 100; // standard GSM conversion metric
    }

    // --- DISPLAY RESULTS ---
    document.getElementById('warpWeight').innerText = totalWarpWeight.toFixed(2);
    document.getElementById('weftWeight').innerText = totalWeftWeight.toFixed(2);
    
    // Showcase dynamic blend percentage results based on input text data
    let warpBlendText = (w1b1 > 0 || w1b2 > 0) ? `${w1b1}% / ${w1b2}%` : "100% Single";
    let weftBlendText = (wf1b1 > 0 || wf1b2 > 0) ? `${wf1b1}% / ${wf1b2}%` : "100% Single";
    
    document.getElementById('warpBlend').innerText = warpBlendText;
    document.getElementById('weftBlend').innerText = weftBlendText;
    
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
