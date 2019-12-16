---
title: API Pública
language_tabs:
  - shell: CURL
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

<h1 id="api-p-blica">API Pública v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API pública para consulta de perfil y catálogos de la Plataforma iDDi

<!-- https://auth0.com/docs/api/management/v2 -->

Base URLs:

* <a href="https://api.iddi.uan.mx/{environment}/iddi">https://api.iddi.uan.mx/{environment}/iddi</a>

    * **env** -  Default: v1

        * v1

        * v1-stag

* <a href="http://127.0.0.1:3100">http://127.0.0.1:3100</a>

Email: <a href="mailto:aurex@uan.edu.mx">Aurex</a> 

# Authentication

* API Key (accessToken)
    - Parameter Name: **Authorization**, in: header. Para autenticarse en la API, se debe pasar un **API access token** en la cabecera `Authorization` en forma de `Bearer <accessToken>`.

- HTTP Authentication, scheme: bearer 

<h1 id="api-p-blica-perfil">Perfil</h1>

Perfil básico, estatus escolar/administrativo, estatus de la iDentidad Digital del Usuario. QR, vigencia y estatus de iDDi movil.

## Perfil por folio

<a id="opIdget_perfil_by_folio"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://api.iddi.uan.mx/{environment}/iddi/perfil/{folio}?firma_digital=string \
  -H 'Accept: application/json' \
  -H 'Authorization: API_KEY'

