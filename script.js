/**
 * Apple-Scale 5E
 * 
 * A minimalist web-based scale for macOS Force Touch trackpads.
 * Inspired by Dieter Rams' design principles.
 * 
 * GitHub: https://github.com/asun51/5E-Apple-scale
 * License: MIT
 */

document.addEventListener('DOMContentLoaded', () => {
    const weightValueElement = document.getElementById('weight-value');
    const touchZone = document.getElementById('touch-zone');
    const tareBtn = document.getElementById('tare-btn');
    const statusLight = document.getElementById('status-light');

    let currentTare = 0;
    let currentForce = 0;
    const MAX_FORCE_GRAMS = 400; // Estimated max capacity for Force Touch

    // Check for Force Touch support
    // We use a more robust check: existence of the event handler property
    const isSafariForceTouch = 'onwebkitmouseforcechanged' in window;

    if (!isSafariForceTouch) {
        // Instead of a blocking alert, we show a warning in the UI
        const instruction = document.querySelector('.instruction');
        if (instruction) {
            instruction.innerHTML = "<span style='color:#ea5b0c'>⚠️ 无法读取真实重量</span>";
            document.querySelector('.sub-instruction').innerHTML = "Chrome 屏蔽了硬件数据，请使用 <b>Safari</b> 浏览器<br><span style='font-size:10px'>Chrome blocks hardware sensors. Please use Safari.</span>";
        }
        console.warn("Force Touch events not detected.");
    }

    function updateDisplay(force) {
        // WEB API LIMITATION FIX:
        // The browser only reports force >= 1.0 (Click Threshold).
        // Physically, 1.0 force is approx 130-140g.
        // To measure small objects (e.g. 5g), we must "hide" this initial 130g.
        // We treat 1.0 as the "Zero Point" (Tare).

        const CLICK_THRESHOLD = 1.0;
        const MAX_FORCE = 3.0;
        const SENSOR_CAPACITY = 400; // grams

        // If force is below threshold, we can't reliably measure
        if (force < 0.1) {
            weightValueElement.innerText = "0";
            weightValueElement.style.color = "#ccc"; // Dim when inactive
            touchZone.classList.remove('active');
            statusLight.classList.remove('active');
            return;
        }

        // Visual feedback active
        touchZone.classList.add('active');
        statusLight.classList.add('active');
        weightValueElement.style.color = "#222";

        // Algorithm:
        // We map the range [1.0, 3.0] to [0g, 400g] (approx)
        // Or more accurately, we just subtract the baseline.
        // Let's assume 1 unit of force = ~130g.

        let rawGrams = 0;

        if (force >= CLICK_THRESHOLD) {
            // User is pressing. We subtract the "click force" to show the *added* weight.
            // This allows measuring from 0g.
            // Scale factor: If max is 3.0, range is 2.0. 
            // If we want 400g capacity *on top* of click, scale is 200.
            // If we want 400g *total* capacity, scale is ~133.
            // Let's use 160 to be safe and sensitive.

            rawGrams = (force - CLICK_THRESHOLD) * 160;
        } else {
            // Pre-click force (rare in web, but possible)
            // We treat this as negative or zero relative to click
            rawGrams = 0;
        }

        // Apply manual tare if set
        let displayWeight = Math.max(0, rawGrams - currentTare);

        // Round to integer
        displayWeight = Math.round(displayWeight);

        // Safety cap
        if (displayWeight > 500) {
            weightValueElement.style.color = '#ea5b0c';
            weightValueElement.innerText = "MAX";
        } else {
            weightValueElement.innerText = displayWeight;
        }
    }

    // Event Listeners

    // 1. The primary force change event
    document.addEventListener('webkitmouseforcechanged', (e) => {
        e.preventDefault();
        currentForce = e.webkitForce;
        updateDisplay(currentForce);
    });

    // 2. Mouse down - often the start of force events
    document.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.webkitForce) {
            currentForce = e.webkitForce;
            updateDisplay(currentForce);
        }
    });

    // 3. Mouse move - to detect initial touch before force
    document.addEventListener('mousemove', (e) => {
        // Just visual feedback that tracking is working
        if (e.webkitForce > 0) {
            currentForce = e.webkitForce;
            updateDisplay(currentForce);
        }
    });

    // 4. Reset on mouse up
    document.addEventListener('mouseup', () => {
        currentForce = 0;
        updateDisplay(0);
    });

    // 5. Handle "Force Click" specifically to prevent system lookups
    document.addEventListener('webkitmouseforcewillbegin', (e) => {
        e.preventDefault();
    });

    document.addEventListener('webkitmouseforcedown', (e) => {
        e.preventDefault();
    });

    // Prevent context menu
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Tare function
    tareBtn.addEventListener('click', () => {
        if (currentForce > 0) {
            let rawGrams = (currentForce / 3.0) * MAX_FORCE_GRAMS;
            currentTare = rawGrams;
            tareBtn.innerText = "已归零 / TARED";
        } else {
            currentTare = 0;
            tareBtn.innerText = "归零 / RESET";
        }

        updateDisplay(currentForce);

        setTimeout(() => {
            tareBtn.innerText = "归零 / TARE";
        }, 1000);
    });
});
