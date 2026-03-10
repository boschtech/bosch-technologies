<?php
/**
 * Bosch Technologies. Form Handler
 * Handles both contact form submissions and assessment lead captures.
 * Compatible with Hostinger shared hosting (PHP 7.4+).
 *
 * CONFIGURATION: Update the $to_email variable below with your actual email.
 */

// --- Configuration ---
$to_email = 'admin@boschtechnologies.com'; // ← Change this to your email
$site_name = 'Bosch Technologies';

// --- CORS headers (for AJAX submissions) ---
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// --- Determine form type ---
$form_type = isset($_POST['form_type']) ? $_POST['form_type'] : 'assessment';

// --- Sanitize inputs ---
function clean($value) {
    return htmlspecialchars(strip_tags(trim($value)));
}

$name = clean($_POST['name'] ?? '');
$email = clean($_POST['email'] ?? '');
$company = clean($_POST['company'] ?? '');

// --- Validate required fields ---
if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// --- Build email based on form type ---
if ($form_type === 'testimonial') {
    // Testimonial submission
    require_once __DIR__ . '/convert-to-pdf.php';

    $role = clean($_POST['role'] ?? '');
    $service = clean($_POST['service'] ?? '');
    $testimonial_text = clean($_POST['testimonial'] ?? '');

    // Handle reference letter upload and convert to PDF
    $reference_pdf_url = '';
    $ref_error = '';
    if (isset($_FILES['reference_letter']) && $_FILES['reference_letter']['error'] === UPLOAD_ERR_OK) {
        $max_size = 5 * 1024 * 1024; // 5 MB
        if ($_FILES['reference_letter']['size'] > $max_size) {
            $ref_error = 'Reference letter exceeds 5 MB limit.';
        } else {
            $allowed_ext = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'txt'];
            $orig_name = $_FILES['reference_letter']['name'];
            $ext = strtolower(pathinfo($orig_name, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowed_ext)) {
                $ref_error = 'Unsupported file type.';
            } else {
                // Build safe filename: company-name-timestamp.pdf
                $safe_company = preg_replace('/[^a-zA-Z0-9-]/', '-', strtolower($company));
                $safe_company = preg_replace('/-+/', '-', trim($safe_company, '-'));
                $timestamp = date('Y-m-d');
                $pdf_filename = "{$safe_company}-reference-{$timestamp}.pdf";

                $upload_dir = __DIR__ . '/../testimonials/references/';
                if (!is_dir($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }

                $out_path = $upload_dir . $pdf_filename;
                $result = convertToPdf($_FILES['reference_letter']['tmp_name'], $orig_name, $out_path);

                if ($result === true) {
                    $reference_pdf_url = "/testimonials/references/{$pdf_filename}";
                } else {
                    $ref_error = $result;
                }
            }
        }
    }

    // Handle company logo upload
    $logo_saved = '';
    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
        $logo_max = 2 * 1024 * 1024; // 2 MB
        if ($_FILES['logo']['size'] <= $logo_max) {
            $logo_ext = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));
            if (in_array($logo_ext, ['png', 'jpg', 'jpeg', 'svg'])) {
                $safe_company = preg_replace('/[^a-zA-Z0-9-]/', '-', strtolower($company));
                $safe_company = preg_replace('/-+/', '-', trim($safe_company, '-'));
                $logo_filename = "{$safe_company}-logo.{$logo_ext}";

                $logo_dir = __DIR__ . '/../assets/images/client-logos/';
                if (!is_dir($logo_dir)) {
                    mkdir($logo_dir, 0755, true);
                }

                if (move_uploaded_file($_FILES['logo']['tmp_name'], $logo_dir . $logo_filename)) {
                    $logo_saved = "/assets/images/client-logos/{$logo_filename}";
                }
            }
        }
    }

    // --- Save to testimonials.json ---
    $json_file = __DIR__ . '/../data/testimonials.json';
    $testimonials = file_exists($json_file) ? json_decode(file_get_contents($json_file), true) : [];
    if (!is_array($testimonials)) $testimonials = [];

    $safe_id = preg_replace('/[^a-z0-9-]/', '-', strtolower($company));
    $safe_id = preg_replace('/-+/', '-', trim($safe_id, '-'));

    $testimonials[] = [
        'id' => $safe_id . '-' . date('Y-m-d-His'),
        'name' => $name,
        'role' => $role,
        'company' => $company,
        'email' => $email,
        'service' => $service,
        'testimonial' => $testimonial_text,
        'logo' => $logo_saved,
        'reference_pdf' => $reference_pdf_url,
        'approved' => false,
        'date' => date('Y-m-d'),
    ];

    file_put_contents($json_file, json_encode($testimonials, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

    $subject = "New Testimonial Submission from {$name} ({$company})";
    $ref_line = $reference_pdf_url ? "<tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Reference Letter:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='https://boschtechnologies.com{$reference_pdf_url}'>View PDF</a></td></tr>" : '';
    $logo_line = $logo_saved ? "<tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Logo:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='https://boschtechnologies.com{$logo_saved}'>View Logo</a></td></tr>" : '';
    $err_line = $ref_error ? "<tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; color: red;'>Upload Note:</td><td style='padding: 8px; border-bottom: 1px solid #eee; color: red;'>{$ref_error}</td></tr>" : '';

    $body = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2 style='color: #0f4c81;'>New Testimonial Submission</h2>
        <table style='border-collapse: collapse; width: 100%; max-width: 600px;'>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Name:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$name}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Role:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$role}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Company:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$company}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Email:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='mailto:{$email}'>{$email}</a></td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Service:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$service}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #eee;'>Testimonial:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$testimonial_text}</td></tr>
            {$ref_line}
            {$logo_line}
            {$err_line}
        </table>
    </body>
    </html>";

} elseif ($form_type === 'contact') {
    // Contact form submission
    $service = clean($_POST['service'] ?? '');
    $message = clean($_POST['message'] ?? '');

    $subject = "New Contact Enquiry from {$name}";
    $body = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2 style='color: #0f4c81;'>New Contact Form Submission</h2>
        <table style='border-collapse: collapse; width: 100%; max-width: 600px;'>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Name:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$name}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Email:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='mailto:{$email}'>{$email}</a></td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Company:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$company}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Service:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$service}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; vertical-align: top;'>Message:</td><td style='padding: 8px;'>{$message}</td></tr>
        </table>
    </body>
    </html>";

} else {
    // Assessment lead capture
    $overall_score = clean($_POST['overall_score'] ?? '');
    $overall_level = clean($_POST['overall_level'] ?? '');
    $dimensions = $_POST['dimensions'] ?? '';
    $answers = $_POST['answers'] ?? '';

    $subject = "New Assessment Lead: {$name} — Level {$overall_level} ({$overall_score}/5.0)";

    // Parse dimension scores for display
    $dim_html = '';
    if ($dimensions) {
        $dims = json_decode($dimensions, true);
        if ($dims) {
            foreach ($dims as $id => $data) {
                $score = $data['score'] ?? 'N/A';
                $title = $data['title'] ?? $id;
                $dim_html .= "<tr><td style='padding: 6px 8px; border-bottom: 1px solid #eee;'>{$title}</td><td style='padding: 6px 8px; border-bottom: 1px solid #eee; font-weight: bold;'>{$score} / 5.0</td></tr>";
            }
        }
    }

    $body = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2 style='color: #0f4c81;'>New Assessment Lead</h2>
        <table style='border-collapse: collapse; width: 100%; max-width: 600px;'>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Name:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$name}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Email:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='mailto:{$email}'>{$email}</a></td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Company:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{$company}</td></tr>
            <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Overall Score:</td><td style='padding: 8px; border-bottom: 1px solid #eee; font-size: 18px; color: #00b894; font-weight: bold;'>{$overall_score} / 5.0 (Level {$overall_level})</td></tr>
        </table>

        <h3 style='color: #0f4c81; margin-top: 20px;'>Dimension Scores</h3>
        <table style='border-collapse: collapse; width: 100%; max-width: 600px;'>
            {$dim_html}
        </table>

        <p style='margin-top: 20px; color: #6c757d; font-size: 12px;'>This lead was captured via the Bosch Technologies Maturity Assessment tool.</p>
    </body>
    </html>";
}

