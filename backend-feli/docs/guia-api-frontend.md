# Guía: Conectar Frontend con Sanity API

## 📚 ¿Qué es GROQ?

**GROQ** (Graph-Relational Object Queries) es el lenguaje de consultas de Sanity.

### GROQ vs GraphQL

| Característica | GROQ | GraphQL |
|----------------|------|---------|
| **Sintaxis** | Más concisa, parecida a JSON | Más verbosa |
| **Aprendizaje** | Curva de aprendizaje corta | Más complejo inicialmente |
| **Flexibilidad** | Muy potente para filtrar y transformar | Requiere definir schema GraphQL |
| **Proyecciones** | Directas en la query | Mediante resolvers |

**Ejemplo comparativo:**

```groq
// GROQ - Simple y directo
*[_type == "producto" && destacado == true]{
  nombre,
  precio,
  "imagen": imagenes[0].asset->url
}[0...6]
```

```graphql
# GraphQL - Más verboso
query {
  allProducto(where: { destacado: { eq: true } }, limit: 6) {
    nombre
    precio
    imagenes {
      asset {
        url
      }
    }
  }
}
```

---

## 🔧 1. Configuración Inicial

### Instalar dependencias

```bash
# En tu carpeta frontend
npm install @sanity/client @sanity/image-url
# o
pnpm add @sanity/client @sanity/image-url
```

### Crear archivo de configuración

```typescript
// src/lib/sanity.ts (o .js)
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Cliente de Sanity
export const sanityClient = createClient({
  projectId: 'qsk5q0dj', // Tu Project ID
  dataset: 'production',
  apiVersion: '2024-11-08', // Fecha de hoy o cuando empezaste
  useCdn: true, // `true` para mejor rendimiento en producción
  
  // Si necesitas escribir datos (opcional):
  // token: 'tu-token-de-escritura',
})

// Helper para generar URLs optimizadas de imágenes
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
```

---

## 📖 2. Consultas GROQ Básicas

### Sintaxis fundamental de GROQ:

```groq
*[filtro]{proyección}[slice]
```

- **`*`**: Todos los documentos
- **`[filtro]`**: Condiciones para filtrar
- **`{proyección}`**: Qué campos quieres obtener
- **`[slice]`**: Paginación (ej: `[0...10]`)

---

## 🛍️ 3. Ejemplos para "Sueños Abrigados"

### A. Obtener todos los productos

```typescript
// frontend/src/lib/queries/productos.ts
import { sanityClient } from '../sanity'

export async function getProductos() {
  const query = `*[_type == "producto"] | order(_createdAt desc) {
    _id,
    nombre,
    slug,
    precio,
    estado,
    destacado,
    imagenes[]{
      asset->{
        _id,
        url
      },
      alt
    },
    categoria->{
      _id,
      titulo,
      slug
    }
  }`
  
  return await sanityClient.fetch(query)
}
```

### B. Productos destacados (homepage)

```typescript
export async function getProductosDestacados() {
  const query = `*[_type == "producto" && destacado == true && estado == "disponible"] | order(_createdAt desc) [0...6] {
    _id,
    nombre,
    slug,
    precio,
    "imagen": imagenes[0].asset->url,
    "imagenAlt": imagenes[0].alt,
    categoria->{ titulo }
  }`
  
  return await sanityClient.fetch(query)
}
```

### C. Producto individual (página de detalle)

```typescript
export async function getProductoPorSlug(slug: string) {
  const query = `*[_type == "producto" && slug.current == $slug][0] {
    _id,
    nombre,
    slug,
    descripcion,
    precio,
    estado,
    materiales,
    dimensiones,
    tiempoElaboracion,
    etiquetas,
    imagenes[]{
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    categoria->{
      _id,
      titulo,
      slug
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{ url }
      }
    }
  }`
  
  return await sanityClient.fetch(query, { slug })
}
```

### D. Productos por categoría

