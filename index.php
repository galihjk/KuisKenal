<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kuis Kenal</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1 class="mt-5">Kuis Kenal</h1>
        <div id="bot-token-section" class="mb-4">
            <input type="text" id="bot-token" class="form-control" placeholder="Masukkan token bot">
            <button id="start-button" class="btn btn-success mt-2">Start</button>
            <button id="stop-button" class="btn btn-danger mt-2" disabled>Stop</button>
        </div>
        <div id="status-section" class="mb-4">
            <h4>Status: <span id="status-label" class="badge bg-secondary">Stopped</span></h4>
        </div>
        <input type="checkbox" id="virtualPlayer">
        <div id="log-section">
            <h4>Log:</h4>
            <div id="log-container" class="border p-2" style="height: 300px; overflow-y: auto;">
                <!-- Logs will be shown here -->
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
        $folderPath = 'assets/js/';
        if ($handle = opendir($folderPath)) {
            while (false !== ($file = readdir($handle))) {
                // Mengecek apakah file berakhiran .js
                if (pathinfo($file, PATHINFO_EXTENSION) == 'js') {
                    // Mendapatkan waktu modifikasi file
                    $modifiedTime = filemtime($folderPath . $file);
                    // Menambahkan versi ke dalam URL skrip
                    $versionedFile = $folderPath . $file . '?v=' . $modifiedTime;
                    // Menyisipkan tag script
                    echo '<script src="' . $versionedFile . '"></script>' . PHP_EOL;
                }
            }
            // Menutup folder setelah selesai
            closedir($handle);
        }
    ?>
</body>
</html>
