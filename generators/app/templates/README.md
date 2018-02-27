# Proyect-base-front

[![Atmira](./atmira-digital.png)](http://www.atmira.com/inicio)

Generador de proyectos proyectos Front


Se agregan pequeños comentarios de donde se puede encontrar información en los mismos ficheros. 

Descripcion carpeta build:

archivos:

    - check-versions.js
    - dev-client.js
    - dev-server.js
    - utils.js
    - webpack.base.conf.js
    - webpack.dev.conf.js

    · check-versions.js: Archivo para checkear las versiones de node y npm que se tienen instaladas y las que se describen en el package.json.

    · dev-client.js: Archivo que contiene el codigo para hacer el reload del servidor cuando se detecten cambios.

    · utils.js: Archivo de utilidades. Contiene assetsPath, que es donde se configura la ruta de los assets, cssLoaders y styleLoaders, que genera el loader específico y su configuración para el tratamiento de estilos (css, postcss, less, sass, scss, stylus), previamente instalado como dependencia.

    · webpack.base.conf.js: configuracion base para los distintos entornos (desarrollo, test y producción) de webpack.

    · webpack.dev.conf.js: configuracion para el entorno de desarrollo. Tiene dependencia con todos los archivos de build. Se hace la llamada aquí para levantar el servidor de pruebas y el hotReload

    · dev-server.js: configuración del servidor de pruebas: express + http-proxy-middleware. Para configurar el proxy, se debe de hacer el ./conf/dev.env.js.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>