# Uso de la API Pública

La plataforma iDDi UAN expone algunas API's para permitir la interacción entre sistemas y plataformas de terceros que tengan necesidad de consumir información de forma automática. Tal es el caso de la verificación del estatus de un alumno para préstamo de algún servicio o registrar su acceso a algún sitio por ejemplo.

## Seguridad

Para consultar a la [API pública](/api-spec/api-publica/index.html) de iDDi es necesario contar con una Clave de API (`API-Key`), ésta se le proporciona al desarrollador que luego intercambia por un Token de Acceso (`Access-Token`) en formato JSON Web Token (`JWT`) con los privilegios necesarios (`scopes`) de acceso a diferente información. Existen diferentes scopes que determinarán a qué información puede acceder el cliente. Por ejemplo, todas las API-Key pueden consultar el [perfil básico](/plataforma/perfiles.md#perfiles) de un usuario, pero para consultar datos personales como correo, teléfono, promedio, etc. se requiere de otros scopes como `perfil:extendido` o `perfil:academico` que se proporcionan a la API-Key del desarrollador con previa autorización de la Secretaría de Docencia.

Un desarrollador, con su API-Key puede generar múltiples AccesToken con diferentes scopes específicos para la aplicación que esté diseñando.

Otro tipo de APIs, por la información sensible que manejan, requieren establecer una conexión segura mediante mutual TLS `mTLS` entre el cliente y la API. Para ello se utilizan certificados expedidos y firmados por la Infraestructura de Clave Pública (`PKI`) de **iDDi UAN - Cert Authority**.

Algunos endpoints solo requieren firmar o encriptar las peticiones y validar las respuestas utilizando claves públicas y algoritmos de firmado como `Ed25519` o encriptado con `X25519`. En PHP se utiliza el Toolkit de Seguridad de APIs: [Sapient](https://github.com/paragonie/sapient).

### Access Token
```json
{
    "iss": "https://apps.iddi.uan.mx/",
    "sub": "2o0QeqAqsnfdPT2hOf8RAsai0tD1BwZp@docencia",
    "aud": "https://api.iddi.uan.mx",
    "iat": 1575526641,
    "exp": 1575613041,
    "azp": "2o0QeqAqsnfdPT2hOf8RAsai0tD1BwZp",
    "scope": "perfil perfil:extendido catalogo",
    "gty": "client-credentials"
}
```

### Scopes

*   **API Pública**
    *   `perfil`
    *   `perfil:extendido` (foto, correo, telefono, ua, campus, cohorte, estatus...
    *   `catalogo`
*   **Issuers**
    *   `user:perfiles`
    *   `iddi:verificar`
    *   `iddi:revocar`
*   **PiiDA**
    *   `perfil:academico` (promedio, avance, materias, historial...

## Perfil

porque hay diferentes perfiles y su tipo. Tipo de usuario: A Administrativo, D Docente, B Bachillerato, L Licenciatura, P Posgrado, E Externo, S Staff Nociones de Persona

Un Usuario Alumno puede tener diferentes perfiles o credenciales según su carrera: Perfil de Sistemas, de Sociales, etc.

Un Trabajador puede tener una credencial con adscripción como Docente, luego si se hace funcionario, Una credencial como Funcionario, etc.

### Perfil Básico

### Perfil Extendido

### Perfil de Alumno

las carreras, matricula por carrera y varias carreras por matricula estatus de la carrera

### Perfil de Personal

adscripciones, en general siempre es uno solo

## Issuer