<?php
/**
 * Bosch Technologies — Testimonial Management
 *
 * Approve, reject, or delete testimonials by ID.
 * Protected by a secret admin key.
 *
 * Usage (via browser or curl):
 *   /api/manage-testimonial.php?key=YOUR_SECRET&action=approve&id=sinov8-2026-03-10
 *   /api/manage-testimonial.php?key=YOUR_SECRET&action=reject&id=some-id
 *   /api/manage-testimonial.php?key=YOUR_SECRET&action=delete&id=some-id
 *   /api/manage-testimonial.php?key=YOUR_SECRET&action=list  (shows all, including pending)
 *   /api/manage-testimonial.php?key=YOUR_SECRET&action=set-logo&id=company-id&logo=/assets/images/client-logos/logo.png
 *   /api/manage-testimonial.php?key=YOUR_SECRET&action=set-reference&id=company-id&ref=/testimonials/references/company-reference.pdf
 */

// ⚠️ CHANGE THIS to a strong secret key only you know
$admin_key = 'Gmmi@82831113';

header('Content-Type: application/json');

// Validate admin key
$key = $_GET['key'] ?? '';
if ($key !== $admin_key) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid admin key']);
    exit;
}

$action = $_GET['action'] ?? '';
$id = $_GET['id'] ?? '';

$json_file = __DIR__ . '/../data/testimonials.json';

if (!file_exists($json_file)) {
    echo json_encode(['error' => 'No testimonials file found']);
    exit;
}

$testimonials = json_decode(file_get_contents($json_file), true);
if (!is_array($testimonials)) {
    echo json_encode(['error' => 'Invalid testimonials data']);
    exit;
}

switch ($action) {
    case 'list':
        // Return all testimonials with their approval status
        $summary = array_map(function($t) {
            return [
                'id' => $t['id'],
                'name' => $t['name'],
                'company' => $t['company'],
                'service' => $t['service'],
                'approved' => $t['approved'],
                'date' => $t['date'],
            ];
        }, $testimonials);
        echo json_encode($summary, JSON_PRETTY_PRINT);
        break;

    case 'approve':
    case 'reject':
        if (empty($id)) {
            echo json_encode(['error' => 'Missing id parameter']);
            exit;
        }
        $found = false;
        foreach ($testimonials as &$t) {
            if ($t['id'] === $id) {
                $t['approved'] = ($action === 'approve');
                $found = true;
                break;
            }
        }
        unset($t);

        if (!$found) {
            echo json_encode(['error' => "Testimonial '{$id}' not found"]);
            exit;
        }

        file_put_contents($json_file, json_encode($testimonials, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        echo json_encode(['success' => true, 'action' => $action, 'id' => $id]);
        break;

    case 'set-logo':
        if (empty($id)) {
            echo json_encode(['error' => 'Missing id parameter']);
            exit;
        }
        $logo = $_GET['logo'] ?? '';
        if (empty($logo)) {
            echo json_encode(['error' => 'Missing logo parameter (e.g. /assets/images/client-logos/company-logo.png)']);
            exit;
        }
        $found = false;
        foreach ($testimonials as &$t) {
            if ($t['id'] === $id) {
                $t['logo'] = $logo;
                $found = true;
                break;
            }
        }
        unset($t);

        if (!$found) {
            echo json_encode(['error' => "Testimonial '{$id}' not found"]);
            exit;
        }

        file_put_contents($json_file, json_encode($testimonials, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        echo json_encode(['success' => true, 'action' => 'set-logo', 'id' => $id, 'logo' => $logo]);
        break;

    case 'set-reference':
        if (empty($id)) {
            echo json_encode(['error' => 'Missing id parameter']);
            exit;
        }
        $ref = $_GET['ref'] ?? '';
        if (empty($ref)) {
            echo json_encode(['error' => 'Missing ref parameter (e.g. /testimonials/references/company-reference.pdf)']);
            exit;
        }
        $found = false;
        foreach ($testimonials as &$t) {
            if ($t['id'] === $id) {
                $t['reference_pdf'] = $ref;
                $found = true;
                break;
            }
        }
        unset($t);

        if (!$found) {
            echo json_encode(['error' => "Testimonial '{$id}' not found"]);
            exit;
        }

        file_put_contents($json_file, json_encode($testimonials, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        echo json_encode(['success' => true, 'action' => 'set-reference', 'id' => $id, 'reference_pdf' => $ref]);
        break;

    case 'delete':
        if (empty($id)) {
            echo json_encode(['error' => 'Missing id parameter']);
            exit;
        }
        $original_count = count($testimonials);
        $testimonials = array_values(array_filter($testimonials, function($t) use ($id) {
            return $t['id'] !== $id;
        }));

        if (count($testimonials) === $original_count) {
            echo json_encode(['error' => "Testimonial '{$id}' not found"]);
            exit;
        }

        file_put_contents($json_file, json_encode($testimonials, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        echo json_encode(['success' => true, 'action' => 'delete', 'id' => $id]);
        break;

    default:
        echo json_encode(['error' => 'Invalid action. Use: list, approve, reject, delete, set-logo, or set-reference']);
}
