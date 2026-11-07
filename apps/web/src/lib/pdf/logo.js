/**
 * Loads the Bosch Technologies logo as a small, downscaled PNG data URL
 * suitable for embedding in generated PDFs.
 *
 * The source asset (/images/logo.png) is ~2675x1569px. jsPDF embeds
 * addImage() bitmaps uncompressed, so drawing the full-resolution image
 * straight onto a canvas and passing that to toDataURL() previously
 * produced 15-17MB PDFs. Downscaling to a print-appropriate resolution
 * (roughly 300 DPI at a ~28mm print height) before embedding keeps output
 * PDFs in the tens-to-hundreds-of-KB range instead.
 */
export async function loadCompressedLogo(src = "/images/logo.png") {
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
      logoImg.src = src;
    });
    const logoAspect = logoImg.naturalWidth / logoImg.naturalHeight;
    const targetH = 340;
    const targetW = Math.round(targetH * logoAspect);
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(logoImg, 0, 0, targetW, targetH);
    return { logoDataUrl: canvas.toDataURL("image/png"), logoAspect };
  } catch {
    return { logoDataUrl: null, logoAspect: 1 };
  }
}
