# QR de Identidad

El código QR de Identidad contiene codificada una cadena de caracteres con los [datos básicos](#datos-basicos) del **Perfil de Usuario**, así como una [firma digital](#firma-digital) para la validación de los datos y se despliega como una URL al [validador en la Plataforma iDDi](https://iddi.uan.mx/v). Para más información sobre los tipos de perfiles consultar la sección [Perfil de Usuario](/plataforma/perfiles.html#perfiles)

Un código QR de Identidad es similar al siguiente:

![qr_sample.png](~@images/qr_sample.png)

    https://iddi.uan.mx/v#iDDi1|L|19003500|LADRON DE GUEVARA, DE LA TEJERA, MARIA DEL CONSUELO|CIENCIAS DE LA EDUCACION|6895|1zr1RN|ED-K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz-UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6-wgbsr4nt3TaZeFc2UwBg
      

La información se codifican en el QR como texto plano (sin encriptación) con la finalidad que al escanearlo, inmediatamente se puedan interpretar los datos de la Identidad y se pueda usar en herramientas simples como un registro en una [plantilla de excel](/d/files/PlantillaRegistro.xlsx) de asistentes a una conferencia, sin necesidad de saber programación o crear una aplicación específica.

Como contrapartida, al ser los datos planos, cualquier tercero con acceso al código QR (por ejemplo que le tomen foto a la credencial o le pidan al alumno copia fotostática) puede conocer sus datos básicos, aunque ésta es la misma información que se imprime en una credencial tradicionalmente. Para la implementación, lo anterior no se considera un vector de ataque o brecha de seguridad.

## Especificaciones Técnicas

### Módulos

El código QR generado se compone de entre 53x53 a 61x61 Módulos según la versión obtenida, que puede ser versión 9, 10 u 11 con un nivel de corrección M.

### Tamaño de Impresión

El tamaño recomendado de impresión del QR, tomando como referencia la versión más densa de módulos (versión 11, 61x61 módulos), es de mínimo **36mm** para ralizar una lectura con éxito desde una distancia de **15cm** con un smarphone con cámara de resolución mínima de **2Mpx**.

### Caracteres

La versión se obtiene a partir del número de caracteres de la cadena a codificar. El [formato del QR de Identidad](#formato-de-la-cadena) especifica como máximo 254 caracteres simples (bytes) para la cadena generada. El tamaño de la cadena depende prácticamente del tamaño del nombre completo y la carrera/adscripción del usuario.

### Resumen

*   Num máximo de caracteres: **254**
*   Resolución mínima de cámara: **2Mpx**
*   Distancia mínima de lectura: **150mm**
*   Nivel de Corrección: **M**

Version|Max Cars|Módulos|Tam de Impresión Óptimo
-------|--------|-------|---------
9|182|53|32mm
10|216|57|35mm
**11**|**254**|**61**|**36mm**

**Referencias:**

*   [https://blog.qrstuff.com/2011/11/23/qr-code-minimum-size](https://blog.qrstuff.com/2011/11/23/qr-code-minimum-size)
*   [https://www.nayuki.io/page/creating-a-qr-code-step-by-step](https://www.nayuki.io/page/creating-a-qr-code-step-by-step)

## Formato de la cadena

La cadena de caracteres codificada en el QR incluye una URL como [prefijo](#prefijo), los [datos básicos](#datos-basicos) del [perfil del usuario](/plataforma/perfiles.html) y una [firma digital](#firma-digital) para la validación de los datos básicos.

El formato en la **Versión iDDi1** es el siguiente:

    PREFIJO#VERSION|TIPO|MATRICULA|NOMBRE|PROGRAMA|CARRERA_ID|FOLIO|FIRMA_DIGITAL
            ^--------   Datos básicos (cadena original)   --------^

Un ejemplo de una cadena leída es el siguiente:

    https://iddi.uan.mx/v#iDDi1|L|19003500|LADRON DE GUEVARA, DE LA TEJERA, MARIA DEL CONSUELO|CIENCIAS DE LA EDUCACION|6895|1zr1RN|ED-K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz-UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6-wgbsr4nt3TaZeFc2UwBg

### Datos Básicos

Los datos básicos del perfil del usuario se concatenan usando el símbolo `|` (pipe) como separador, generando así la **Cadena Original**:

    # Perfil de un Alumno
    VERSION|TIPO|MATRICULA|NOMBRE|PROGRAMA|CARRERA_ID|FOLIO

    # Perfil de un Trabajador
    VERSION|TIPO|NUM_TRABAJADOR|NOMBRE|ADSCRIPCION|ID_ADSCRIPCION|FOLIO


## Componentes de la cadena

Componente|Max Cars|Regex
----|----|------
[PREFIJO](#prefijo)|25|`^[-_.ñ:?@#\/a-z0-9]+$`
[VERSION](#version)|5|`^[a-zA-Z0-9]+$`
[TIPO](#tipo)|1|`^[ADLBPES]$`
[NUM\_TRABAJADOR](#matricula-o-num-trabajador)<br>[MATRICULA](#matricula-o-num-trabajador)|12|`^[-0-9XBLMOV]{4,12}$`
[NOMBRE](#nombre)|60|`^[-',ÑÜ A-Z0-9]+$`
[PROGRAMA](#programa-o-adscripcion)<br>[ADSCRIPCION](#programa-o-adscripcion)|40|`^[ÑÜ A-Z0-9]+$`  
[CARRERA\_ID](#carrera-id-o-id-adscripcion)<br>[ID\_ADSCRIPCION](#carrera-id-o-id-adscripcion)|5|`^[0-9]+$`
[FOLIO](#folio)|6|`^[a-zA-Z0-9]+$`
[FIRMA\_DIGITAL](#firma-digital)|89|`^[-_a-zA-Z0-9]{89}$`
separadores|8|`#` y `|`
| |251|Total de caracteres \*

\* Para la versión **iDDi1**.

### PREFIJO

*   `https://iddi.uan.mx/v#`
*   Máx 25 caracteres
*   String: Formato URL `^[-_.ñ:?@#\/a-z0-9]+$`

El prefijo de la cadena inicia con un [esquema de URI](https://es.wikipedia.org/wiki/Esquema_de_URI) para aprovechar la funcionalidad de los móviles con android e ios que al leer un código QR lo interprete como un enlace (Deep Link) y lance la aplicación que certifica los datos leídos.

El prefijo predeterminado en el QR de una credencial es la URL al [validador en la Plataforma iDDi](https://iddi.uan.mx/v), su esquema URI es `https://` por lo que el dispositivo móvil abrirá un navegador en esa dirección.

El prefijo se separa de la cadena original con el signo `#` (sharp), esto permite pasar la cadena original y la firma como parámetro a la aplicación que se abre en el navegador mediante el componente Hash. Así se podrá acceder a la cadena original para validarla de manera automática sin necesidad de instalar alguna aplicación extra en el dispositivo:

`https://iddi.uan.mx/v#iDDi1|L|190035...`

Otros esquemas válidos podrían ser `iddi://` o `piida://` que al seguir el enlace, lanzarían la App Móvil de iDDi o PiiDA si se encuentran instaladas.

### VERSION

*   `iDDi1`
*   5 caracteres
*   String: Alfanumérico `^[a-zA-Z0-9]$`

Siempre debe ser **el primer componente**. Es un identificador fijo que define la **versión del formato de la cadena** (la posición y número de elementos de los datos básicos). La finalidad de este campo es poder utilizar el mismo formato de QR en diferentes aplicaciones o casos de uso y que el lector o aplicación lectora aplique condiciones diferentes según el texto que extraiga de este componente.

Por ejemplo, para un congreso se pueden imprimir Gaffetes de Staff con un código QR que designe diferentes niveles de acceso o que contenga el ID del usuario en una base de datos propia del congreso, la versión podría ser entonces `evento` o `becas`.

Otro ejemplo es el QR impreso en el Pase de Examen de los sistemas de EXACRI o EGEL, donde los datos contienen el folio de la solicitud de examen y el examen a aplicar, la versión es `EGELS` y `EXACRIS`. La aplicación que utilizan los encargados de aplicar el examen lee y valida el QR siguiendo el mismo formato y despliega los datos de la solicitud de examen, pudiendo marcar la asistencia del alumno a aplicar el examen.

### TIPO

*   `L`
*   1 caracter
*   Enum `^[ADLBPES]$`

Define el tipo de usuario al que pertenece el perfil de esta credencial. Los usuarios se engloban básicamente en dos tipos: **Alumnos** y **Personal** universitario (trabajadores de la UAN). Para más información, consultar la sección de [Tipos de usuario y perfiles](/plataforma/perfiles)

Para los tipos de usuario de Personal universitario, los componentes `MATRICULA`, `PROGRAMA` y `CARRERA_ID` representan su `NUM_TRABAJADOR`, `ADSCRIPCIÓN` y su `ID_ADSCIPCION`.

El `NOMBRE` y `FOLIO` son los mismos para todos los tipos.

Los tipos admitidos son:

*   `A` Administrativo
*   `D` Docente
*   `B` Bachillerato
*   `L` Licenciatura
*   `P` Posgrado
*   `E` Externo
*   `S` Staff'

### MATRICULA o NUM\_TRABAJADOR

*   `19003500`
*   Entre 4 y 12 caracteres
*   String: `^[-0-9XBLMOV]{4,12}$`

La Matrícula del alumno o el Número de Plaza/Trabajador si es un Docente o Administrativo.

El número de trabajador es un entero de entre 2 y 6 dígitos.

La matrícula es muy variada según la generación, y va de 4 a 12 caracteres y puede contener algunas letras: `MOV00123`, `14005263L`, `00000245-4`

### NOMBRE

*   `LADRON DE GUEVARA, DE LA TEJERA, MARIA DEL CONSUELO`
*   Máx 60 caracteres
*   String: `^[-',ÑÜ A-Z0-9]+$`

El nombre completo del usuario compuesto por Primer Apellido, Segundo Apellido y Nombres. Separados por un `,` (coma y espacio). Se deben convertir los caracteres acentuados o diacríticos a su equivalente ASCII sin acento, excepto por la Ñ y Ü y eliminar cualquier otro caracter especial excepto `-'`(guión y comilla simple), con la finalidad de ser una cadena URL Safe y no tenga problemas al pasarla al navegador (sin tener que hacer `encodeuri`).

Si solo tiene un apellido, se debe incluir de todas formas el `,` de separador. Por ejemplo: José Rodríguez se representa como `RODRIGUEZ, , JOSE`.

El nombre completo concatenado no debe superar los 60 caracteres. De superarlos, se debe truncar a máximo 60 caracteres perdiendo parte del nombre. Estadísticamente el nombre más largo registrado en Control Escolar de la UAN es JUAREZ, JIMENEZ, ESPAÑA ANTONIELLI VALENTINA JOSEFINA de 53 caracteres de longitud.

### PROGRAMA o ADSCRIPCION

*   `CIENCIAS DE LA EDUCACION`
*   Máx 40 caracteres
*   String: `^[ÑÜ A-Z0-9]+$`

Se aplica la misma conversión de caracteres que con el nombre.

El listado de programas y adscripciones se puede consultar como catálogo a través de la API de iDDi en:

> TODO: Documentar API de catálogos

### CARRERA\_ID o ID\_ADSCRIPCION

*   `6895`
*   Máx 5 dígitos
*   Int: `^[0-9]+$`

El identificador de la carrera en el Sistema de Administración y Control Escolar o el Identificador de Adscripción del Personal universitario.

El listado de carreras y adscripciones se puede consultar como catálogo a través de la API de iDDi en:

> TODO: Documentar API de catálogos

### FOLIO

*   `1zr1RN`
*   6 caracteres
*   String: alfanumérico `^[a-zA-Z0-9]+$`

El **folio único del código QR** impreso en el plástico de la credencial. Cada plástico debe llevar un QR con un folio distinto para su identificación. El **folio va ligado al perfil** de la credencial del usuario.

Puesto que una vez impreso, no se puede renovar o revocar el QR en el mismo plástico, se lleva un registro de bitácora de renovaciones o revocación de la credencial a traves del folio.

El folio también se utiliza para obtener el perfil de un usuario y su estatus académico/administrativo desde la **API de iDDi**. Las aplicaciones de terceros pueden escanear un QR, extraer el folio y solicitar los datos de estatus del usuario a la API para hacer validaciones extra.

> TODO: Documentar API de perfil

### FIRMA\_DIGITAL

*   `ED-K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz-UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6-wgbsr4nt3TaZeFc2UwBg`
*   89 caracteres
*   String: Base64 Url Safe sin padding `=`
*   `^[-_a-zA-Z0-9]{89}$`

Es el resultado de aplicar el algoritmo de firmado ed25519 al hash sha256 de la cadena de [datos básicos](#datos-basicos). Se concatena **al final de la cadena original** separado por el caracter `|`.

```
base64_url_safe(ed25519.sign(sha256(DATOS_BASICOS), priv_key))
```   

Se puede certificar la autenticidad de los datos básicos verificando la firma digital y el hash sha256 con la clave pública disponible en el sitio de iDDi.

## Firma digital de la cadena

Debido a que los datos en el QR se codifican en texto plano, un usuario podría generar un QR manualmente modificando sus datos e imprimir una credencial apócrifa haciendose pasar por otro usuario. Para evitar esto, se implementa un algoritmo de firma digital de clave pública sobre la cadena original para corroborar que el QR no haya sido alterado.

Para ello se utiliza el algoritmo del esquema de firmado EdDSA: **[Ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519)**.

Los códigos QR generados son firmados digitalmente en un servicio externo seguro donde únicamente el proceso de firmado tiene acceso a la clave privada (Key Management Service). La firma digital resultante se concatena a la cadena original para su posterior validación con la clave pública disponible en el sitio de iDDi.

### Generar Firma Digital

El procedimiento que sigue la plataforma para generar la firma digital se resumen en los siguientes pasos:

1.  Se concatena la [cadena original con los datos básicos](#datos-basicos):

```
# Cadena original
iDDi1|L|19003500|LADRON DE GUEVARA, DE LA TEJERA, MARIA DEL CONSUELO|CIENCIAS DE LA EDUCACION|6895|1zr1RN
```   

2.  Se calcula su hash SHA256 en representación hexadecimal, es decir, la salida del hash deben ser dígitos hexadecimales en minúsculas. Este será el _message_:

```
# sha256
828273405a6e4e77beb89a76323e2261e9037e628d2ef86f29f172d1f7c3133c
```

3.  Se firma el hash resultante (_message_) con la clave privada de la plataforma y se codifica el resultado en base64, este será la _signature_ o la firma digital:

```
# ed25519 signature
ED+K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz+UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6+wgbsr4nt3TaZeFc2UwBg==
```   

### Validar Firma Digital

Para validar la firma y certificar que no se ha alterado, se debe calcular el hash SHA256 de la cadena original (_mesagge_), y comparar con la firma digital usando la clave pública. [En este enlace](http://ed25519.herokuapp.com/) se encuentra una implementación del algoritmo ed25519, los datos de entrada serían los siguientes:

```
http://ed25519.herokuapp.com/

Public Key (ejemplo):
PWgp0g3bjpP5RQjZPSgUBWb9c4Gu27ZVTfTgzRXYSJM=

Message:
828273405a6e4e77beb89a76323e2261e9037e628d2ef86f29f172d1f7c3133c

Signature:
ED+K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz+UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6+wgbsr4nt3TaZeFc2UwBg==
```

Y al dar clic en el botón Verify, aparecerá un mensaje con el texto "Valid".

### Anexar firma digital al QR

1.  Asegurarse que la firma digital sea Base64 URL Safe, esto es, reemplazar los caracteres `+/` por `-_` respectivamente y eliminar el padding (el signo `=`) para que no genere conflictos al transportarlo como parámetro en la URL en el navegador:

```
ED-K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz-UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6-wgbsr4nt3TaZeFc2UwBg
```      

2.  Se concatena la firma digital **al final de la cadena original** separado por el caracter `|`, esta es la cadena del QR de Identidad:

```
iDDi1|L|19003500|LADRON DE GUEVARA, DE LA TEJERA, MARIA DEL CONSUELO|CIENCIAS DE LA EDUCACION|6895|1zr1RN|ED-K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz-UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6-wgbsr4nt3TaZeFc2UwBg
```

3.  Finalmente, para generar un QR que actúe como un enlace y que lleve directo al validador en la Plataforma iDDi con la cadena firmada como parámetro, se le antepone el [prefijo](#prefijo) separado por el caracter `#`:

```
https://iddi.uan.mx/v#iDDi1|L|19003500|LADRON DE GUEVARA, DE LA TEJERA, MARIA DEL CONSUELO|CIENCIAS DE LA EDUCACION|6895|1zr1RN|ED-K0rHdENdgdMOhcPgD12iRGA1K1lP6Wz-UwSZzj8VOe4MsMdTVPMWJFcAS9YVs6-wgbsr4nt3TaZeFc2UwBg
```

Esa es la cadena final que se debe codificar en el código QR de Identidad acorde a las [Especificaciones Técnicas](#especificaciones-tecnicas) del QR.