```typescript
export async function getProductosPorCategoria(categoriaSlug: string) {
  const query = `*[_type == "producto" && categoria->slug.current == $categoriaSlug] | order(nombre asc) {
    _id,
    nombre,
    slug,
    precio,
    estado,
    "imagen": imagenes[0].asset->url,
    categoria->{ titulo }
  }`
  
  return await sanityClient.fetch(query, { categoriaSlug })
}
```

### E. Todas las categorías

```typescript
export async function getCategorias() {
  const query = `*[_type == "categoria"] | order(orden asc) {
    _id,
    titulo,
    slug,
    descripcion,
    imagen {
      asset->{ url }
    },
    "cantidadProductos": count(*[_type == "producto" && references(^._id)])
  }`
  
  return await sanityClient.fetch(query)
}
```

### F. Página "Sobre Mí"

```typescript
export async function getSobreMi() {
  const query = `*[_type == "sobreMi"][0] {
    titulo,
    fotoPerfil {
      asset->{ url }
    },
    biografia,
    enlacesSociales {
      instagram { usuario, url },
      whatsapp { numero },
      email,
      facebook
    },
    seo
  }`
  
  return await sanityClient.fetch(query)
}
```

### G. Configuración general

```typescript
export async function getConfiguracion() {
  const query = `*[_type == "configuracion"][0] {
    nombreSitio,
    descripcion,
    logo { asset->{ url } },
    favicon { asset->{ url } },
    coloresMarca {
      primario,
      secundario,
      acento
    },
    whatsapp { numero, mensajePredeterminado },
    instagram { usuario, url },
    email,
    telefono,
    direccion,
    horarioAtencion
  }`
  
  return await sanityClient.fetch(query)
}
```

---

## 🖼️ 4. Manejo de Imágenes

### Imágenes optimizadas con @sanity/image-url

```typescript
import { urlFor } from '@/lib/sanity'

// Básico
const imagenUrl = urlFor(producto.imagenes[0]).url()

// Con transformaciones
const imagenOptimizada = urlFor(producto.imagenes[0])
  .width(800)           // Ancho
  .height(600)          // Alto
  .quality(85)          // Calidad (0-100)
  .fit('crop')          // crop | fill | min | max | scale | clip
  .crop('center')       // center | top | bottom | left | right
  .format('webp')       // webp | jpg | png
  .url()

// Responsive (diferentes tamaños)
const imagenSrcSet = urlFor(producto.imagenes[0])
  .width(400)
  .url() + ' 400w, ' +
  urlFor(producto.imagenes[0])
  .width(800)
  .url() + ' 800w, ' +
  urlFor(producto.imagenes[0])
  .width(1200)
  .url() + ' 1200w'
```

### Ejemplo en componente React/Astro

```tsx
// React
function ProductoCard({ producto }) {
  return (
    <div className="card">
      <img
        src={urlFor(producto.imagen).width(600).height(600).url()}
        alt={producto.imagenAlt || producto.nombre}
        loading="lazy"
      />
      <h3>{producto.nombre}</h3>
      <p>{new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP' 
      }).format(producto.precio)}</p>
    </div>
  )
}
```

---

## 🎯 5. Operadores GROQ Útiles

### Filtros

```groq
// Igualdad
*[_type == "producto"]

// Y lógico
*[_type == "producto" && estado == "disponible"]

// O lógico
*[_type == "producto" && (estado == "disponible" || estado == "a-pedido")]

// Mayor/menor que
*[_type == "producto" && precio > 10000]

// Coincidencia parcial (búsqueda)
*[_type == "producto" && nombre match "bufanda*"]

// Existe un campo
*[_type == "producto" && defined(destacado)]

// Referencia a otro documento
*[_type == "producto" && categoria._ref == "id-categoria"]
```

### Proyecciones

```groq
// Campos específicos
{ nombre, precio }

// Renombrar campo
{ "nombreProducto": nombre }

// Campo calculado
{ "precioConIVA": precio * 1.19 }

// Acceder a referencias
{ categoria->{ titulo } }

// Primer elemento de array
{ "imagenPrincipal": imagenes[0] }

// Contar elementos
{ "totalProductos": count(*[_type == "producto"]) }
```

