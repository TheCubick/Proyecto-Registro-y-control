# ─────────────────────────────────────────────────────────────────────────────
# Sistema de Registro y Control de Accesos
# Imagen de producción para Render (plan gratuito): PHP 8.4 + Apache + Node.js LTS
# ─────────────────────────────────────────────────────────────────────────────
FROM php:8.4-apache

# Versión LTS de Node.js usada para compilar el frontend (React + Vite)
ARG NODE_MAJOR=22

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_MEMORY_LIMIT=-1 \
    APACHE_DOCUMENT_ROOT=/var/www/html/public

# 1. Dependencias del sistema y extensiones de PHP (PostgreSQL, zip, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        gnupg \
        git \
        unzip \
        zip \
        libpq-dev \
        libzip-dev \
        libonig-dev \
        libxml2-dev \
        libpng-dev \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        mbstring \
        zip \
        bcmath \
        exif \
        pcntl \
        gd \
    && rm -rf /var/lib/apt/lists/*

# 2. Node.js LTS + NPM (repositorio oficial de NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && node -v && npm -v

# 3. Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Apache: DocumentRoot en /public y mod_rewrite para las rutas de Laravel
#    (docker-php.conf de la imagen oficial ya habilita AllowOverride All en ese directorio)
RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && echo 'ServerName localhost' > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername \
    && a2enmod rewrite

WORKDIR /var/www/html

# 5a. Dependencias de PHP (capa en caché mientras no cambie composer.lock)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts --no-autoloader

# 5b. Dependencias de JS (capa en caché mientras no cambie package-lock.json)
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

# 5c. Código del proyecto, autoload optimizado y compilación del frontend
COPY . .
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader \
    && npm run build \
    && test -f public/build/manifest.json

# 6. Permisos para el usuario de Apache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80

# 7. Arranque: migraciones automáticas (Render Free no permite Pre-Deploy Command) + Apache
CMD php artisan migrate --force && apache2-foreground
