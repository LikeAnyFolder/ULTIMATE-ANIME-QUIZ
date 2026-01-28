# 📖 Guía de Despliegue en GitHub Pages

Este documento explica cómo desplegar **Ultimate Anime Quiz** en GitHub Pages en 5 minutos.

---

## 🚀 Pasos Rápidos

### Paso 1: Preparar Git
```bash
# Navega a la carpeta del proyecto
cd anime-quiz

# Inicializa repositorio (si no lo está)
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### Paso 2: Crear Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `anime-quiz`
3. Descripción: "Ultimate Anime Quiz - Plataforma de minijuegos de anime"
4. Público ✓
5. **NO** inicialices con README (ya lo tenemos)
6. Clic en "Create repository"

### Paso 3: Subir Código

```bash
# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Ultimate Anime Quiz - Frontend minigames platform"

# Conectar con GitHub (reemplaza USUARIO)
git remote add origin https://github.com/USUARIO/anime-quiz.git

# Subir (main es la rama por defecto en git moderno)
git branch -M main
git push -u origin main
```

### Paso 4: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings**
3. En el menú izquierdo, ve a **Pages**
4. Bajo "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **/root** ← importante
5. Clic en **Save**
6. Espera 1-2 minutos mientras GitHub construye la página
7. ¡Verás una notificación verde diciendo que la página está publicada!

---

## 🌐 Acceso

Tu sitio estará disponible en:

```
https://TU_USUARIO.github.io/anime-quiz
```

Ejemplo si tu usuario es `alice`:
```
https://alice.github.io/anime-quiz
```

---

## 📝 Actualizar Contenido

Cuando hagas cambios locales:

```bash
# Editar archivos...

# Guardar cambios
git add .
git commit -m "Descripción del cambio"
git push origin main
```

GitHub Pages se actualizará automáticamente en 2-3 minutos.

---

## 🔧 Solucionar Problemas

### "404 Not Found" en la página

1. Verifica que el repositorio sea **público**
2. Revisa que Pages esté habilitado en Settings
3. Asegúrate de haber puesto `main` y `/root` en Pages
4. Espera 2-3 minutos después de hacer push

### "CSS no carga" o "Imágenes rotas"

GitHub Pages maneja las rutas correctamente si:
- La estructura de carpetas es igual a la local
- Los archivo están en la rama `main`
- Las rutas comienzan con `/` (relativo)

Ejemplo correcto:
```html
<link rel="stylesheet" href="css/style.css">
<img src="assets/images/character.jpg">
```

### El juego funciona en local pero no en GitHub

1. Abre DevTools (F12) → Console
2. Revisa si hay errores de CORS
3. Asegúrate que `localStorage` esté habilitado
4. Borra cache del navegador (Ctrl+Shift+Supr)

---

## 📊 Estadísticas

Puedes ver estadísticas de tu sitio en GitHub:

1. Settings → Pages
2. Desplázate a "GitHub Pages"
3. Haz clic en "View deployment"
4. Verás visitas y estadísticas

---

## 🔐 Seguridad

### ✅ Qué es seguro
- El código es público (está en GitHub)
- Los datos SOLO se guardan localmente
- NO se envía nada a servidores

### ⚠️ Consideraciones
- No guardes secretos en el código
- Los usuarios pueden ver el código
- localStorage no es seguro para datos sensibles

---

## 🚀 Dominio Personalizado (Opcional)

Si tienes dominio propio:

1. Settings → Pages
2. Bajo "Custom domain", ingresa tu dominio
3. Sigue las instrucciones para actualizar DNS

---

## 📱 Compartir

Una vez publicado, puedes compartir:

```markdown
**Juega aquí**: https://usuario.github.io/anime-quiz

🎮 Minijuegos de anime con datos verificables
✅ 100% Frontend • 🔒 Privado • 📱 Responsivo
```

---

## 💡 Tips Avanzados

### Usar un nombre de rama diferente

Si prefieres `gh-pages` en vez de `main`:

```bash
git checkout -b gh-pages
git push -u origin gh-pages
```

Luego en Settings → Pages, selecciona `gh-pages`

### Automatizar actualizaciones

Puedes crear un GitHub Action para deploy automático:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/upload-artifact@v2
```

(Para este proyecto simple no es necesario)

### Monitorizar cambios

```bash
# Ver historial de pushes
git log --oneline

# Ver estado
git status
```

---

## 🎓 Recursos

- [Documentación oficial GitHub Pages](https://docs.github.com/en/pages)
- [Git para principiantes](https://git-scm.com/book/es/v2)
- [Markdown básico](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github)

---

## ❓ FAQ

**P: ¿Puedo cambiar la URL?**
R: Sí, usando un dominio personalizado (ver sección arriba)

**P: ¿Cuánto cuesta?**
R: GitHub Pages es GRATIS para repositorios públicos

**P: ¿Se puede hacer privado después?**
R: Sí, pero GitHub Pages en repos privados requiere plan GitHub Pro

**P: ¿Se borran mis datos si hago repo privado?**
R: Los datos están en `localStorage` del navegador, no en GitHub

**P: ¿Puedo agregar un chat o API?**
R: Necesitarías un backend. Este proyecto es 100% frontend.

---

**¡Listo! Tu sitio estará online en minutos.** 🚀

Cualquier duda, revisa [GitHub Docs](https://docs.github.com)
