import { randomUUID } from 'node:crypto'
import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

export async function uploadResume(
    userId: string,
    buffer: Buffer | Uint8Array,
): Promise<string> {
    const key = `resumes/${userId}/${randomUUID()}.pdf`
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'resumes', userId)

    await mkdir(uploadDir, { recursive: true })

    const filePath = join(uploadDir, `${randomUUID()}.pdf`)
    await writeFile(filePath, buffer)

    return `/uploads/${key}`
}
