# Docker Architecture & Services Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Docker Compose Orchestration                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │            Finance Network (finance-network)                 │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  ┌─────────────────────┐         ┌───────────────────────┐ │ │
│  │  │ finance-backend     │         │ finance-frontend      │ │ │
│  │  │ (Port 5000)         │◄────────│ (Port 5173)           │ │ │
│  │  │ ────────────────    │ HTTP    │ ──────────────        │ │ │
│  │  │ Node.js + Express   │ Request │ React + Vite          │ │ │
│  │  │ In-memory Storage   │         │ API Consumer          │ │ │
│  │  │ Health: ✓ Enabled   │         │                       │ │ │
│  │  └─────────────────────┘         └───────────────────────┘ │ │
│  │          ▲                                                   │ │
│  │          │                                                   │ │
│  │    Endpoints:                                               │ │
│  │    /api/dashboard (GET)                                     │ │
│  │    /api/expenses (POST/GET)                                │ │
│  │    /api/income (POST/GET)                                  │ │
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │           Training Network (training-network)                │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  ┌─────────────────────────────────────────────────────┐   │ │
│  │  │        training-backend (Port 3000)                 │   │ │
│  │  │        ──────────────────────────────              │   │ │
│  │  │ Node.js + Express + Sequelize + SQLite            │   │ │
│  │  │ Health: ✓ Enabled                                  │   │ │
│  │  │                                                     │   │ │
│  │  │ Endpoints:                                          │   │ │
│  │  │ ├─ /users (CRUD operations)                        │   │ │
│  │  │ ├─ /courses (CRUD operations)                      │   │ │
│  │  │ └─ /enrollments (CRUD operations)                  │   │ │
│  │  │                                                     │   │ │
│  │  │ Database: SQLite (persisted)                       │   │ │
│  │  │ Volume: ./2026_01_19/db/database.sqlite           │   │ │
│  │  └─────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │           DevOps Network (devops-network)                    │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  ┌─────────────────────────────────────────────────────┐   │ │
│  │  │        devops-frontend (Port 5174)                  │   │ │
│  │  │        ──────────────────────────────              │   │ │
│  │  │ React + Vite                                        │   │ │
│  │  │ Built with multi-stage optimization               │   │ │
│  │  └─────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Adding an Expense (Finance Tracker)
```
User Browser                    Frontend (React)          Backend (Express)
     │                               │                            │
     │──1. Enter expense data───────>│                            │
     │                               │──2. POST /api/expenses─────>│
     │                               │                            │
     │                               │<──3. 201 Created────────────│
     │                               │                            │
     │                               │──4. GET /api/dashboard────>│
     │<──5. Update Dashboard────────│                            │
     │                               │<──6. Return summary────────│
     │
```

## 🔧 Environment Variables

### Personal Finance Backend
```env
NODE_ENV=production
PORT=5000
```

### Personal Finance Frontend
```env
VITE_API_URL=http://localhost:5000
```

### Training Platform Backend
```env
NODE_ENV=production
PORT=3000
```

### DevOps Frontend
```env
VITE_API_URL=http://localhost:5173
```

## 📦 Image Specifications

### Backend Images
- **Base Image:** node:20-alpine
- **Size:** ~200-250MB
- **Weight:** Lightweight Alpine Linux
- **Health Check:** 30s interval, 10s timeout

### Frontend Images (Multi-stage Build)
- **Build Stage:** node:20-alpine
- **Production Stage:** node:20-alpine + serve
- **Final Size:** ~150-200MB
- **Optimization:** Only dist folder shipped

## 🌐 Port Mapping

| Container | Internal Port | Host Port | URL |
|-----------|---------------|-----------|-----|
| finance-backend | 5000 | 5000 | http://localhost:5000 |
| finance-frontend | 5173 | 5173 | http://localhost:5173 |
| training-backend | 3000 | 3000 | http://localhost:3000 |
| devops-frontend | 5173 | 5174 | http://localhost:5174 |

