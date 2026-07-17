// PM2 process file. Deploy runs: pm2 startOrReload ecosystem.config.cjs --update-env
module.exports = {
  apps: [
    {
      name: "cwh",
      script: ".output/server/index.mjs",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOST: "127.0.0.1",
        LEADS_BACKEND: "sqlite",
        LEADS_DB_PATH: "/var/lib/cwh/leads.db",
        LEADS_JSONL_PATH: "/var/lib/cwh/leads.jsonl",
      },
    },
  ],
};
