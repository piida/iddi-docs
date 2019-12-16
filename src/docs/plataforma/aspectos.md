# Aspectos de la Plataforma iDDi

El diseño de la Plataforma se desarrolló de una manera flexible y modular, permitiendo la interconexión de diferentes sistemas y aplicaciones para solucionar las necesidades de iDentidad Digital actuales de la UAN y también poder escalar los componentes para necesidades futuras.

## Verificación de la identidad

Un aspecto crítico para dar certeza a una iDentidad Digital es la **verificación personal**, es decir, que una instancia autorizada (issuer) proporcione su atestación de que el usuario al que se le están generando **credenciales digitales** sea quien dice ser.

Este proceso se puede llevar a cabo en el **departamento de Credencialización** de la UAN, donde personalmente se verifica que el usuario tenga un documento probatorio y se le hace la toma de foto y verificación de datos personales.

Otra manera de verificar al usuario, sobre todo a los foráneos y modalidad en línea, es proporcionando una prueba de firma digital con su **[Certificado de e.firma](https://www.sat.gob.mx/tramites/16703/obten-tu-certificado-de-e.firma-(antes-firma-electronica))** (antes FIEL), puesto que para que el usuario esté en posesión de dicho documento, debió haber pasado por un proceso similar al de Credencialización.

## Credenciales con código Qr

El proceso de Verificación de la identidad genera algunos identificadores que se almacenan en la Plataforma iDDi y los datos básicos (Matrícula, Nivel, Nombre, Carrera) se codifican en un código bidimensional impreso en la credencial del usuario acompañado de un mecanismo criptográfico para la validación de los datos codificados (Ver la [Documentación Técnica del QR de Identidad](/documentacion-tecnica/qr-de-identidad.html)).

Se requiere un **código QR impreso** en el plástico por la versatilidad en la lectura de los datos de la credencial y los casos de uso que se pretende abarcar. Sin embargo, la credencial puede implementar además cualquier otro mecanismo de almacenamiento de datos como Rfid, SmartCard, etc. Los lectores de código QR son muy accesibles y además se puede utilizar cualquier smartphone actual y una aplicación para leer y validar el código QR de Identidad impreso o digital, por ejemplo el [validador de QR de Identidad](https://iddi.uan.mx/v) de la Plataforma iDDi.

Entre los casos de uso donde se puede aplicar la lectura del código QR de Identidad se mencionan los siguientes:

*   **Verificación visual** del usuario al realizar algún proceso físico, como solicitar libros en biblioteca, solicitar algun servicio solo para alumnos, etc. Solo basta presentar su credencial, escanear su QR y verificar que los datos presentados por la plataforma sean los mismos que el usuario presenta, incluso comparar la fotografía de la credencial con la foto presentada por la plataforma.
*   **Validación del estatus del usuario**, si se encuentra activo, inscrito, dado de baja, egresado etc. La plataforma provee incluso una API para que aplicaciones externas (previo consentimiento y autorización) puedan acceder a ciertos datos básicos y académicos del perfil del usuario, como su carrera, unidad académica, avance, etc.
    De esta manera, se pueden crear aplicaciones para un uso específico de usuarios de cierta carrera o permitir el acceso y registro a algún evento o lugar para alumnos con cierto estatus y validar estos datos en la entrada del evento leyendo su credencial.
*   **Registro de acceso** a eventos, congresos, etc. Utilizando una [plantilla de excel](/d/files/PlantillaRegistro.xlsx) y un lector de códigos, solo basta leer los QR para generar una lista de alumnos que ingresan al evento y evitar el registro de datos manual.
*   Entre otros.

    

Cabe mencionar que los datos codificados en el QR van acompañados de una firma digital de clave pública. Por lo que si se valida la firma, no hay posibilidad que los datos extraídos por el lector hayan sido alterados, como que se modifique el nombre del alumno o se haga pasar por otra carrera imprimiendo una credencial falsificada con un QR modificado.

> TODO: Publicar repositorio de App de registro de accesos simple.
>  
> *   Se configura un nuevo evento: nombre, fecha, lugar, restriccion de tipo de credencial, version custom de Qr, etc
> *   Lee y valida QR, alerta en caso de apocrifo
> *   Registra el acceso con los datos básicos
> *   Guarda en localstorage los datos
> *   Si hay una API CRUD en Backend, se configura el endpoint, id\_evento, api-key o user/pass
> *   Para API, en cada read/delete/reset se emite un evento a la api enviando los datos básicos y el ID del Evento
> *   Abre websocket para escuchar sincronizaciones de otros lectores o refresca la lista cada xx Minutos

## Inicio de sesión unificado (OpenID Connect)

Los alumnos y personal universitario consideran que un proceso de inicio de sesión es molesto y la administración de diferentes contraseñas para distintos sistemas de manera segura suele ser complicada. Además, iniciar una sesión en sistemas distintos en la universidad implica que cada sistema tiene una copia de nuestra información personal y de acceso, lo que conlleva a posibles conflictos con las leyes de Protección de Datos Personales.

El **inicio de sesión unificado** plantea un modelo de identificación basado en los protocolos [OpenID Connect](https://es.wikipedia.org/wiki/OpenID_Connect) y [OAuth 2.0](https://es.wikipedia.org/wiki/OAuth) como mecanismo de autenticación y autorización entre aplicaciones internas. Cuando un alumno (_Resource Owner_) necesite ingresar a un sistema o aplicación universitaria (_Client Application_), será redirigido a su página de perfil en iDDi (_Authorization Server_) donde debe iniciar sesión si es que aún no lo ha hecho y autorizar al sistema o aplicación que necesita su consentimiento de acceso a sus datos personales (_Protected Resource_). De esta manera, el alumno solo debe iniciar sesión una vez en iDDi y desde ahí controlar en qué sistemas ha iniciado sesión y qué datos les quiere compartir, así como revocar el acceso, cerrar sesión, además de poder cambiar la contraseña desde un solo lugar.

![oauth.jpg](~@images/oauth.jpg)

*   [OAuth 2.0, OpenID Connect ¿Qué es qué?](https://www.returngis.net/2019/04/oauth-2-0-openid-connect-y-json-web-tokens-jwt-que-es-que/)
*   [https://idp.iddi.uan.mx/.well-known/openid-configuration](https://idp.iddi.uan.mx/.well-known/openid-configuration)

Del lado de los desarrolladores, es muy sencillo implementar el protocolo OpenID Connect y OAuth 2.0 ya que, al ser un protocolo estandar internacional, existen SDKs e implementaciones para casi cualquier framework y lenguaje de programación. De esta manera, los desarrolladores pueden delegar la autenticación (y la seguridad de la misma) a la Plataforma iDDi y enfocarse en el desarrollo de sus sistemas y aplicaciones.

> TODO: Documentación técnica del https://idp.iddi.uan.mx.

## iDDi Móvil

La plataforma cuenta con la aplicación [UAN iDDi](http://iddi.uan.mx/app) (_iDDi Móvil_) desde la cual, una vez iniciada la sesión, el usuario puede recibir notificaciones, verificar sus inicios de sesión y si lo autoriza, poder iniciar sesión en otros dispositivos (su laptop por ejemplo) sin ingresar su contraseña.

### Inicio de sesión sin contraseña

Al intentar iniciar sesión en el otro dispositivo con la opción de **Inicio de sesión sin contraseña**, se le mostrará un código QR que deberá escanear con su app iDDi Móvil y en caso de aprobar el inicio en la app, se iniciará la sesión de manera segura en el otro dispositivo.

### QR _Digital_ de Identidad

Otra funcionalidad de la aplicación es poder generar en pantalla el QR de Identidad de manera **Digital**, similar al impreso en la credencial. Si el usuario olvida su credencial física y le es requerido el QR para ingresar a algún evento, puede generar su QR Digital de Identidad desde la App y presentarlo desde la pantalla de su dispositivo.

> Ver la [Documentación Técnica del QR de Identidad](/documentacion-tecnica/qr-de-identidad.html).

### Claves pública, privada y Certificado

> TODO: Documentación técnica de la firma electrónica.

## Firma Electrónica

Además del inicio de sesión sin contraseña, la App iDDi Móvil genera los certificados y claves privadas que proporcionan la iDentidad Digital de manera completa. Su clave privada se almacena de manera segura y únicamente en su dispositivo, encriptada con estándares internacionales. Si el usuario llega a perder su móvil, será necesario volver a iniciar el proceso de generación de sus certificados. Para garantizar la fiabilidad de la firma electrónica, no existe respaldo en ningún otro lado o en la plataforma iDDi.

Cuando en algún proceso interno universitario sea requerida la firma electrónica del usuario, se le enviará notificación a la App iDDi Móvil donde tendrá que revisar la petición de firma electrónica (quién la solicita, para qué y por cuanto tiempo es válida) y en caso de aceptar para firmar, se le pedirá confirmar con su PIN de firmado. En ese momento la App envía al sistema que inició el proceso de firmado, la confirmación y una prueba criptográfica de la firma digital. Así, la clave privada nunca sale del dispositivo y en todo momento el usuario tiene control de lo que firma electrónicamente.

*   [¿En qué se diferencian la firma electrónica, la firma digital y la firma digitalizada?](https://blog.signaturit.com/es/en-que-se-diferencian-la-firma-electronica-la-firma-digital-y-la-firma-digitalizada)

## Infraestructura de Clave Pública (PKI)

Para gestionar y emitir los Certificados de firma electrónica, asegurar las conexiones locales entre servidores y servicios interoperables con iDDi y controlar los accesos a las API's mediante claves de api y certificados, se implementó una [Infraestructura de Clave Pública](https://es.wikipedia.org/wiki/Infraestructura_de_clave_p%C3%BAblica) (PKI) interna: **iDDi UAN - Cert Authority**

![pki.jpg](~@images/pki.jpg)

*   [https://velezconde.wordpress.com/2014/11/05/que-es-eso-de-pki/](https://velezconde.wordpress.com/2014/11/05/que-es-eso-de-pki/)
*   [https://ca.iddi.uan.mx](https://ca.iddi.uan.mx)

> TODO: Documentar los datos técnicos de la PKI.

