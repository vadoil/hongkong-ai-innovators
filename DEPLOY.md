# CWH.HK — Deploy на Ubuntu 24 VPS

Целевой сервер: `192.142.51.83` · Домен: `cwh.hk` · Стек: Node 20 + PM2 + nginx + Let's Encrypt.

Автодеплой: `push` в `main` на GitHub → Actions по SSH запускает `deploy/scripts/server-deploy.sh` на VPS (git pull → build → PM2 reload).

---

## 1. Первичная настройка сервера (один раз)

SSH под root:

```bash
apt update && apt upgrade -y
apt install -y curl git build-essential ufw nginx certbot python3-certbot-nginx

# deploy-юзер
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
echo "deploy ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/deploy
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
# положи публичный SSH-ключ, который потом уйдёт в GitHub Secrets:
#   nano /home/deploy/.ssh/authorized_keys   (chmod 600)
chown -R deploy:deploy /home/deploy/.ssh

# firewall
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw --force enable
```

Дальше — под `deploy`:

```bash
su - deploy

# Node 20 LTS + npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Bun
curl -fsSL https://bun.sh/install | bash
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc

# PM2
sudo npm i -g pm2
pm2 startup systemd -u deploy --hp /home/deploy
# → выполни sudo-команду, которую он напечатает
```

---

## 2. Первый clone и запуск

```bash
sudo mkdir -p /var/www/cwh && sudo chown deploy:deploy /var/www/cwh
git clone https://github.com/vadoil/hongkong-ai-innovators.git /var/www/cwh
cd /var/www/cwh
chmod +x deploy/scripts/server-deploy.sh
bash deploy/scripts/server-deploy.sh
```

Проверка: `curl -I http://127.0.0.1:3000` → `200`.

---

## 3. nginx + SSL

Быстрый вариант — одной командой на VPS из папки проекта:

```bash
cd /var/www/cwh
bash deploy/scripts/setup-ssl.sh
```

Скрипт откроет `80/443`, поставит nginx/certbot, подключит конфиг, выпустит сертификат Let's Encrypt и включит редирект HTTP → HTTPS.

Ручной вариант:

```bash
sudo cp /var/www/cwh/deploy/nginx/cwh.hk.conf /etc/nginx/sites-available/cwh.hk
sudo ln -sf /etc/nginx/sites-available/cwh.hk /etc/nginx/sites-enabled/cwh.hk
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# важно: HTTPS не заработает, если 443 закрыт firewall'ом
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 'Nginx Full'

# DNS: A cwh.hk и A www.cwh.hk → 192.142.51.83 (должно уже резолвиться)
sudo certbot --nginx -d cwh.hk -d www.cwh.hk --redirect --agree-tos -m admin@cwh.hk --no-eff-email
```

Certbot сам допишет HTTPS-блок и настроит auto-renew (`certbot.timer`).

---

## 4. GitHub Actions секреты

`Settings → Secrets and variables → Actions`:

| Secret        | Значение                                         |
| ------------- | ------------------------------------------------ |
| `VPS_HOST`    | `192.142.51.83`                                  |
| `VPS_USER`    | `deploy`                                         |
| `VPS_SSH_KEY` | приватный ключ полностью (`-----BEGIN...`)       |
| `VPS_PORT`    | `22`                                             |

Ключи:

```bash
ssh-keygen -t ed25519 -C "gh-actions-cwh" -f ~/.ssh/cwh_deploy
# .pub → /home/deploy/.ssh/authorized_keys на VPS
# приватный → в GitHub Secret VPS_SSH_KEY
```

После этого `git push origin main` → авто-деплой.

---

## 5. Заявки с формы контактов

SQLite: `/var/lib/cwh/leads.db`, таблица `leads`.
Fallback (если native-модуль не встал): JSONL `/var/lib/cwh/leads.jsonl`.

```bash
sudo apt install -y sqlite3
sqlite3 /var/lib/cwh/leads.db \
  "SELECT id,created_at,name,email,budget_range FROM leads ORDER BY id DESC LIMIT 20;"
```

Бэкап:

```bash
cp /var/lib/cwh/leads.db /var/lib/cwh/leads-$(date +%F).db
```

---

## 6. Операционка

```bash
pm2 status
pm2 logs cwh --lines 200
pm2 restart cwh
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Rollback: `cd /var/www/cwh && git reset --hard <sha> && bash deploy/scripts/server-deploy.sh`

---

## Ключевые моменты

- Сборка через `NITRO_PRESET=node-server` → `.output/server/index.mjs`, слушает `127.0.0.1:3000`.
- Никакого Supabase — всё автономно на VPS в Гонконге. Российские клиенты видят сайт нормально.
- SSL продлевается сам (`certbot.timer`).
