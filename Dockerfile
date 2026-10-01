FROM php:8.3-apache

# 1. Instalamos dependencias y extensiones (incluyendo pdo_pgsql para PostgreSQL)
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
    && rm -rf /var/lib/apt/lists/*

# 2. Traemos Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 3. Copiamos solo los archivos de Composer primero para aprovechar el caché
COPY composer.json composer.lock ./

# 4. Liberamos la memoria RAM para que Render no mate el proceso
ENV COMPOSER_MEMORY_LIMIT=-1

# 5. Instalamos dependencias IGNORANDO la validación estricta de extensiones
RUN composer install \
    --no-interaction \
    --prefer-dist \
    --no-progress \
    --optimize-autoloader \
    --no-dev \
    --no-scripts \
    --ignore-platform-reqs

# 6. Copiamos todo el resto del código del proyecto
COPY . .

# 7. Actualizamos el Autoload
RUN composer dump-autoload \
    --no-interaction \
    --no-dev \
    --optimize

# 8. Configuramos Apache para que apunte a la carpeta /public de Laravel y damos permisos
RUN sed -i 's#DocumentRoot /var/www/html#DocumentRoot /var/www/html/public#' \
    /etc/apache2/sites-available/000-default.conf \
    && printf '%s\n' \
        '<Directory /var/www/html/public>' \
        '    AllowOverride All' \
        '    Require all granted' \
        '</Directory>' \
    >> /etc/apache2/sites-available/000-default.conf \
    && a2enmod rewrite \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]
