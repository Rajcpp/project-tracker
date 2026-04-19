# Project Tracker

A full-stack project management application with user authentication, project organization, and task tracking capabilities. Built with FastAPI, SQLAlchemy, and vanilla JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Optimization Opportunities](#optimization-opportunities)
- [Trade-offs & Design Decisions](#trade-offs--design-decisions)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

### Authentication & Authorization
- **User Registration**: Create new accounts with email validation
- **Secure Login**: JWT-based authentication with bcrypt password hashing
- **Session Management**: Token-based authentication with localStorage
- **Protected Routes**: User-specific data isolation
- **Auto-redirect**: Automatic routing based on authentication state

### Project Management
- **Create Projects**: Organize work into distinct projects
- **View Projects**: Sidebar navigation with active project highlighting
- **Delete Projects**: Confirmation-based deletion with cascade to tasks
- **Project Stats**: Real-time project count display
- **User Isolation**: Each user sees only their own projects

### Task Management
- **Add Tasks**: Create tasks within specific projects
- **Toggle Completion**: Visual checkbox with completion state
- **Delete Tasks**: Confirmation-based task removal
- **Task Counter**: Live count of uncompleted tasks
- **Visual Feedback**: Animated state changes and hover effects

### User Interface
- **Modern Dark Theme**: Midnight Aurora color scheme with gradients
- **Responsive Design**: Mobile-first approach with breakpoints
- **Interactive Animations**: Smooth transitions and micro-interactions
- **Empty States**: Helpful guidance when no data exists
- **Form Validation**: Client and server-side validation
- **Accessibility**: Keyboard navigation and ARIA labels

### User Experience
- **Inline Confirmation**: Delete confirmations without modals
- **Optimistic UI**: Instant visual feedback
- **Error Handling**: Graceful error messages and recovery
- **Loading States**: Visual indicators during operations
- **Auto-focus**: Smart input focus management

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database for data persistence
- **Jinja2**: Template engine for HTML rendering
- **python-jose**: JWT token creation and verification
- **passlib**: Password hashing with bcrypt
- **Uvicorn**: ASGI server implementation

### Frontend
- **Vanilla JavaScript**: ES6+ modules for client-side logic
- **CSS3**: Custom properties, Grid, Flexbox
- **HTML5**: Semantic markup
- **No Framework**: Lightweight, dependency-free frontend

### Development
- **Python 3.8+**: Modern Python features
- **Virtual Environment**: Isolated dependency management
- **Git**: Version control

## Architecture

```
project-tracker/
├── backend/
│   ├── __init__.py
│   ├── api.py              # FastAPI routes and app configuration
│   ├── auth.py             # JWT and password utilities
│   ├── functions.py        # Database operations (CRUD)
│   └── struct.py           # Pydantic models for validation
├── database/
│   ├── __init__.py
│   ├── init_db.py          # Database initialization script
│   ├── model.py            # SQLAlchemy models
│   └── setup.py            # Database configuration
├── frontend/
│   ├── static/
│   │   ├── css/
│   │   │   └── styles.css  # Complete UI styling
│   │   └── js/
│   │       ├── api.js      # API client functions
│   │       ├── auth.js     # Authentication utilities
│   │       ├── components.js # UI component rendering
│   │       ├── delete.js   # Delete confirmation logic
│   │       ├── forms.js    # Form handling
│   │       └── script.js   # Main application logic
│   └── templates/
│       ├── index.html      # Main app interface
│       ├── login.html      # Login page
│       └── register.html   # Registration page
├── .gitignore
├── LICENSE
├── README.md
└── requirements.txt
```

### Design Patterns

- **MVC Pattern**: Separation of concerns across layers
- **Repository Pattern**: Database abstraction in `functions.py`
- **Dependency Injection**: FastAPI's `Depends()` for auth and DB
- **Module Pattern**: ES6 modules for frontend organization
- **Observer Pattern**: Event delegation for dynamic UI updates

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project-tracker.git
   cd project-tracker
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   python -m database.init_db
   ```

5. **Run the application**
   ```bash
   uvicorn backend.api:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Access the application**
   ```
   Open your browser to: http://localhost:8000
   ```

## Usage

### First-time Setup
1. Navigate to the application URL
2. Click "Create one" on the login page
3. Fill in the registration form
4. Login with your credentials

### Creating Projects
1. Click the "+ New" button in the sidebar
2. Enter a project name
3. Click "Create" or press Enter

### Managing Tasks
1. Select a project from the sidebar
2. Click "+ Add Task" in the main area
3. Enter task description
4. Click checkbox to toggle completion
5. Hover over task and click 🗑️ to delete

### Deleting Items
1. Hover over project or task
2. Click the 🗑️ trash icon
3. Confirm or cancel the deletion

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all user projects | Yes |
| POST | `/api/projects` | Create new project | Yes |
| DELETE | `/api/projects/{project_id}` | Delete project | Yes |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects/{project_id}` | Get project tasks | Yes |
| POST | `/api/projects/{project_id}/tasks` | Create task | Yes |
| PUT | `/api/projects/{project_id}/tasks/{task_id}` | Toggle task completion | Yes |
| DELETE | `/api/projects/{project_id}/tasks/{task_id}` | Delete task | Yes |

### Pages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Login page (redirect if authenticated) |
| GET | `/app` | Main application |
| GET | `/register` | Registration page |

## Optimization Opportunities

### Backend Optimizations

#### 1. Database Performance
**Current State**: Single SQLite file with synchronous queries
**Potential Improvements**:
- **Database Indexing**: Add composite indexes on `(user_id, created_at)` for faster project/task queries
- **Connection Pooling**: Implement proper connection pooling for concurrent requests
- **Query Optimization**: Use `joinedload()` to prevent N+1 queries when fetching projects with tasks
- **Pagination**: Add limit/offset for users with many projects
- **Database Upgrade**: Move to PostgreSQL for production use

```python
# Example improvement
projects = db.query(Project)\
    .options(joinedload(Project.tasks))\
    .filter(Project.user_id == user_id)\
    .limit(50)\
    .all()
```

#### 2. Caching Layer
**Potential Improvements**:
- **Redis Cache**: Cache user projects and tasks (5-minute TTL)
- **Response Caching**: Use FastAPI's cache decorators for repeated queries
- **ETags**: Implement HTTP ETags to reduce unnecessary transfers

#### 3. API Response Optimization
**Current State**: Full object serialization
**Potential Improvements**:
- **Field Selection**: Allow clients to specify needed fields (`?fields=id,name`)
- **Response Compression**: Enable gzip compression middleware
- **Batch Operations**: Add endpoints for bulk task updates

#### 4. Authentication
**Current State**: JWT verification on every request
**Potential Improvements**:
- **Token Caching**: Cache decoded tokens temporarily
- **Refresh Tokens**: Implement refresh token rotation
- **Rate Limiting**: Add rate limiting to prevent brute force attacks

### Frontend Optimizations

#### 1. Bundle Optimization
**Current State**: Separate JS modules loaded individually
**Potential Improvements**:
- **Module Bundling**: Use Rollup/Webpack to bundle JS files
- **Minification**: Minify CSS and JS for production
- **Code Splitting**: Lazy load authentication vs. app code
- **Tree Shaking**: Remove unused code

#### 2. Performance
**Current State**: Direct DOM manipulation
**Potential Improvements**:
- **Virtual DOM**: Consider a lightweight framework (Preact, Alpine.js)
- **Debouncing**: Debounce search/filter inputs
- **Intersection Observer**: Lazy render off-screen tasks
- **RequestAnimationFrame**: Batch DOM updates

#### 3. Caching & Storage
**Current State**: localStorage for token only
**Potential Improvements**:
- **IndexedDB**: Cache projects/tasks for offline access
- **Service Worker**: Implement PWA features for offline use
- **Cache-first Strategy**: Load from cache, then update from server

#### 4. Network Optimization
**Current State**: Individual API calls per action
**Potential Improvements**:
- **Request Batching**: Combine multiple operations
- **Optimistic Updates**: Update UI before server confirms
- **WebSockets**: Real-time updates instead of polling
- **GraphQL**: Fetch exactly what's needed in one request

### Infrastructure Optimizations

#### 1. Deployment
**Potential Improvements**:
- **Docker**: Containerize the application
- **CDN**: Serve static assets via CDN
- **Load Balancing**: Horizontal scaling with multiple instances
- **HTTPS**: SSL/TLS termination at load balancer

#### 2. Monitoring
**Potential Improvements**:
- **APM**: Application Performance Monitoring (New Relic, DataDog)
- **Logging**: Structured logging with ELK stack
- **Error Tracking**: Sentry for error monitoring
- **Analytics**: Track user behavior and performance metrics

## Trade-offs & Design Decisions

### 1. SQLite vs PostgreSQL

**Current Choice**: SQLite
- ✅ **Pros**: Zero configuration, file-based, perfect for development
- ❌ **Cons**: Limited concurrency, no replication, size constraints
- 🔄 **Trade-off**: Simplicity over scalability
- 📝 **When to Switch**: Production deployment or >100 concurrent users

### 2. Vanilla JavaScript vs Framework

**Current Choice**: Vanilla JS with ES6 modules
- ✅ **Pros**: No build step, fast initial load, small bundle size
- ❌ **Cons**: More boilerplate, manual state management, no ecosystem
- 🔄 **Trade-off**: Simplicity and control over developer experience
- 📝 **When to Switch**: Complex state management or team scaling

### 3. JWT in localStorage vs httpOnly Cookies

**Current Choice**: JWT in localStorage
- ✅ **Pros**: Easy to implement, works with CORS, simple API calls
- ❌ **Cons**: Vulnerable to XSS attacks, no automatic expiration
- 🔄 **Trade-off**: Simplicity over maximum security
- 📝 **Mitigation**: Implement CSP headers, short token expiration

### 4. Client-side Rendering vs Server-side

**Current Choice**: Client-side rendering with API
- ✅ **Pros**: Better UX, reduced server load, easier to scale
- ❌ **Cons**: Slower initial load, SEO challenges, JS required
- 🔄 **Trade-off**: Interactive UX over SEO and initial performance
- 📝 **When to Switch**: If SEO becomes critical

### 5. Inline Delete Confirmation vs Modal

**Current Choice**: Inline confirmation
- ✅ **Pros**: Faster interaction, less disruptive, modern UX
- ❌ **Cons**: Accidental clicks more likely, less dramatic warning
- 🔄 **Trade-off**: Speed over safety
- 📝 **Balance**: Only for recoverable actions

### 6. Cascade Delete vs Soft Delete

**Current Choice**: Cascade delete (permanent)
- ✅ **Pros**: Simpler code, automatic cleanup, no orphaned data
- ❌ **Cons**: No undo, data loss risk, no audit trail
- 🔄 **Trade-off**: Simplicity over data recovery
- 📝 **When to Switch**: Enterprise use or compliance requirements

### 7. Real-time Updates vs Polling

**Current Choice**: Manual refresh (no auto-updates)
- ✅ **Pros**: Simple implementation, low server load, predictable behavior
- ❌ **Cons**: No collaboration features, stale data possible
- 🔄 **Trade-off**: Simplicity over real-time collaboration
- 📝 **When to Switch**: Multi-user teams or collaboration features

### 8. Monolithic Structure vs Microservices

**Current Choice**: Monolithic application
- ✅ **Pros**: Simple deployment, easy development, lower latency
- ❌ **Cons**: Tight coupling, harder to scale parts independently
- 🔄 **Trade-off**: Development speed over architectural flexibility
- 📝 **When to Switch**: Different scaling needs per service

### 9. Custom Auth vs OAuth/Auth0

**Current Choice**: Custom JWT authentication
- ✅ **Pros**: Full control, no external dependencies, no cost
- ❌ **Cons**: More code to maintain, potential security gaps
- 🔄 **Trade-off**: Control and learning over battle-tested solutions
- 📝 **When to Switch**: Social login needed or team lacks auth expertise

### 10. Synchronous API vs Async Background Jobs

**Current Choice**: Synchronous request/response
- ✅ **Pros**: Simpler code, immediate feedback, easier debugging
- ❌ **Cons**: Slower for complex operations, no retry logic
- 🔄 **Trade-off**: Simplicity over resilience
- 📝 **When to Switch**: Long-running operations (exports, emails)

## Security Considerations

### Current Implementation

✅ **Implemented**:
- Password hashing with bcrypt
- JWT token authentication
- User data isolation (user_id filtering)
- SQL injection prevention (SQLAlchemy ORM)
- CORS configuration

⚠️ **Needs Improvement**:
- **Secret Key**: Currently hardcoded (`"bon"`), should use environment variables
- **Token Expiration**: No expiration set on JWT tokens
- **HTTPS**: Development uses HTTP, production needs HTTPS
- **Rate Limiting**: No protection against brute force
- **Input Validation**: Limited frontend validation
- **XSS Protection**: No CSP headers implemented
- **CSRF Protection**: Not needed with JWT, but could add for forms

### Recommended Security Enhancements

1. **Environment Variables**
   ```python
   import os
   SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback-secret-key")
   ```

2. **Token Expiration**
   ```python
   from datetime import datetime, timedelta
   expire = datetime.utcnow() + timedelta(hours=24)
   ```

3. **Rate Limiting**
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   @app.post("/api/auth/login")
   @limiter.limit("5/minute")
   def login(...):
   ```

4. **CSP Headers**
   ```python
   @app.middleware("http")
   async def add_security_headers(request, call_next):
       response = await call_next(request)
       response.headers["Content-Security-Policy"] = "default-src 'self'"
       return response
   ```

## Future Enhancements

### High Priority
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Task due dates and reminders
- [ ] Task priority levels (high/medium/low)
- [ ] Search and filter tasks
- [ ] Project sharing/collaboration
- [ ] Dark/light theme toggle

### Medium Priority
- [ ] Task tags/labels
- [ ] Task attachments
- [ ] Project templates
- [ ] Activity log/audit trail
- [ ] Export projects (PDF, CSV)
- [ ] Keyboard shortcuts
- [ ] Drag-and-drop task reordering

### Low Priority
- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] Time tracking per task
- [ ] Gantt chart view
- [ ] Team workspaces
- [ ] Advanced analytics
- [ ] Third-party integrations (Slack, GitHub)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript
- Write descriptive commit messages
- Add tests for new features
- Update documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FastAPI framework and community
- SQLAlchemy ORM
- Anthropic's Claude for assistance
- Modern UI design principles from various design systems

---

**Built with ❤️ by Raj**

*Last updated: April 2026*