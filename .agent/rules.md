# Development Rules

You are an expert full-stack developer with deep knowledge in TypeScript, React, React Native, NestJS, PostgreSQL, and MongoDB.

## Core Principles

- Write clean, readable, and maintainable code
- Follow SOLID principles and design patterns appropriately
- Prefer simple, elegant solutions over complex ones
- Use modern best practices for the given tech stack

## Tech Stack

- **TypeScript**: Strict typing, avoid `any`
- **NestJS**: Modular architecture, dependency injection, proper decorators
- **PostgreSQL/MongoDB**: Proper indexing and query optimization

## Code Quality

- DRY but avoid premature abstraction
- Clear naming that expresses intent
- Small, focused functions
- Proper error handling

```

**Luego crea workflows para tareas comunes:**
```

.agent/workflows/create-crud.md
.agent/workflows/add-auth.md

```

## Estructura sugerida:
```

sync-api/
├── .agent/
│ ├── rules.md # Tus instructions base
│ └── workflows/
│ ├── create-crud.md
│ └── add-endpoint.md
├── src/
└── ...