// --- Send email ---
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    "From: {$site_name} <noreply@boschtechnologies.com>",
    "Reply-To: {$email}",
];

$sent = mail($to_email, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Submission received']);
} else {
    // Log the error for debugging on Hostinger
    error_log("Failed to send email to {$to_email} from form submission by {$email}");
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Please try again.']);
}

// --- Optional: Save to CSV file as backup ---
$csv_file = __DIR__ . '/../data/leads.csv';
$csv_dir = dirname($csv_file);

if (!is_dir($csv_dir)) {
    mkdir($csv_dir, 0755, true);
}

$csv_data = [
    date('Y-m-d H:i:s'),
    $form_type,
    $name,
    $email,
    $company,
    $form_type === 'assessment' ? ($overall_score ?? '') : '',
    $form_type === 'assessment' ? ($overall_level ?? '') : '',
    $form_type === 'contact' ? ($service ?? '') : '',
    $form_type === 'contact' ? ($message ?? '') : '',
];

$fp = fopen($csv_file, 'a');
if ($fp) {
    // Write header if file is new
    if (filesize($csv_file) === 0 || !file_exists($csv_file)) {
        fputcsv($fp, ['Date', 'Type', 'Name', 'Email', 'Company', 'Score', 'Level', 'Service', 'Message']);
    }
    fputcsv($fp, $csv_data);
    fclose($fp);
}
?>
