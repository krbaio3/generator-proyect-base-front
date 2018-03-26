# generator-proyect-base-front
generador yo para proyectos base Front

## Introducción

Generador de proyectos en Angular 5. Se presupone que se tiene instalado `nodejs` (min 6.x.x), y `npm` (min 5.x.x)

## Indice


1.  [Instalación de Generador](#install)
    1.  [Crear Aplicación](#app)
    2.  [Crear Componente](#component)
2.  [Arranque de aplicación DEMO](#demo)
3.  [Estructura del proyecto](#structure)
4.  [Servidor de Desarrollo Local](#local)
5.  [Descripción de paquetizador](#package)
6.  [Dockerfile](#docker)

### <a id="install"></a> Instalación de Generador

Para poder hacer uso del generador, hace falta tener instalado Yeoman de manera global:

```sh
$ npm install --global yo
```

El siguiente paso, es instalar el generador de Atmira:

```sh
$ npm install --global generator-proyect-base-front
```

#### Crear Aplicación <a id="app"></a>

Para crear una nueva estructura de carpetas básicas y su configuración, usaremos el comando:

```sh
$ yo proyect-base-front
```

Esto nos pedirá el nombre de la aplicación, el tipo de aplicación y una descripción (opcional). Una vez introducidos los datos de la aplicación, se iniciará el proceso de instalación de dependencias mediante **npm**

#### Crear de Componentes <a id="component"></a>

Para crear un componente, es necesario usar el comando, **dentro del raiz del proyecto**:

```sh
$ yo proyect-base-front:component
```

Esto nos creará un componente Redux dentro de nuestra carpeta **src**

### Arranque de aplicación DEMO <a id="demo"></a>

En el package.json se han provisto unos scripts para hacer más fácil el arranque de la aplicación:

* "start": Arranca la aplicacion con el servidor de desarrollo
* "start:prod": Construye la aplicación con la configuración de producción y arranca con el serviodor de desarrollo en modo `productión`
* "build": Genera el distribuido con la configuración de producción
* "build:dev": Genera el distribuido con la configuración de desarrollo

Para poder ejecutar cada una de estas instrucciones, es necesario introducir, en el caso de `start`:

```sh
$ npm start
```
Y para el resto:
```sh
$ npm run {build|build:dev|start:prod}
```
### Estructura de carpetas <a id="structure"></a>

Estructura básica de una aplicación de ejemplo:

```sh
├── build
│   ├── builder.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── helpers.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   [....]
│   ├── assets
│   │   └── img
│   │       └── angular.png
│   ├── environments
│   │   ├── environment.prod.ts
│   │   ├── environment.ts
│   │   └── model.ts
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles
│   │   └── main.scss
│   └── vendor.ts
├── static
│   └── icon
│       └── favicon.png
├── .editorconfig
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json
```

Definición de carpetas:

* `build` y `config` : Carpetas de configuración del proyecto para los distintos entornos y el servidor local de desarrollo
* `index.html`
* `package.json`
* `.editorconfig`
* `tsconfig.json` : archivo de configuración de TypeScript
* `tslint.json` : archivo de configuración para el linter de TS
* `static` : carpeta de estáticos del proyecto: favicon, iconos según resoluciones (M/T/D), etc
* `src` :
  * `main.ts` : archivo de entrada de la aplicación
  * `polyfills.ts` : archivo que contiene los polyfills necesarios, y los polyfills según entorno
  * `vendor.ts` : archivos de terceros comunes a toda la aplicación.
  * `assets` : carpeta que contiene los assets del proyecto
  * `environments`: carpeta de configuración según entornos
  * `styles` : carpeta que los ficheros de estilos comunes a toda la aplicación.
  * `app` : carpeta que contiene la aplicación en sí misma.

###  Servidor de Desarrollo Local <a id="local"></a>

Se ha creado un servidor de desarrollo local basado en `expressjs`, `http-proxy-middleware` y distintos plugins de `webpack`. Es un servidor ligero y rápido, que tiene habilitado el HR.

### Descripción de paquetizador <a id="package"></a>

Se ha usado `webpack` en su versión 3.x.x, para esta primera fase. Se ha dividido en disitntos entornos, teniendo un `webpack.base`, común a todos los entornos, y un `webpack.dev.conf.js` para construir del entorno de desarrollo y `webpack.prod.conf.js` para la construcción de producción, con el apoyo en los ficheros `builder.js`, `helpers.js` y `utils.js` , para su correcto funcionamiento.

Descripción:

    - check-versions.js
    - dev-client.js
    - dev-server.js
    - utils.js
    - builder.js
    - helpers.js
    - webpack.base.conf.js
    - webpack.dev.conf.js
    - webpack.prod.conf.js

+ check-versions.js: Archivo para checkear las versiones de node y npm que se tienen instaladas y las que se describen en el package.json.

+ dev-client.js: Archivo que contiene el codigo para hacer el reload del servidor cuando se detecten cambios.

+ utils.js: Archivo de utilidades. Contiene assetsPath, que es donde se configura la ruta de los assets y distintas funciones de utilidad que usa webpack

+ webpack.base.conf.js: configuracion base para los distintos entornos (desarrollo, test y producción) de webpack.

+ webpack.dev.conf.js: configuracion para el entorno de desarrollo. Tiene dependencia con todos los archivos de build. Se hace la llamada aquí para levantar el servidor de pruebas y el hotReload

+ dev-server.js: configuración del servidor de pruebas: express + http-proxy-middleware. Para configurar el proxy, se debe de hacer el ./conf/dev.env.js.


### Dockerfile <a id="docker"></a> 
