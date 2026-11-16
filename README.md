# Next.js starter

Шаблон настроек: Next.js 16, React 19, TypeScript strict, SCSS, Biome, Stylelint, pnpm 12, Node.js 26 LTS и Docker.

```bash
pnpm install
pnpm dev
```

`app/page.tsx` — пустая стартовая страница. UI, фичи, виджеты и библиотеки добавляются под конкретный проект.

Переменные задаются в `.env` и читаются в `app/config.ts`. Примеры — в `.env.example`; без `.env` используются значения по умолчанию. Стили — в `app/globals.scss`. Публичные env-переменные фиксируются при сборке. Для публикации укажи домен проекта и `SITE_NOINDEX=false`.

Структура FSD сохранена пустыми слоями в `src/`:

```text
src/
  _app/
  _pages/
  widgets/
  features/
  entities/
  shared/
```

Алиасы слоёв настроены в `tsconfig.json`; `@app/*` указывает на корневой `app/`, `@fsd-app/*` — на `src/_app/`. Роутинг Next.js находится в корневом `app/`. Файлы `.gitkeep` сохраняют пустые слои в Git.

```bash
pnpm build
pnpm start
pnpm lint
pnpm lint:styles:fix
pnpm format
pnpm analyze
```

После анализа выполни `pnpm build` перед `pnpm start`.

Для Docker:

```bash
docker compose up --build -d
```

Standalone-сборка и статика настраиваются в Dockerfile. На VPS сервер доступен на `127.0.0.1:3000`; перед ним нужен Nginx/Caddy с HTTPS. При использовании streaming отключи буферизацию прокси.

Проверка безопасности:

```bash
pnpm audit
pnpm dlx react-doctor@0.9.23 --yes --scope full --no-telemetry --no-supply-chain
```

React Doctor проверяет код, `pnpm audit` — известные уязвимости зависимостей. HTTP-заголовки настроены в `next.config.ts`: запрет встраивания в iframe, `nosniff`, Referrer-Policy, Permissions-Policy и базовая CSP. HSTS включается в production при HTTPS-домене в `NEXT_PUBLIC_SITE_URL`; редирект HTTP → HTTPS настраивается на reverse proxy.

Базовая CSP ограничивает `base-uri`, `object-src`, `frame-ancestors` и `form-action`. Она не ограничивает скрипты и не даёт полной защиты от XSS: `script-src` и остальные источники настраиваются под проект. CSP с nonce требует динамического рендеринга и несовместима с PPR. При добавлении API, Server Actions и авторизации нужны серверная валидация, проверка прав, ограничение частоты запросов и безопасные cookies; сканеры эти проверки не заменяют.

Для проверки клиентских сайтов используются отдельные инструменты на ПК. Установка на Windows:

```bash
winget install --id Gitleaks.Gitleaks --exact --source winget --scope user
npm install --global --allow-scripts=puppeteer,esbuild,vue-demi unlighthouse@0.19.1
```

После установки открой новый терминал, чтобы обновился PATH. Команды из корня проекта:

```bash
pnpm audit:secrets
pnpm audit:site --site http://localhost:3000
```

`audit:secrets` проверяет историю коммитов перед пушем и скрывает значения найденных секретов. `audit:site` запускает Unlighthouse для указанного сайта; локально проверяй production-сборку после `pnpm build` и `pnpm start`. Отчёты `.unlighthouse/` исключены из Git и Docker. Инструменты установлены отдельно от зависимостей приложения.

Проверка производительности имеет смысл после добавления контента: пустая стартовая страница может возвращать `NO_FCP` в Lighthouse.

Для ручной проверки доступности установи [axe DevTools от Deque](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd), открой сайт и панель расширения в DevTools браузера.