```

`GET /perfil/{folio}`

Obtiene el Perfil del usuario y su estatus usando el folio de la credencial.

Es neccesario enviar como parámetro además del folio, la firma digital del QR para certificar que es un folio de una credencial emitida por iDDi.

Para solicitar el perfil extendido se requiere el scope `perfil:extendido` en el Access Token

<h3 id="perfil-por-folio-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|perfil_extendido|query|boolean|false|Solicita el perfil extendido de esta credencial.|
|firma_digital|query|string|true|EL componente de firma digital (último campo) del QR de una Credencial|
|folio|path|string|true|Folio de la credencial|

#### Detailed descriptions

**perfil_extendido**: Solicita el perfil extendido de esta credencial.

Requiere scope `perfil:extendido`.

> Example responses

> 200 Response

```json
{
  "id": "5dbd3c",
  "nombre": "VALENTINA JOSEFINA",
  "ap_paterno": "LADRON DE GUEVARA",
  "ap_materno": "ESPINOSA DE LOS MONTEROS",
  "email": "iddi@uan.edu.mx",
  "telefono": "(311) 211 8800",
  "foto_url": "https://www.gravatar.com/avatar/278a5dbd3c0a9ec099df1755b4f7875f.jpg?size=400&d=identicon",
  "foto_aceptada": true,
  "iddi_qr": true,
  "iddi_movil": false,
  "perfiles": [
    {
      "tipo": "L",
      "id_perfil": "5dbd3c",
      "matricula": "13047970",
      "carrera_id": 6254,
      "u_academica": "UA DE TURISMO",
      "programa": "NUTRICION",
      "periodo": "AGO2013",
      "estatus": "EGRESADO",
      "id_iddi_qr": true,
      "vigencia_at": "2019-12-11"
    }
  ]
}
```

> Hubo un problema al procesar tu solicitud, por favor inténtalo de nuevo o inténtalo más tarde.

```json
{
  "status": "fail",
  "code": "error_generico",
  "data": {
    "message": "Hubo un problema al procesar tu solicitud, por favor inténtalo de nuevo o inténtalo más tarde."
  }
}
```

<h3 id="perfil-por-folio-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[Usuario](#schemausuario)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|ID proporcionado inválido|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|No autorizado|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Recurso no encontrado|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Excepción de validación|[ApiFailValidation](#schemaapifailvalidation)|
|default|Default|Hubo un problema al procesar tu solicitud, por favor inténtalo de nuevo o inténtalo más tarde.|[ApiError](#schemaapierror)|

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|X-Rate-Limit|number||none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
accessToken ( Scopes: perfil perfil:extendido )
</aside>

# Schemas

<h2 id="tocSusuario">Usuario</h2>

<a id="schemausuario"></a>

```json
{
  "id": "5dbd3c",
  "nombre": "VALENTINA JOSEFINA",
  "ap_paterno": "LADRON DE GUEVARA",
  "ap_materno": "ESPINOSA DE LOS MONTEROS",
  "email": "iddi@uan.edu.mx",
  "telefono": "(311) 211 8800",
  "foto_url": "https://www.gravatar.com/avatar/278a5dbd3c0a9ec099df1755b4f7875f.jpg?size=400&d=identicon",
  "foto_aceptada": true,
  "iddi_qr": true,
  "iddi_movil": false,
  "perfiles": [
    {
      "tipo": "L",
      "id_perfil": "5dbd3c",
      "matricula": "13047970",
      "carrera_id": 6254,
      "u_academica": "UA DE TURISMO",
      "programa": "NUTRICION",
      "periodo": "AGO2013",
      "estatus": "EGRESADO",
      "id_iddi_qr": true,
      "vigencia_at": "2019-12-11"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|ID del usuario|
|nombre|string|false|none|none|
|ap_paterno|string\|null|false|none|none|
|ap_materno|string\|null|false|none|none|
|email|string|false|none|none|
|telefono|string|false|none|none|
|foto_url|string\|null|false|none|Si ya tiene foto, se retorna url asignada|
|foto_aceptada|boolean|false|none|Si ya tiene foto y fue aceptada|
|iddi_qr|boolean|false|none|Si ya cuenta con al menos una identidad (credencial) verificada|
|iddi_movil|boolean|false|none|Si ya inicializó su iDentidad Digital Móvil con la APP de UAN iDDi|
|perfiles|[oneOf]|false|none|Si es tipo Personal (A,D): Listado de adscripciones activas.  Si es tipo Alumno (L,B,P): Listado de carreras donde se ha matriculado este alumno. Un alumno podría tener varias carreras con la misma matrícula.  Si es Externo o Staff: entidad que se está verificando y con la que debe iniciar sesión|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PerfilAlumno](#schemaperfilalumno)|false|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PerfilTrabajador](#schemaperfiltrabajador)|false|none|none|

<h2 id="tocSperfilalumno">PerfilAlumno</h2>

<a id="schemaperfilalumno"></a>

```json
{
  "tipo": "L",
  "id_perfil": "5dbd3c",
  "matricula": "13047970",
  "carrera_id": 6254,
  "u_academica": "UA DE TURISMO",
  "programa": "NUTRICION",
  "periodo": "AGO2013",
  "estatus": "EGRESADO",
  "id_iddi_qr": true,
  "vigencia_at": "2019-12-11"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tipo|string|false|none|Tipo de usuario: B,L,P|
|id_perfil|string|false|none|ID del perfil de este usuario (id_usuario_carrera | id_usuario_adscripcion)|
|matricula|string|false|none|Matrícula del alumno para esta carrera. Podría ser una matrícula diferente por carrera o también la misma matrícula para varias carreras|
|carrera_id|integer|false|none|ID de SADCE de la carrera|
|u_academica|string|false|none|Unidad Académica|
|programa|string|false|none|Programa matriculado|
|periodo|string|false|none|Cohorte o Año de ingreso|
|estatus|string|false|none|Estatus académico o administrativo|
|id_iddi_qr|boolean|false|none|Si ya se le ha generado una credencial con QR|
|vigencia_at|string(date)|false|none|Vigencia de la credencial con QR si ya se le generó una|

#### Enumerated Values

|Property|Value|
|---|---|
|tipo|B|
|tipo|L|
|tipo|P|
|estatus|INSCRITO|
|estatus|EGRESADO|
|estatus|A PAGO|
|estatus|BAJA TEMPORAL|
|estatus|BAJA DEFINITIVA|
|estatus|PREINSCRITO|
|estatus|EN TRAMITE|
|estatus|CON RECIBO|
|estatus|ADMITIDO|
|estatus|COMPLEMENTO|
|estatus|CAMBIO DE CARRERA|

<h2 id="tocSperfiltrabajador">PerfilTrabajador</h2>

<a id="schemaperfiltrabajador"></a>

```json
{
  "tipo": "A",
  "id_perfil": "5dbd3c",
  "num_empleado": "87740",
  "estatus": "JUBILADO",
  "id_iddi_qr": true,
  "vigencia_at": "2019-12-11",
  "adscripcion": "RECTORIA",
  "plaza": "CONTRATO",
  "fecha_ingreso": "string",
  "nivel_salarial": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tipo|string|false|none|Tipo de usuario: A,D|
|id_perfil|string|false|none|ID del perfil de este usuario (id_usuario_adscripcion)|
|num_empleado|string|false|none|Número de plaza o trabajador|
|estatus|string|false|none|Estatus del trabajador|
|id_iddi_qr|boolean|false|none|Si ya se le ha generado una credencial con QR|
|vigencia_at|string(date)|false|none|Vigencia de la credencial con QR si ya se le generó una|
|adscripcion|string|false|none|Adscripción|
|plaza|string|false|none|Tipo de plaza según el catálogo de plazas. CONTRATO, BASE, JUBILADO, etc...|
|fecha_ingreso|string|false|none|none|
|nivel_salarial|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|tipo|A|
|tipo|D|
|estatus|ACTIVO|
|estatus|JUBILADO|

<h2 id="tocSapifail">ApiFail</h2>

<a id="schemaapifail"></a>

```json
{
  "status": "fail",
  "code": "no_encontrado",
  "data": {
    "message": "El recurso no fue localizado",
    "msg_type": "alert"
  }
}

```

***FAIL**: Cuando los datos enviados podrían no ser correctos y el usuario puede solventarlo (ej: validación).

Campos requeridos: `status` y `data`. `data.message` es opcional.

Se puede especificar un mensaje de error y su tipo `alert|error|info` en los campos `data.message` y `data.msg_type`.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|
|code|string\|null|false|none|Código personalizado: no_encontrado, no_validacion, 10422, etc|
|data|object|true|none|none|
|» message|string\|null|false|none|none|
|» msg_type|string\|null|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|fail|
|status|error|
|msg_type|alert|
|msg_type|error|
|msg_type|info|

<h2 id="tocSapierror">ApiError</h2>

<a id="schemaapierror"></a>

```json
{
  "status": "error",
  "code": "no_db",
  "data": {
    "message": "No se pudo conectar a la Base de Datos, intentalo de nuevo en unos minutos"
  }
}

```

***ERROR**: Cuando ocurrió un error en el servidor, generalmente estos no suceden (no se pudo escribir, no abrio archivo, no pudo procesar, etc).

Campos requeridos: `status` y `data.message`.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|
|code|string\|null|false|none|Código personalizado: no_db, no_validacion, 10422, etc|
|data|object|true|none|none|
|» message|string\|null|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|fail|
|status|error|

<h2 id="tocSapifailvalidation">ApiFailValidation</h2>

<a id="schemaapifailvalidation"></a>

```json
{
  "status": "fail",
  "code": "no_validacion",
  "data": {
    "message": "Hubo un problema al validar tus datos",
    "validation": [
      {
        "property1": "string",
        "property2": "string"
      }
    ]
  }
}

```

*Problema de validación de los datos enviados, se deben especificar los campos y sus mensajes descriptivos de los problemas.

Campos requeridos: `status` y `data.validation`. `data.message` es opcional.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|
|code|string\|null|false|none|none|
|data|object|true|none|none|
|» message|string\|null|false|none|none|
|» validation|[[ValidationFields](#schemavalidationfields)]|false|none|Arreglo con los campos que no pasaron la validación|

<h2 id="tocSvalidationfields">ValidationFields</h2>

<a id="schemavalidationfields"></a>

```json
{
  "property1": "string",
  "property2": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|string|false|none|none|