## 💾 Volume Mounts

```
Finance Backend
├─ ./personal-finance-tracker09-02-2026/backend/node_modules
│  └─ Persistent node_modules (faster rebuilds)

Finance Frontend
├─ ./personal-finance-tracker09-02-2026/frontend/node_modules
│  └─ Persistent node_modules

Training Backend
├─ ./2026_01_19/db
│  └─ SQLite database (persistent data)
├─ ./2026_01_19/node_modules
│  └─ Persistent node_modules

DevOps Frontend
└─ ./devops28-01-2026/frontend/node_modules
   └─ Persistent node_modules
```

## 🔗 Service Dependencies

```
finance-frontend ──depends on──> finance-backend
training-backend (standalone)
devops-frontend (standalone)
```

## 🚀 Deployment Flow

```
docker-compose build
         │
         ├─> Build finance-backend:latest
         ├─> Build finance-frontend:latest
         ├─> Build training-backend:latest
         └─> Build devops-frontend:latest
         │
docker-compose up -d
         │
         ├─> Create networks (finance, training, devops)
         ├─> Start finance-backend + health check
         ├─> Start finance-frontend (depends on backend)
         ├─> Start training-backend + health check
         └─> Start devops-frontend
         │
All services online and ready
```

## 🔍 Monitoring & Health Status

### Health Check Details
```
Interval: 30 seconds
Timeout: 10 seconds
Start Period: 40 seconds
Max Retries: 3

Status Codes:
- healthy: Service responding to HTTP requests
- unhealthy: Service not responding (will restart)
- starting: Waiting for start period to complete
```

## 📈 Scaling Considerations

### Current Setup
- All services on single host
- Shared Docker network bridge
- In-memory storage for finance tracker

### Future Scalability
1. Use Docker Swarm for multi-host deployment
2. Add reverse proxy (Nginx) for load balancing
3. Migrate to Kubernetes for container orchestration
4. Add Redis cache layer
5. Implement database replication
6. Use managed services (Cloud SQL, Firebase)

## 🔐 Security Considerations

### Current Implementation
- ✅ Network isolation via bridge networks
- ✅ Port mapping to required ports only
- ✅ Alpine Linux (minimal attack surface)
- ✅ Container restart policies

### Recommended Enhancements
1. Add environment secrets management
2. Implement API authentication (JWT/OAuth)
3. Use private Docker registry
4. Add CORS restrictions
5. Implement rate limiting
6. Use HTTPS/TLS certificates
7. Add API versioning
8. Implement request validation

## 📝 Logs Investigation Guide

### View all logs
```bash
docker-compose logs
```

### Follow logs in real-time
```bash
docker-compose logs -f
```

### View specific service logs
```bash
docker-compose logs finance-backend
docker logs finance-backend
```

### View last N lines
```bash
docker-compose logs --tail=50 finance-backend
```

## 🧪 Testing Services

### Test Finance Backend
```bash
# Health check
curl http://localhost:5000/api/dashboard

# Add expense
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Groceries","amount":50}'

# Get expenses
curl http://localhost:5000/api/expenses
```

### Test Training Backend
```bash
# Server status
curl http://localhost:3000

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get users
curl http://localhost:3000/users

# Create course
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Docker Basics","price":99.99,"description":"Learn Docker"}'

# Enroll user in course
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"courseId":1}'
```

## 📋 Troubleshooting Checklist

- [ ] Docker daemon is running
- [ ] All services started successfully: `docker-compose ps`
- [ ] No port conflicts: `docker ps`
- [ ] Networks created: `docker network ls`
- [ ] Volumes created: `docker volume ls`
- [ ] Health checks passing: `docker ps --format "table {{.Names}}\t{{.Status}}"`
- [ ] Backend API responding: `curl http://localhost:5000/api/dashboard`
- [ ] Frontend loading: Open browser to http://localhost:5173

---

**Last Updated:** February 25, 2026
**Docker Version:** 3.8+
**Status:** ✅ Ready for production
