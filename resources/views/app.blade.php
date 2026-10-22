<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/global.png">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />
    @unless (app()->environment('testing'))
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @endunless
    @inertiaHead
</head>
<body class="bg-canvas text-ink antialiased">
    @inertia
</body>
</html>
