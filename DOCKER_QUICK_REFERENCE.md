# Docker Quick Reference Guide

## Essential Commands

### Build & Run
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build finance-backend

# Build without cache
docker-compose build --no-cache

# Start all services
docker-compose up -d

# Start and view logs
docker-compose up

# Stop all services
docker-compose down

# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart finance-backend
```

### View Status
```bash
# List all running containers
docker-compose ps

# List all containers (including stopped)
docker-compose ps -a

# Show detailed status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check health status
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Logs
```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service
docker-compose logs finance-backend

# View last 50 lines
docker-compose logs --tail=50

# Follow specific service
docker-compose logs -f training-backend

# View logs with timestamps
docker-compose logs -t -f
```

### Execute Commands
```bash
# Run command in running container
docker-compose exec finance-backend npm test

# Get shell access
docker-compose exec finance-backend sh

# Run interactive shell
docker-compose exec -it training-backend bash

# Check Node version
docker-compose exec finance-backend node --version

# Check npm packages
docker-compose exec finance-backend npm list
```

### Container Management
```bash
# Stop all services
docker-compose stop

# Stop specific service
docker-compose stop finance-backend

# Remove containers (keep images)
docker-compose down

# Remove everything (containers, images, volumes)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Pause all services
docker-compose pause

# Unpause all services
docker-compose unpause
```

### Volumes
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect 2026_01_19_db

# Remove unused volumes
docker volume prune

# Remove specific volume
docker volume rm 2026_01_19_db
```

### Networks
```bash
# List networks
docker network ls

# Inspect network
docker network inspect finance-network

# Remove unused networks
docker network prune

# Test connectivity between containers
docker-compose exec finance-backend ping training-backend
```

### Debugging
```bash
# Show running processes
docker-compose top finance-backend

# Show resource usage
docker stats

# Display low-level info
docker-compose exec finance-backend ps aux

# Check environment variables
docker-compose config

# Validate docker-compose file
docker-compose config --quiet

# Display full config
docker-compose config
```

### Image Management
```bash
# List images
docker images

# Remove image
docker rmi finance-backend:latest

# Remove unused images
docker image prune

# Show image details
docker inspect finance-backend:latest

# View image history
docker history finance-backend:latest

# Tag image
docker tag finance-backend devops/finance-backend:v1.0

# Push to registry
docker push devops/finance-backend:v1.0
```

---

## Common Workflows

### Initial Setup
```bash
# 1. Clone/navigate to project
cd d:\Devops

# 2. Build images
docker-compose build

# 3. Start services
docker-compose up -d

# 4. Verify all running
docker-compose ps

# 5. Check logs for errors
docker-compose logs
```

### Development Workflow
```bash
# 1. Make code changes
# 2. Rebuild specific service
docker-compose build finance-backend

# 3. Restart service
docker-compose up -d finance-backend

# 4. Check logs
docker-compose logs -f finance-backend

# 5. Test changes
curl http://localhost:5000/api/dashboard
```

### Debugging Issues
```bash
# 1. Check running containers
docker-compose ps

# 2. View logs
docker-compose logs -f

# 3. Get shell access
docker-compose exec finance-backend sh

# 4. Check network connectivity
docker-compose exec finance-backend ping training-backend

# 5. Restart if needed
docker-compose restart finance-backend
```

### Clean Up
```bash
# 1. Stop all services
docker-compose stop

# 2. Remove containers and networks
docker-compose down

# 3. Remove volumes if needed
docker volume prune

# 4. Remove images
docker image prune -a

# 5. Remove networks
docker network prune

# 6. Final cleanup
docker system prune -a
```

### Update Service
```bash
# 1. Edit source code
# 2. Rebuild
docker-compose build finance-backend --no-cache

# 3. Recreate container
docker-compose up -d finance-backend

