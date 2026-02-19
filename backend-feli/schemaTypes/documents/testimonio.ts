// archivo de prueba

export const testimonioType = {
    name: 'testimonio', // id interno
    title: 'Testimonio', //nombre visible en el menu
    type: 'document', // documento nuevo
    fields: [
        {
            name: 'nombre',
            type: 'string',
            title: 'Nombre del cliente'
        },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'nombre',
                maxLength: 96,
            }
        },
        {
            name: 'foto',
            type: 'image',
            title: 'Image cliente',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'testimonio',
            type: 'text',
            title: 'Testimonio',
        },
        {
            name: 'rating',
            type: 'number',
            title: 'Rating',
            description: 'Valoración del cliente (1-5)',
            validation: (Rule) => Rule.required().min(1).max(5),
        },
        {
            name: 'fecha',
            type: 'date',
            title: 'Fecha',
            description: 'Fecha del testimonio',
            validation: (Rule) => Rule.required(),
        },
    ]
}