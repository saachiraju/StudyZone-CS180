import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { name, url } = await req.json()

    const logLine = `${name} - ${url}\n`

    const filePath = path.join(process.cwd(), 'public', 'imagelinks.txt')

    // Append the new entry
    await writeFile(filePath, logLine, { flag: 'a' })

    return NextResponse.json({ message: 'Logged successfully' })
  } catch (error) {
    console.error('Error logging upload:', error)
    return NextResponse.json(
      { error: 'Failed to log upload' },
      { status: 500 }
    )
  }
}
