import type { NavbarProps } from 'sanity'
import { HeartYarnIcon } from '../icons/HeartYarn'
import { Flex, Text } from '@sanity/ui'

export default function Navbar(props: NavbarProps) {
  return (
    <div style={{}}>
      {/* ESTILOS GLOBALES DE ACCESIBILIDAD PARA EL ESTUDIO */}
      <style>{`
        /* Aumentar tamaño base de textos generales */
        :root {
          --font-size-base: 16px !important;
        }

        /* Textos de menús, botones y etiquetas */
        div[data-ui="Text"], span, p, label, input, textarea, button, a {
          font-size: 16px !important;
          line-height: 1.6 !important;
        }

        /* Títulos de secciones más grandes */
        h1, h2, h3, h4, [data-ui="Heading"] {
          font-size: 20px !important;
          font-weight: 700 !important;
        }

        /* Aumentar tamaño de iconos */
        svg {
          width: 24px !important;
          height: 24px !important;
        }

        /* Hacer inputs y botones más altos para facilitar el clic */
        button, input[type="text"], input[type="number"], textarea, select {
          min-height: 44px !important; /*Estándar de accesibilidad */
          padding: 8px 12px !important;
        }

        /* Espaciado extra en listas del menú lateral */
        [data-testid="document-list-item"] {
          padding-top: 12px !important;
          padding-bottom: 12px !important;
        }
      `}</style>

      <Flex align="center" gap={3} padding={3} style={{ borderBottom: '1px solid #e6e8eb' }}>
        {/* Título Principal Personalizado */}
        <div style={{
          fontSize: '24px',
          color: '#d4896b',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginRight: '20px'
        }}>
          <HeartYarnIcon />
        </div>

        {/* Resto de la UI de Sanity */}
        <div style={{ flex: 1 }}>
          {props.renderDefault(props)}
        </div>
      </Flex>
    </div>
  )
}
