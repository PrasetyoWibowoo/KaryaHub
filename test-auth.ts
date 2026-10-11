#!/usr/bin/env bun
// Test auth endpoints
// Run: bun test-auth.ts

const BASE_URL = 'http://localhost:3000'

interface TestResult {
  name: string
  status: 'PASS' | 'FAIL'
  message?: string
}

const results: TestResult[] = []

async function test(name: string, fn: () => Promise<boolean>) {
  try {
    const pass = await fn()
    results.push({ name, status: pass ? 'PASS' : 'FAIL' })
  } catch (err: any) {
    results.push({ name, status: 'FAIL', message: err.message })
  }
}

async function runTests() {
  let freelancerCookie = ''
  let umkmCookie = ''

  // Test 1: Register Freelancer
  await test('Register FREELANCER', async () => {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `freelancer_${Date.now()}@test.com`,
        password: 'password123',
        fullName: 'Test Freelancer',
        role: 'FREELANCER',
      }),
    })
    const data = await res.json()
    return res.status === 201 && data.success === true
  })

  // Test 2: Register UMKM
  await test('Register UMKM', async () => {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `umkm_${Date.now()}@test.com`,
        password: 'password123',
        fullName: 'Test UMKM',
        role: 'UMKM',
      }),
    })
    const data = await res.json()
    return res.status === 201 && data.success === true
  })

  // Test 3: Duplicate email
  await test('Duplicate email', async () => {
    const email = `duplicate_${Date.now()}@test.com`
    await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123',
        fullName: 'First',
        role: 'FREELANCER',
      }),
    })
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123',
        fullName: 'Second',
        role: 'FREELANCER',
      }),
    })
    return res.status === 409
  })

  // Test 4: Invalid input
  await test('Invalid input', async () => {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid',
        password: '123',
        fullName: 'X',
        role: 'INVALID',
      }),
    })
    return res.status === 400
  })

  // Test 5: Login wrong password
  await test('Login wrong password', async () => {
    const email = `login_${Date.now()}@test.com`
    await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'correct123',
        fullName: 'Login Test',
        role: 'FREELANCER',
      }),
    })
    
    const res = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'wrongpassword',
      }),
    })
    return res.status !== 200
  })

  // Test 6: Protected route without auth
  await test('Protected route (no auth)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/session`)
    return res.status === 401
  })

  console.log('\n=== AUTH TEST RESULTS ===\n')
  results.forEach((r) => {
    const icon = r.status === 'PASS' ? '✓' : '✗'
    console.log(`${icon} ${r.name}`)
    if (r.message) console.log(`  ${r.message}`)
  })

  const passed = results.filter((r) => r.status === 'PASS').length
  console.log(`\n${passed}/${results.length} tests passed`)
}

runTests()

export {}
