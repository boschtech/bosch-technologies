<?php
/**
 * Bosch Technologies — File to PDF Converter
 *
 * Converts uploaded reference letters (images, text, Word docs) to PDF.
 * PDFs are passed through as-is. Uses FPDF (no external dependencies).
 */

require_once __DIR__ . '/lib/fpdf.php';

/**
 * Convert an uploaded file to PDF and save it to the given output path.
 *
 * @param string $tmp_path  Temporary upload path ($_FILES[...]['tmp_name'])
 * @param string $original  Original filename ($_FILES[...]['name'])
 * @param string $out_path  Destination path (must end in .pdf)
 * @return bool|string      true on success, error message string on failure
 */
function convertToPdf($tmp_path, $original, $out_path) {
    $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));

    switch ($ext) {
        case 'pdf':
            return copy($tmp_path, $out_path) ? true : 'Failed to save PDF file.';

        case 'png':
        case 'jpg':
        case 'jpeg':
            return imageToPdf($tmp_path, $ext, $out_path);

        case 'txt':
            return textToPdf($tmp_path, $out_path);

        case 'doc':
        case 'docx':
            return docxToPdf($tmp_path, $ext, $out_path);

        default:
            return "Unsupported file type: .{$ext}";
    }
}

/**
 * Wrap an image (PNG/JPG) in a single-page PDF.
 */
function imageToPdf($img_path, $ext, $out_path) {
    try {
        $size = getimagesize($img_path);
        if (!$size) {
            return 'Could not read image dimensions.';
        }

        $img_w = $size[0];
        $img_h = $size[1];

        // Use A4 portrait by default
        $pdf = new FPDF('P', 'mm', 'A4');
        $pdf->SetMargins(10, 10, 10);
        $pdf->AddPage();

        // Scale image to fit page (190mm usable width, ~277mm usable height)
        $max_w = 190;
        $max_h = 277;
        $ratio = min($max_w / $img_w, $max_h / $img_h, 1);
        $w = $img_w * $ratio;
        $h = $img_h * $ratio;

        // Centre the image
        $x = (210 - $w) / 2;
        $y = (297 - $h) / 2;

        $type = ($ext === 'png') ? 'PNG' : 'JPG';
        $pdf->Image($img_path, $x, $y, $w, $h, $type);
        $pdf->Output('F', $out_path);

        return true;
    } catch (Exception $e) {
        return 'Image conversion failed: ' . $e->getMessage();
    }
}

/**
 * Render a plain text file as a PDF.
 */
function textToPdf($txt_path, $out_path) {
    try {
        $content = file_get_contents($txt_path);
        if ($content === false) {
            return 'Could not read text file.';
        }

        $content = mb_convert_encoding($content, 'ISO-8859-1', 'UTF-8');

        $pdf = new FPDF('P', 'mm', 'A4');
        $pdf->SetMargins(15, 15, 15);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 11);
        $pdf->MultiCell(180, 6, $content);
        $pdf->Output('F', $out_path);

        return true;
    } catch (Exception $e) {
        return 'Text conversion failed: ' . $e->getMessage();
    }
}

/**
 * Extract text from a .docx file and render it as a PDF.
 * .docx files are ZIP archives containing XML. We extract the body text.
 * .doc (legacy binary) files are not fully supported — we extract readable text.
 */
function docxToPdf($doc_path, $ext, $out_path) {
    try {
        if ($ext === 'docx') {
            $text = extractDocxText($doc_path);
        } else {
            // Legacy .doc — extract readable ASCII text
            $text = extractDocText($doc_path);
        }

        if ($text === false || trim($text) === '') {
            return 'Could not extract text from the document.';
        }

        $text = mb_convert_encoding($text, 'ISO-8859-1', 'UTF-8');

        $pdf = new FPDF('P', 'mm', 'A4');
        $pdf->SetMargins(15, 15, 15);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 11);
        $pdf->MultiCell(180, 6, $text);
        $pdf->Output('F', $out_path);

        return true;
    } catch (Exception $e) {
        return 'Document conversion failed: ' . $e->getMessage();
    }
}

/**
 * Extract plain text from a .docx (Office Open XML) file.
 */
function extractDocxText($path) {
    if (!class_exists('ZipArchive')) {
        return false;
    }

    $zip = new ZipArchive();
    if ($zip->open($path) !== true) {
        return false;
    }

    $xml = $zip->getFromName('word/document.xml');
    $zip->close();

    if (!$xml) {
        return false;
    }

    // Strip XML tags but preserve paragraph breaks
    $xml = str_replace('</w:p>', "\n\n", $xml);
    $xml = str_replace('</w:r>', ' ', $xml);
    $text = strip_tags($xml);

    // Clean up excessive whitespace
    $text = preg_replace('/[^\S\n]+/', ' ', $text);
    $text = preg_replace('/\n{3,}/', "\n\n", $text);

    return trim($text);
}

/**
 * Extract readable text from a legacy .doc (binary) file.
 * This is a best-effort extraction of ASCII text content.
 */
function extractDocText($path) {
    $content = file_get_contents($path);
    if ($content === false) {
        return false;
    }

    // Extract printable ASCII runs of 20+ chars (heuristic for .doc binary)
    preg_match_all('/[\x20-\x7E]{20,}/', $content, $matches);

    if (empty($matches[0])) {
        return false;
    }

    return implode("\n", $matches[0]);
}
