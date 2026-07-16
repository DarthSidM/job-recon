# Job Recon

Job Recon is an AI-powered job discovery and resume optimization platform that helps job seekers discover relevant opportunities, analyze their resumes against job descriptions, and tailor their applications using Large Language Models (LLMs).

The platform combines semantic search, resume parsing, AI-powered resume customization, and automated job aggregation into a single workflow, enabling users to focus on applying to the most relevant positions instead of manually searching and optimizing every application.

---

## Features

### AI Resume Parsing
- Extracts structured information from uploaded resumes using LLMs.
- Identifies education, experience, projects, skills, certifications, and profile information.
- Stores parsed data for intelligent searching and ranking.

### Semantic Job Matching
- Generates embeddings for resumes and job descriptions.
- Uses pgvector for semantic similarity search.
- Ranks opportunities based on skills, experience, and project relevance.

### AI Resume Builder
- Interactive AI assistant for tailoring resumes to specific job descriptions.
- Maintains conversational context using Redis-backed session memory.
- Suggests improvements, missing skills, and optimized bullet points.

### Automated Job Aggregation
- Periodically collects job listings from multiple company career portals.
- Supports asynchronous scraping and processing using Celery workers.
- Stores normalized job information for efficient searching.

### Intelligent Company Research *(In Progress)*
- AI-powered company research assistant.
- Consolidates information such as products, services, leadership, competitors, revenue, and culture.

### Scalable Backend
- FastAPI-based AI engine.
- Node.js REST API.
- Redis-powered task queues.
- Celery workers for asynchronous processing.
- Dockerized microservice architecture.

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- FastAPI
- Celery
- Redis

### Database
- PostgreSQL (Neon)
- pgvector

### AI
- Ollama
- Gemma
- Qwen Embeddings

### Infrastructure
- Docker
- Docker Compose
- Nginx

---

# Architecture

```
                React Client
                      │
                      ▼
              Node.js API Server
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
     FastAPI Engine          PostgreSQL
          │
          ▼
     Celery Workers
          │
          ▼
        Redis
          │
          ▼
        Ollama
```

---

# Getting Started

## Prerequisites

Before running the project, ensure you have installed:

- Docker
- Docker Compose
- Ollama

Pull the required models:

```bash
ollama pull gemma3
ollama pull qwen3-embedding:4b
```

---

## Clone the repository

```bash
git clone https://github.com/<your-username>/job-recon.git
cd job-recon
```

---

## Configure Environment Variables

Create Docker environment files for each service.

### Server

```
server/.env.docker
```

```env
DATABASE_URL=
PORT=8000

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

ENGINE_URL=http://engine:5000
REDIS_URL=redis://redis:6379/0
```

### Engine

```
engine/app/.env.docker
```

```env
DATABASE_URL=

REDIS_URL=redis://redis:6379/0

LLM_BASE_URL=http://host.docker.internal:11434/v1
LLM_API_KEY=ollama

LLM_MODEL=gemma3:latest
EMBEDDING_MODEL=qwen3-embedding:4b
```

### Client

```
client/.env.docker
```

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## Run the application

Build and start every service:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

---

## Services

| Service | Port |
|----------|------|
| Client | 3000 |
| Server | 8000 |

---

## Project Structure

```
client/
server/
engine/
docker-compose.yml
```

---

# Future Improvements

- AI-powered company research
- AI job application assistant
- Resume scoring
- Cover letter generation
- Personalized interview preparation
- Analytics dashboard

---

# Contributing

This project is currently not accepting external contributions.

---

# License

Copyright © 2026.

**All Rights Reserved.**

This repository is provided for viewing and evaluation purposes only.

You may **not** copy, redistribute, modify, sublicense, or use substantial portions of this codebase in your own projects without explicit written permission from the author.

See the `LICENSE` file for additional details.