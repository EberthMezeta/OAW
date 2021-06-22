# OAW
### In this branch we optimized the server-side by configuring some Apaches files

# Configured Files
### 📎httpd.conf
Activate the following lines:
```
LoadModule deflate_module modules/mod_deflate.so
LoadModule filter_module modules/mod_filter.so
LoadModule expires_module modules/mod_expires.so
```
Add the next lines in the file:
```
<IfModule mod_expires.c>
ExpiresActive On
ExpiresDefault "access plus 4 weeks"
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```
### 📎php.ini
Here we active the Gzip compression by adding the following lines in the file
```
zlib.output_compression = On
zlib.output_compression_level = 9
allow_url_fopen = On  
```
### ♻️ Once done restart the Apache server.

# Example of how it works
 ![Working](https://raw.githubusercontent.com/The-WebOnes/OAW/main/docs/How_It_Works.gif)
