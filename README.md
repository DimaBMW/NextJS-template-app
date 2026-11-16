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
