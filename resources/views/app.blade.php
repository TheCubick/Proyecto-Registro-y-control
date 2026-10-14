<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/global.png">
    @unless (app()->environment('testing'))
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @endunless
    @inertiaHead
</head>
<body class="bg-gray-50 text-gray-900 antialiased">
    @inertia
</body>
</html>
