# TanStack Start With NextJS Routing

This repository shows how to setup TanStack Start, so that it has the same routing as NextJS's app router: using `page.tsx`and `layout.tsx` files.

## Demo

Watch the demo here: [https://www.youtube.com/VqdcCq-Gtd8](https://www.youtube.com/embed/VqdcCq-Gtd8)

## Project Structure

- `nextjs`: Reference Application
- `tanstack-start-default-routing`: Migrated Application, using TanStack Start's default routing.
- `tanstack-start-nextjs-routing`: Migrated application, using TanStack Start, but with NextJS's routing system.

## TLDR

To configure TanStack Start, so that it handles `page.tsx`and `layout.tsx` files, adjust your `vite.config.ts` file as follows

```diff
//...

const config = defineConfig({
  plugins: [
    // [...]
    tanstackStart({
+      router: {
+        indexToken: "page",
+        routeToken: "layout",
+        routesDirectory: "app"
+      }
    }),
  ],
})

export default config
```
