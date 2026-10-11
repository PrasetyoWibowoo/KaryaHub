# KaryaHub Authentication System

## Overview

Complete authentication system with NextAuth v5, role-based authorization (FREELANCER/UMKM), and secure session management.

## Endpoints

### `POST /api/register`
Register new user (FREELANCER or UMKM only).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "min8chars",
  "fullName": "Full Name",
  "role": "FREELANCER" | "UMKM"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "Full Name",
    "role": "FREELANCER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- 400: Invalid input (email format, password < 8 chars, fullName < 2 chars, role not FREELANCER/UMKM)
- 409: Email already registered
- 500: Server error

**Security:**
- Passwords hashed with bcrypt (cost 10)
- Email normalized to lowercase
- ADMIN role cannot be created via this endpoint
- Profile automatically created in transaction
- Never returns passwordHash

### `POST /api/auth/callback/credentials`
Login with email and password (NextAuth handles this).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
Sets HTTP-only session cookie, redirects to callback URL.

**Errors:**
Generic "Invalid email or password" (no user enumeration)

### `POST /api/auth/logout`
Logout current session.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

### `GET /api/auth/session`
Get current session.

**Response (200):**
```json
{
  "success": true,
  "message": "Session aktif",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "Full Name",
      "role": "FREELANCER"
    }
  }
}
```

**Errors:**
- 401: No active session

## Authorization Helpers

### `requireAuth()`
Require authenticated user.

```typescript
import { requireAuth } from '@/lib/auth-helpers'

export async function GET() {
  const { error, session } = await requireAuth()
  if (error) return error
  
  // session.user.id, session.user.role available
}
```

### `requireRole(allowedRoles)`
Require specific role(s).

```typescript
import { requireRole } from '@/lib/auth-helpers'

export async function POST(req: Request) {
  const { error, session } = await requireRole(['UMKM'])
  if (error) return error
  
  // Only UMKM can reach here
}
```

## Security Features

✓ Passwords hashed with bcrypt (never stored plaintext)
✓ Email normalized and validated
✓ passwordHash never exposed in responses
✓ Session identity from JWT only (never trusted from client)
✓ Role checked server-side on every protected route
✓ HTTP-only cookies (XSS protection)
✓ Registration limited to FREELANCER/UMKM (ADMIN created separately)
✓ Atomic transaction (user + profile created together)
✓ Generic login errors (no user enumeration)

## Flow

### Registration
```
Client → POST /api/register
  ↓ Validate input (Zod)
  ↓ Normalize email
  ↓ Check duplicate
  ↓ Hash password (bcrypt)
  ↓ TX: Create User + Profile
  ↓ Return user (no passwordHash)
```

### Login
```
Client → POST /api/auth/callback/credentials
  ↓ Validate credentials
  ↓ Find user by email
  ↓ Verify password (bcrypt.compare)
  ↓ Create JWT session
  ↓ Set HTTP-only cookie
  ↓ Return user data
```

### Protected Route
```
Request → Middleware (optional)
  ↓ requireAuth() or requireRole()
  ↓ Verify session JWT
  ↓ Check role if needed
  ↓ Return session.user.id
  ↓ Business logic (always use session.user.id, never client input)
```

## Files Created/Modified

### Core Auth
- `src/lib/auth.ts` - NextAuth v5 config, Credentials provider
- `src/lib/auth-helpers.ts` - requireAuth, requireRole helpers
- `src/lib/prisma.ts` - Prisma client with PrismaPg adapter
- `src/lib/api-response.ts` - ok() and fail() response helpers
- `src/lib/logger.ts` - Structured JSON logging
- `src/lib/validators/auth.ts` - Zod schema for registration

### API Routes
- `src/app/api/register/route.ts` - Registration endpoint
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth handlers
- `src/app/api/auth/logout/route.ts` - Logout endpoint
- `src/app/api/auth/session/route.ts` - Session check endpoint

### Middleware
- `src/middleware.ts` - Route protection (optional, can be removed if not using middleware approach)

### Types
- `src/types/next-auth.d.ts` - NextAuth session typing (id, role)

### Config
- `tsconfig.json` - Added @/generated/* path mapping
- `src/generated/prisma/package.json` - Package config for generated client

### Tests
- `test-auth.ts` - Auth endpoint tests

## Protected Route Example

```typescript
// src/app/api/proposals/route.ts
import { requireRole } from '@/lib/auth-helpers'
import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  // Only FREELANCER can create proposals
  const { error, session } = await requireRole(['FREELANCER'])
  if (error) return error

  const body = await req.json()
  
  const proposal = await prisma.proposal.create({
    data: {
      jobId: body.jobId,
      freelancerId: session.user.id, // From session, NEVER from body
      bidAmount: body.bidAmount,
      estimatedDays: body.estimatedDays,
    },
  })

  return ok('Proposal created', proposal, 201)
}
```

## Testing

Run tests (requires dev server running):
```bash
bun run dev  # Terminal 1
bun test-auth.ts  # Terminal 2
```

Tests cover:
- ✓ Register FREELANCER
- ✓ Register UMKM
- ✓ Duplicate email (409)
- ✓ Invalid input (400)
- ✓ Login wrong password
- ✓ Protected route without auth (401)

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

## Rules Compliance

✓ Identity only from session.user.id
✓ Role checked server-side
✓ Passwords hashed with bcrypt
✓ passwordHash never in responses
✓ No console.log (using logger)
✓ All input validated with Zod
✓ Errors return ok()/fail() format
✓ ADMIN cannot be created via public endpoint
✓ Email normalized
✓ Atomic transaction for user+profile
✓ TypeScript strict mode passes