### Ordenamiento y paginación

```groq
// Ordenar ascendente
| order(nombre asc)

// Ordenar descendente
| order(_createdAt desc)

// Múltiples criterios
| order(destacado desc, precio asc)

// Paginación
[0...10]    // Primeros 10
[10...20]   // Del 10 al 20
```

---

## 🔄 6. Datos en Tiempo Real (Opcional)

Si quieres actualizaciones en tiempo real:

```typescript
import { sanityClient } from './sanity'

// Suscribirse a cambios
const subscription = sanityClient
  .listen('*[_type == "producto"]')
  .subscribe(update => {
    console.log('Producto actualizado:', update)
    // Actualizar tu UI
  })

// Cancelar suscripción
subscription.unsubscribe()
```

---

## 🌐 7. Ejemplo Completo: Página de Producto

```typescript
// pages/productos/[slug].astro
---
import { getProductoPorSlug } from '@/lib/queries/productos'
import { urlFor } from '@/lib/sanity'

const { slug } = Astro.params
const producto = await getProductoPorSlug(slug)

if (!producto) {
  return Astro.redirect('/404')
}

const estadoConfig = {
  'disponible': { emoji: '✅', texto: 'Disponible' },
  'vendido': { emoji: '❌', texto: 'Vendido' },
  'a-pedido': { emoji: '🧶', texto: 'Hecho a Pedido' }
}
---

<html>
  <head>
    <title>{producto.seo?.metaTitle || producto.nombre}</title>
    <meta name="description" content={producto.seo?.metaDescription || producto.descripcion} />
  </head>
  <body>
    <article>
      <div class="galeria">
        {producto.imagenes.map((img) => (
          <img 
            src={urlFor(img).width(800).height(800).url()} 
            alt={img.alt || producto.nombre}
          />
        ))}
      </div>
      
      <div class="info">
        <h1>{producto.nombre}</h1>
        
        <p class="categoria">
          <a href={`/categorias/${producto.categoria.slug.current}`}>
            {producto.categoria.titulo}
          </a>
        </p>
        
        <p class="precio">
          {new Intl.NumberFormat('es-CL', { 
            style: 'currency', 
            currency: 'CLP' 
          }).format(producto.precio)}
        </p>
        
        <p class="estado">
          {estadoConfig[producto.estado].emoji} 
          {estadoConfig[producto.estado].texto}
        </p>
        
        <p class="descripcion">{producto.descripcion}</p>
        
        {producto.materiales && (
          <div class="detalle">
            <strong>Materiales:</strong> {producto.materiales}
          </div>
        )}
        
        {producto.dimensiones && (
          <div class="detalle">
            <strong>Dimensiones:</strong> {producto.dimensiones}
          </div>
        )}
        
        {producto.tiempoElaboracion && (
          <div class="detalle">
            <strong>Tiempo de elaboración:</strong> {producto.tiempoElaboracion}
          </div>
        )}
        
        {producto.etiquetas && (
          <div class="etiquetas">
            {producto.etiquetas.map(tag => (
              <span class="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  </body>
</html>
```

---

## 📌 Recursos Adicionales

- **GROQ Playground**: https://www.sanity.io/docs/groq - Prueba queries en tiempo real
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Vision Plugin**: Ya lo tienes instalado en dev mode (http://localhost:3333/vision)

---

## 💡 Consejos

1. **Usa el Vision Plugin** en tu Studio para probar queries antes de implementarlas
2. **CDN en producción**: Usa `useCdn: true` para mejor rendimiento
3. **Cachea las consultas** en tu frontend cuando sea apropiado
4. **Optimiza imágenes**: Siempre define width/height para evitar layout shifts
5. **TypeScript**: Genera tipos automáticamente con `sanity typegen generate`

---

## 🔐 Variables de Entorno

```env
# .env
PUBLIC_SANITY_PROJECT_ID=qsk5q0dj
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-11-08

# Solo si necesitas escribir datos:
# SANITY_API_TOKEN=tu-token-secreto
```

Entonces usas:

```typescript
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: true,
})
```
