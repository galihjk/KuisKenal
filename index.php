<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telegram Bot Long Polling</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Telegram Bot Long Polling</h1>
        <div class="mb-3">
            <label for="botToken" class="form-label">Bot Token</label>
            <input type="text" class="form-control" id="botToken" placeholder="Enter your bot token">
        </div>
        <div class="mb-3">
            <span>Status: </span><strong id="status" class="text-secondary">Not Started</strong>
        </div>
        <button id="startServer" class="btn btn-primary">Start Server</button>
        <button id="stopServer" class="btn btn-danger" disabled>Stop Server</button>
        <div class="mt-4">
            <h3>Incoming Messages</h3>
            <ul id="messages" class="list-group"></ul>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/app.js?v=<?php echo time(); ?>"></script>
</body>
</html>