# 4. Verify
docker-compose logs finance-backend
```

---

## API Testing

### Personal Finance Backend (5000)
```bash
# Dashboard summary
curl http://localhost:5000/api/dashboard

# Add expense
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Groceries","amount":50}'

# Get expenses
curl http://localhost:5000/api/expenses

# Add income
curl -X POST http://localhost:5000/api/income \
  -H "Content-Type: application/json" \
  -d '{"source":"Salary","amount":5000}'

# Get income
curl http://localhost:5000/api/income
```

### Training Backend (3000)
```bash
# API status
curl http://localhost:3000

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get all users
curl http://localhost:3000/users

# Get user by ID
curl http://localhost:3000/users/1

# Update user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe"}'

# Create course
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Docker Basics","description":"Learn Docker","price":99.99,"status":"published"}'

# Get all courses
curl http://localhost:3000/courses

# Enroll user in course
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"courseId":1}'

# Get enrollments
curl http://localhost:3000/enrollments

# Update enrollment progress
curl -X PUT http://localhost:3000/enrollments/1 \
  -H "Content-Type: application/json" \
  -d '{"progress":50}'
```

---

## Environment Variables Reference

### Finance Backend (.env)
```
NODE_ENV=production
PORT=5000
```

### Finance Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Training Backend (.env)
```
NODE_ENV=production
PORT=3000
```

### DevOps Frontend (.env)
```
VITE_API_URL=http://localhost:5173
```

---

## Useful Docker Compose Flags

```bash
# Run in background
docker-compose up -d

# Don't recreate existing containers
--no-recreate

# Recreate containers even if unchanged
--force-recreate

# Don't autostart linked services
--no-deps

# Remove containers on exit
--remove-orphans

# Use specific compose file
docker-compose -f docker-compose.yml up -d

# Set service scale
docker-compose up -d --scale finance-backend=2

# Set project name
docker-compose -p myproject up -d

# Parallel startup
docker-compose up -d --parallel 4

# Follow logs
-f, --follow

# Show timestamps
-t, --timestamps

# Tail N lines
--tail=100

# Display output
--no-log-prefix
```

---

## Error Solutions

### Port Already in Use
```bash
# Find which container uses port
docker ps | grep :5000

# Stop the container
docker stop <container_id>

# Or change port in docker-compose.yml
ports:
  - "5001:5000"  # Use different host port
```

### Out of Disk Space
```bash
# Check disk usage
docker system df

# Clean up
docker system prune -a
```

### Container Not Starting
```bash
# Check logs
docker-compose logs finance-backend

# Get into container
docker-compose exec finance-backend sh

# Check health status
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Network Issues
```bash
# List networks
docker network ls

# Inspect network
docker network inspect finance-network

# Test connectivity
docker-compose exec finance-backend ping training-backend

# Check DNS
docker-compose exec finance-backend nslookup training-backend
```

### Database Issues
```bash
# Access database
docker-compose exec training-backend sqlite3 ./db/database.sqlite

# Backup database
docker volume inspect 2026_01_19_db

# Restore database
docker run -v 2026_01_19_db:/db -v /backup:/backup training-backend sqlite3 /db/database.sqlite < /backup/database.sqlite
```

---

## Memory & Performance

### Check Resource Usage
```bash
# Real-time stats
docker stats

# Specific container
docker stats finance-backend

# Exit stats view
# Press Ctrl+C
```

### Limit Resources
```yaml
# In docker-compose.yml
services:
  finance-backend:
    # ... other config ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## Documentation

- 📖 Main Guide: `DOCKER_README.md`
- 🏗️ Architecture: `DOCKER_ARCHITECTURE.md`
- ✅ Setup Summary: `DOCKER_SETUP_SUMMARY.md`
- 🔗 Docker Official: https://docs.docker.com
- 🐳 Compose Reference: https://docs.docker.com/compose/compose-file/

---

**Last Updated:** February 25, 2026
**Quick Reference Version:** 1.0
