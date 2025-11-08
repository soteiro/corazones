# Guía Inicial de Configuración de Sanity para "Sueños Abrigados"

## 📋 Contexto
Según el documento de requerimientos, necesitas un **panel de control personal** fácil de usar para gestionar tu galería de productos tejidos. Sanity será ese panel de control (CMS - Content Management System).

## 🎯 Objetivos de la Configuración

El sistema debe permitir gestionar:
- **Productos**: Con nombre, fotos, descripción, categoría, precio, estado (Disponible/Vendido/Hecho a pedido), etiquetas y marca de "destacado"
- **Categorías**: Bufandas, Gorros, Chalecos, Para bebés, etc.
- **Contenido de páginas**: Sobre Mí, página de inicio
- **Configuración general**: Logo, enlaces de contacto (WhatsApp, Instagram)

---

## 📝 Pasos para Configurar Sanity

### **1. Crear el Proyecto en Sanity**

```bash
cd backend-feli
pnpm install
```

Luego, conectar con Sanity Cloud:
```bash
pnpm sanity init
```

Esto te pedirá:
- **Login**: Iniciar sesión con Google, GitHub o email
- **Crear proyecto nuevo**: Nombre sugerido "suenos-abrigados"
- **Dataset**: Usar "production" (o "desarrollo" para pruebas)

---

### **2. Esquemas de Datos a Crear/Modificar**

Basándome en tu estructura actual, necesitarás modificar estos esquemas:

#### **A. Schema de Producto (`schemaTypes/documents/product.tsx`)**
- ✅ Nombre del producto
- ✅ Galería de fotos (múltiples imágenes)
- ✅ Descripción detallada
- ✅ Categoría (referencia a documento de categoría)
- ✅ Precio
- ✅ Estado: enum con opciones ["disponible", "vendido", "a-pedido"]
- ✅ Etiquetas: array de strings
- ✅ Es destacado: boolean
- ✅ Slug (para la URL)

#### **B. Schema de Categoría (nuevo documento)**
- Título (ej: "Bufandas", "Gorros")
- Slug
- Descripción (opcional)
- Imagen representativa (opcional)

#### **C. Schema de Página "Sobre Mí" (singleton)**
- Título
- Foto personal
- Historia/biografía (texto enriquecido)
- Enlaces sociales

#### **D. Schema de Configuración General (singleton)**
- Logo de la marca
- WhatsApp (número/enlace)
- Instagram (usuario/enlace)
- Email de contacto
- Colores de marca (opcional, para futuro)

#### **E. Schema de Página de Inicio**
- Imagen hero (grande de bienvenida)
- Mensaje de bienvenida
- Productos destacados (referencias a productos)

---

### **3. Configurar el Studio de Sanity**

En `sanity.config.ts`, configurar:

```typescript
// Estructura sugerida:
{
  name: 'suenos-abrigados',
  title: 'Sueños Abrigados - Panel de Control',
  projectId: 'tu-project-id',
  dataset: 'production',
  
  // Schemas personalizados
  schema: {
    types: [
      // Singletons (páginas únicas)
      home,
      sobreMi,
      configuracion,
      
      // Documentos principales
      producto,
      categoria,
      
      // Objetos auxiliares
      seo,
      enlacesSociales,
      // ... otros
    ]
  },
  
  // Estructura de navegación personalizada
  structure: (S) => 
    S.list()
      .title('Contenido')
      .items([
        // Singletons primero
        S.listItem()
          .title('Página de Inicio')
          .icon(HomeIcon)
          .child(...),
        
        S.divider(),
        
        // Productos
        S.listItem()
          .title('Productos')
          .icon(ShoppingCartIcon)
          .child(...),
          
        // Categorías
        S.listItem()
          .title('Categorías')
          .icon(FolderIcon)
          .child(...),
          
        S.divider(),
        
        // Configuración
        S.listItem()
          .title('Sobre Mí')
          .icon(UserIcon)
          .child(...),
          
        S.listItem()
          .title('Configuración')
          .icon(CogIcon)
          .child(...)
      ])
}
```

---

### **4. Configurar Campos Personalizados**

Para hacer el panel **muy fácil de usar**:

#### **Estado del Producto** - Usar opciones visuales:
```typescript
{
  name: 'estado',
  title: 'Estado',
  type: 'string',
  options: {
    list: [
      { title: '✅ Disponible', value: 'disponible' },
      { title: '❌ Vendido', value: 'vendido' },
      { title: '🧶 Hecho a Pedido', value: 'a-pedido' }
    ],
    layout: 'radio' // Botones grandes fáciles de clicar
  }
}
```

