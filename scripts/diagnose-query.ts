import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function run() {
  const client = await pool.connect()

  // Warm up
  await client.query('SELECT 1')

  // Raw SQL baseline: no joins
  const timesRaw: number[] = []
  for (let i = 0; i < 5; i++) {
    const start = performance.now()
    const res = await client.query(
      `SELECT id, title, category FROM jobs WHERE status = 'OPEN' ORDER BY "createdAt" DESC LIMIT 50`
    )
    timesRaw.push(performance.now() - start)
    console.log(`[raw-no-join] iter ${i + 1}: ${timesRaw[i].toFixed(1)}ms  rows=${res.rows.length}`)
  }
  console.log(`[raw-no-join] avg: ${(timesRaw.reduce((a, b) => a + b, 0) / timesRaw.length).toFixed(1)}ms`)

  // Raw SQL with joins matching our query
  const timesJoin: number[] = []
  for (let i = 0; i < 5; i++) {
    const start = performance.now()
    const res = await client.query(`
      SELECT j.id, j.title, j.category, j.budget, j."estimatedHours", j.deadline, j."createdAt",
             u.id as employer_id, u."fullName",
             p."companyName",
             COUNT(DISTINCT pr.id) as proposal_count
      FROM jobs j
      JOIN users u ON j."employerId" = u.id
      LEFT JOIN profiles p ON u.id = p."userId"
      LEFT JOIN proposals pr ON j.id = pr."jobId"
      WHERE j.status = 'OPEN'
      GROUP BY j.id, u.id, p."companyName"
      ORDER BY j."createdAt" DESC
      LIMIT 50
    `)
    timesJoin.push(performance.now() - start)
    console.log(`[raw-with-join] iter ${i + 1}: ${timesJoin[i].toFixed(1)}ms  rows=${res.rows.length}`)
  }
  console.log(`[raw-with-join] avg: ${(timesJoin.reduce((a, b) => a + b, 0) / timesJoin.length).toFixed(1)}ms`)

  client.release()
  await pool.end()
}

run().catch(console.error)
