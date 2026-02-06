CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(30),
    email VARCHAR(255) UNIQUE NOT NULL,
    contrasenia TEXT NOT NULL,
    rol VARCHAR(30) NOT NULL
        CHECK (rol IN (
            'Administración',
            'Citotécnico',
            'Dirección',
            'Externo',
            'Gerencial',
            'Patólogo',
            'Técnico'
        ))
);
