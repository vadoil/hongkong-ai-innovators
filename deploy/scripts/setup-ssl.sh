#!/usr/bin/env bash
# One-time HTTPS setup for cwh.hk on the VPS.
# Run on the server as deploy/root: bash deploy/scripts/setup-ssl.sh
set -euo pipefail

DOMAIN="${DOMAIN:-cwh.hk}"
WWW_DOMAIN="${WWW_DOMAIN:-www.cwh.hk}"
EMAIL="${CERTBOT_EMAIL:-admin@cwh.hk}"
APP_DIR="${APP_DIR:-/var/www/cwh}"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"

echo "==> install nginx + certbot"
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx ufw

echo "==> open firewall ports 80/443"
sudo ufw allow OpenSSH || true
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 'Nginx Full' || true
sudo ufw --force enable || true

echo "==> install nginx HTTP config"
sudo mkdir -p /var/www/certbot
sudo cp "${APP_DIR}/deploy/nginx/cwh.hk.conf" "${NGINX_SITE}"
sudo ln -sf "${NGINX_SITE}" "/etc/nginx/sites-enabled/${DOMAIN}"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "==> issue / renew Let's Encrypt certificate and force HTTPS redirect"
sudo certbot --nginx \
  -d "${DOMAIN}" \
  -d "${WWW_DOMAIN}" \
  --redirect \
  --agree-tos \
  -m "${EMAIL}" \
  --no-eff-email \
  --non-interactive

echo "==> verify nginx + certbot renewal"
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable --now certbot.timer >/dev/null 2>&1 || true
sudo certbot renew --dry-run

echo "==> local checks"
curl -I --max-time 10 "http://${DOMAIN}" || true
curl -I --max-time 10 "https://${DOMAIN}" || true

echo "==> HTTPS setup complete for ${DOMAIN}"