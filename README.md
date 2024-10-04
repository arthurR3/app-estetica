# Estética Principal - Aplicación Móvil

## Descripción del Proyecto
La **Estética Principal** es una aplicación móvil desarrollada utilizando **React Native** que permite a los usuarios gestionar citas para servicios estéticos, realizar compras de productos de belleza, y acceder a su perfil personal. La aplicación está diseñada para brindar una experiencia de usuario optimizada para dispositivos móviles, garantizando una navegación intuitiva y fluida.

## Objetivos del Proyecto
-	**Agendar citas:** Los usuarios pueden revisar la disponibilidad y agendar citas para servicios en la estética.
-	**Comprar productos de belleza:** Los usuarios pueden explorar un catálogo de productos y realizar compras directamente desde la aplicación.
-	**Gestión de usuarios:** Incluye funcionalidades de registro, inicio de sesión, recuperación de contraseña y edición del perfil personal.
-	**Optimización para móviles:** La aplicación está diseñada para funcionar de manera rápida y eficiente en dispositivos Android e iOS.

## Metodología de Trabajo
El desarrollo del proyecto sigue la metodología ágil **Scrum**. Se divide en sprints de dos semanas, lo que permite realizar entregas incrementales y recibir retroalimentación continua para asegurar la calidad del producto. Los sprints se organizan en torno a objetivos específicos, como la implementación de funcionalidades clave o la corrección de errores.

## Herramienta de Control de Versiones
La herramienta seleccionada para el control de versiones es **Git**, con un repositorio alojado en **GitHub**. Git permite a los desarrolladores trabajar en diferentes características de manera simultánea mediante el uso de ramas (branches). El flujo de trabajo se estructura siguiendo la estrategia **Git Flow**, que organiza las ramas de desarrollo para garantizar que el código de producción esté siempre estable.

## Flujo de Trabajo en Git
1.	**Rama** `main`: Contiene el código listo para producción.
2.	**Rama** `develop`: Es donde se integran nuevas funcionalidades que aún están en desarrollo.
3.	**Feature branches**: Cada nueva funcionalidad se desarrolla en una rama individual a partir de `develop`. Una vez completada, se fusiona de nuevo en `develop`.
4.	**Hotfix branches**: Estas ramas se utilizan para corregir errores críticos directamente en `main` sin interrumpir el desarrollo en `develop`.

## Estrategia de Versionamiento
Para el versionamiento, se sigue la estrategia Git Flow, la cual proporciona un flujo claro para la creación, revisión y fusión de ramas. Esto asegura que el desarrollo sea modular y organizado.
-	**Rama** `main`: Solo contiene el código listo para producción.
-	**Rama** `develop`: Contiene el código que está siendo preparado para la siguiente versión.
-	**Feature branches**: Se crean para cada nueva funcionalidad y se fusionan en `develop` una vez completadas.
-	**Hotfix branches**: Se crean cuando es necesario corregir errores críticos en la versión de producción, permitiendo actualizaciones rápidas sin interferir con el desarrollo continuo.

## Estrategia de Despliegue
La estrategia de despliegue seleccionada para la aplicación móvil es **Rolling (Progresivo)**. Esta estrategia permite implementar la aplicación de manera gradual, liberando la actualización a pequeños grupos de usuarios antes de que esté disponible para todos. Esto reduce el riesgo de errores generalizados en producción.

## Entornos de Despliegue
1.	**Desarrollo:** Utilizado por los desarrolladores para realizar pruebas internas.
2.	**Staging:** Entorno donde se realizan pruebas más exhaustivas antes del despliegue en producción.
3.	**Producción:** Versión final de la aplicación disponible para todos los usuarios.
   
## Proceso de CI/CD
El proceso de CI/CD (Integración Continua/Despliegue Continuo) está automatizado mediante **GitHub Actions**. Cada vez que el código es fusionado en la rama `develop` o `main`, se activan las siguientes tareas:
1.	**Ejecución de pruebas automáticas:** Se realizan pruebas unitarias y de integración.
2.	**Despliegue en el entorno de staging:** Si las pruebas son exitosas, el código se despliega automáticamente en staging.
3.	**Despliegue en producción:** Una vez que el equipo valida el funcionamiento en staging, se realiza el despliegue en producción.

## Instrucciones para Clonar el Repositorio e Instalar Dependencias
Sigue los pasos a continuación para clonar el proyecto y ejecutar la aplicación en tu entorno local.

## Clonar el Repositorio

```bash
git clone https://github.com/arthurR3/app-estetica.git
cd estetica-principal-movil
```

## Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

## Ejecutar la Aplicación
Para ejecutar la aplicación en un entorno de desarrollo:

En iOS:

```bash
npx react-native run-ios
```

En Android:

```bash
npx react-native run-android
```

