# Design Bomb — reconstrução React

Reconstrução fidelity-first em React + Vite a partir da cópia HTTrack fornecida.

## Rodar
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

As páginas originais espelhadas ficam em `public/mirror/`. O React controla as rotas principais e mantém o HTML/CSS/JS/Framer original dentro do frame para preservar animações, responsividade e interações com máxima fidelidade.

Observação: o snapshot ainda referencia alguns bundles/fontes remotos do Framer. Para independência total do Framer, esses efeitos precisam ser reimplementados componente a componente em React/CSS/JS.