#### **Campo de Precio** - Con formato:
```typescript
{
  name: 'precio',
  title: 'Precio',
  type: 'number',
  description: 'Precio en pesos chilenos (CLP)',
  validation: Rule => Rule.min(0).positive()
}
```

#### **Galería de Fotos** - Con vista previa:
```typescript
{
  name: 'imagenes',
  title: 'Fotos del Producto',
  type: 'array',
  of: [{ type: 'image' }],
  options: {
    layout: 'grid' // Vista en cuadrícula
  },
  description: '🖼️ Sube varias fotos desde distintos ángulos'
}
```

---

### **5. Plugins Útiles para tu Caso**

Instalar estos plugins para mejorar la experiencia:

```bash
# Para vista previa del sitio web
pnpm add @sanity/preview-kit

# Para gestión de medios mejorada
pnpm add sanity-plugin-media

# Para internacionalización futura (español)
pnpm add @sanity/language-filter
```

---

### **6. Configurar Roles y Acceso**

En Sanity Cloud (manage.sanity.io):
- Crear un usuario para ti como **Administradora**
- Configurar permisos de lectura pública para el frontend
- Configurar API tokens para conexión segura

---

### **7. Conectar con el Frontend (Astro)**

En `frontend/`:

```bash
pnpm add @sanity/client @sanity/image-url
```

Crear archivo de configuración `src/lib/sanity.ts`:
```typescript
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'tu-project-id',
  dataset: 'production',
  apiVersion: '2024-11-08',
  useCdn: true, // Para mejor rendimiento
})
```

---

## 🎨 Personalización del Studio

Para que sea **tu espacio**:

1. **Colores y branding** - Personalizar en `sanity.config.ts`
2. **Iconos personalizados** - Para cada tipo de documento
3. **Textos de ayuda** - Descripciones claras en cada campo
4. **Vista previa en tiempo real** - Ver cómo se verá en la web

---

## ✅ Lista de Verificación Antes de Empezar

- [ ] Cuenta de Sanity creada
- [ ] Proyecto en Sanity Cloud configurado
- [ ] Esquemas de productos definidos
- [ ] Esquemas de categorías definidos
- [ ] Esquemas de páginas (Sobre Mí, Inicio) definidos
- [ ] Configuración general creada
- [ ] Studio personalizado y fácil de usar
- [ ] Conexión frontend-backend probada

---

## 📚 Recursos Adicionales

- **Documentación oficial**: https://www.sanity.io/docs
- **Schemas**: https://www.sanity.io/docs/schema-types
- **Studio**: https://www.sanity.io/docs/sanity-studio

---

## 🗂️ Estructura Actual del Proyecto

Tu proyecto backend ya tiene una estructura base. Aquí está lo que necesitarás modificar:

### Archivos a Modificar:
- `schemaTypes/documents/product.tsx` - Adaptar para "Sueños Abrigados"
- `schemaTypes/index.ts` - Agregar nuevos schemas
- `sanity.config.ts` - Configurar título, proyecto y estructura
- `structure/index.ts` - Personalizar la navegación del Studio

### Archivos a Crear:
- `schemaTypes/documents/categoria.ts` - Para categorías de productos
- `schemaTypes/singletons/sobreMi.ts` - Página "Sobre Mí"
- `schemaTypes/singletons/configuracion.ts` - Configuración general
- `structure/categoriaStructure.ts` - Estructura de categorías
- `structure/sobreMiStructure.ts` - Estructura "Sobre Mí"

### Archivos a Eliminar (relacionados con Shopify):
- `plugins/customDocumentActions/shopifyDelete.tsx`
- `plugins/customDocumentActions/shopifyLink.ts`
- `schemaTypes/objects/shopify/*` (toda la carpeta)
- `components/icons/Shopify.tsx`
- `components/media/ShopifyDocumentStatus.tsx`

---

## 🚀 Próximos Pasos

Una vez que tengas esta guía clara:

1. **Fase 1**: Limpiar código relacionado con Shopify (no lo necesitas)
2. **Fase 2**: Adaptar el schema de productos a tus necesidades
3. **Fase 3**: Crear los nuevos schemas (categoría, sobre mí, configuración)
4. **Fase 4**: Personalizar el Studio (colores, iconos, navegación)
5. **Fase 5**: Probar subiendo tus primeros productos

---

¿Listo para comenzar? 🧶✨
