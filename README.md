
# Mini Dashboard del Clima

Aplicación fullstack para visualizar datos del clima en tiempo real utilizando NestJS y Next.js.

## ¿Qué incluye?

- Microservicio en **NestJS** con cron job (OpenWeatherMap + PostgreSQL)
- SPA en **Next.js** con login protegido por JWT
- Visualización con **gráfico de temperatura (Recharts)**
- Middleware para proteger rutas
- Cookies para manejo de sesión


## Instalación
### Requisitos

- Node.js `v18+`
- PostgreSQL en local o en la nube
- Cuenta gratuita en [OpenWeatherMap](https://openweathermap.org/api)


### Backend


```
cd backend
cp .env.example .env
```
>[!IMPORTANT]
>Editar `.env` con tus variables reales.
>
>Antes de correr el backend, asegurate de **crear manualmente** una base de datos vacía en PostgreSQL con el mismo nombre que pusiste en tu archivo `.env`
```
npm install
npm run start:dev
```
 Seeder (opcional). El seeder hace una primera consulta a la API de OpenWeatherMap y guarda ese snapshot en la base de datos.
 Útil para tener un primer registro visible.
```
npm run seed
```

### Frontend


```
cd frontend
cp .env.local.example .env.local
```
>[!IMPORTANT]
>Asegurate de que `NEXT_PUBLIC_API_URL` apunte al ?backend
```
npm install
npm run dev
```
### Login

- Usuario: `admin`

- Contraseña: `admin123`

 Definido en el .env del backend

### Visualización
>[!NOTE]
>El gráfico de temperatura se irá completando a medida que el sistema recolecta nuevas capturas automáticas cada hora.
>Cuando ingresás por primera vez, es posible que veas solo 1 o 2 puntos, ¡y está bien! A medida que pasen las horas, el dashboard se actualizará en vivo con más datos para mostrarte cómo evoluciona el clima durante el día.



### Autor

Desarrollado por [juanzch](https://github.com/juanzch)


