# AGENTS.md - Reglas del Proyecto

## Tech Stack

- Frontend: astro 5.16 con TypeScript, Tailwind 4.1, react 19.2.0.
- Backend: sanity.
- Deployment: netlify para frontend, Sanity para backend.

## Comandos Útiles
- Instalar: `pnpm install`
- Test: `pnpm test`
- Build: `pnpm build`
- Dev: `pnpm dev`

## Guía de Estilo y Reglas

- Usa Tailwind CSS para estilos, evitando CSS en línea o archivos CSS separados.
- **Nunca** uses `any` en TypeScript; define tipos específicos.
- Mantén los componentes pequeños y reutilizables.
- **Nunca** uses librerías externas para componentes simples si puedes usar Tailwind.
- Los mensajes de commit deben seguir el estándar `Conventional Commits`.
- **Siempre** los commits en ingles.
