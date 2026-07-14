function calculateGsm() {
    // 1. Get your existing standard inputs (EPI, PPI, Warp Count, Weft Count, Crimp, etc.)
    const epi = parseFloat(document.getElementById('epi').value) || 0;
    const ppi = parseFloat(document.getElementById('ppi').value) || 0;
    const warpCount = parseFloat(document.getElementById('warpCount').value) || 1;
    const weftCount = parseFloat(document.getElementById('weftCount').value) || 1;
    
    // Grab your new blend inputs
    const wb1 = parseFloat(document.getElementById('warpBlend1').value) || 0;
    const wb2 = parseFloat(document.getElementById('warpBlend2').value) || 0;
    const yb1 = parseFloat(document.getElementById('weftBlend1').value) || 0;
    const yb2 = parseFloat(document.getElementById('weftBlend2').value) || 0;

    // 2. Standard Textile GSM Calculations 
    // (Using standard cotton count formula: (Ends/Count) * 25.4 * crimp factor... adjust multiplier to match your existing code)
    const warpCrimpFactor = 1.05; // Use your calculator's actual crimp logic here
    const weftCrimpFactor = 1.08; 

    const totalWarpGsm = (epi / warpCount) * 25.537 * warpCrimpFactor;
    const totalWeftGsm = (ppi / weftCount) * 25.537 * weftCrimpFactor;

    // 3. Calculate the Fiber Blend weights
    // If the user didn't write anything, assume 100% of a single fiber
    const warpFactor1 = (wb1 === 0 && wb2 === 0) ? 1 : wb1 / 100;
    const warpFactor2 = wb2 / 100;

    const weftFactor1 = (yb1 === 0 && yb2 === 0) ? 1 : yb1 / 100;
    const weftFactor2 = yb2 / 100;

    const warpFiber1Gsm = totalWarpGsm * warpFactor1;
    const warpFiber2Gsm = totalWarpGsm * warpFactor2;

    const weftFiber1Gsm = totalWeftGsm * weftFactor1;
    const weftFiber2Gsm = totalWeftGsm * weftFactor2;

    const finalFabricGsm = totalWarpGsm + totalWeftGsm;

    // 4. Update the UI
    document.getElementById('totalWarpGsm').innerText = totalWarpGsm.toFixed(2);
    document.getElementById('warpFiber1Gsm').innerText = warpFiber1Gsm.toFixed(2);
    document.getElementById('warpFiber2Gsm').innerText = warpFiber2Gsm.toFixed(2);

    document.getElementById('totalWeftGsm').innerText = totalWeftGsm.toFixed(2);
    document.getElementById('weftFiber1Gsm').innerText = weftFiber1Gsm.toFixed(2);
    document.getElementById('weftFiber2Gsm').innerText = weftFiber2Gsm.toFixed(2);

    document.getElementById('finalGsm').innerText = finalFabricGsm.toFixed(2);
}
