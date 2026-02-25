# Docker Setup Instructions

## Overview
This workspace contains multiple Node.js/React applications containerized with Docker.

### Projects:
1. **Personal Finance Tracker** - Full-stack app with React frontend and Express backend
2. **Training Platform** (2026_01_19) - Backend with user, course, and enrollment management
3. **DevOps Frontend** - React frontend application

## Prerequisites
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose v3.8+
- 4GB+ RAM available for Docker

## Building & Running All Services

### 1. Build all images:
```bash
docker-compose build
```

### 2. Start all services:
```bash
docker-compose up -d
```

### 3. View logs:
```bash
docker-compose logs -f
```

### 4. Stop all services:
```bash
docker-compose down
```

## Individual Service URLs

| Service | URL | Port |
|---------|-----|------|
| Personal Finance API | http://localhost:5000 | 5000 |
| Personal Finance Frontend | http://localhost:5173 | 5173 |
| Training Platform API | http://localhost:3000 | 3000 |
| DevOps Frontend | http://localhost:5174 | 5174 |

## API Endpoints

### Personal Finance Tracker (Port 5000)
- `GET /api/dashboard` - Get financial summary
- `POST /api/expenses` - Create expense
- `GET /api/expenses` - Get all expenses
- `POST /api/income` - Create income entry
- `GET /api/income` - Get all income entries

### Training Platform (Port 3000)
- `GET /` - API status
- `GET /users` - Get all users
- `POST /users` - Create user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /courses` - Get all courses
- `POST /courses` - Create course
- `GET /courses/:id` - Get course details
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `GET /enrollments` - Get all enrollments
- `POST /enrollments` - Enroll user in course
- `PUT /enrollments/:id` - Update enrollment
- `DELETE /enrollments/:id` - Delete enrollment

## Testing Services

### Test Personal Finance API:
```bash
# Create expense
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Groceries","amount":50}'

# Get dashboard
curl http://localhost:5000/api/dashboard
```

### Test Training Platform API:
```bash
# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get users
curl http://localhost:3000/users
```

## Troubleshooting

### Port already in use
```bash
# Stop conflicting service
docker ps
docker stop <container_id>
```

### Out of space
```bash
docker system prune -a
```

### View specific container logs
```bash
docker logs finance-backend
docker logs training-backend
docker logs finance-frontend
docker logs devops-frontend
```

### Rebuild specific service
```bash
docker-compose build --no-cache finance-backend
```

## Docker Compose Services

### Finance Backend
- Port: 5000
- Technology: Node.js + Express
- Storage: In-memory (restarts on container restart)
- Health Check: Enabled

### Finance Frontend
- Port: 5173
- Technology: React + Vite
- Build: Multi-stage (build → serve)
- Dependencies: finance-backend

### Training Backend
- Port: 3000
- Technology: Node.js + Express + Sequelize + SQLite
- Database: SQLite (persisted in /db volume)
- Health Check: Enabled

### DevOps Frontend
- Port: 5174
- Technology: React + Vite
- Build: Multi-stage (build → serve)

## Environment Variables

Set environment variables in `docker-compose.yml` or create a `.env` file:

```bash
VITE_API_URL=http://localhost:5000    # Frontend API URL
NODE_ENV=production                    # Node environment
PORT=5000                              # Backend port
```

## Persistent Data

- **Training Platform**: Database stored in `./2026_01_19/db/database.sqlite`
- **Finance Tracker**: In-memory only (not persisted)

## Network

All services are connected via bridge networks:
- `finance-network` - Finance tracker services
- `training-network` - Training platform services  
- `devops-network` - DevOps frontend

## Development vs Production

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```
(Add volumes for hot-reload)

### Production
```bash
docker-compose up -d
```
Current setup is production-ready with health checks and optimized images.

## Code Corrections Made

1. ✅ Fixed vite.config.js to bind to 0.0.0.0 for Docker
2. ✅ Fixed database path in 2026_01_19 backend to use persistent volume
3. ✅ Added health checks to backend services
4. ✅ Added .dockerignore files to all services
5. ✅ Multi-stage builds for optimized frontend images
6. ✅ Proper networking between services

## Performance Tips

1. Use named volumes for persistent data
2. Limit container resources in docker-compose.yml
3. Use Alpine Linux images (lighter weight)
4. Multi-stage builds for frontend (reduced image size)
5. Health checks for better orchestration

## Next Steps

1. Add environment-specific compose files (.dev, .prod, .test)
2. Add Kubernetes manifests for cloud deployment
3. Implement CI/CD pipeline with Docker registries
4. Add database backups for Training Platform
5. Implement reverse proxy (Nginx) for production
