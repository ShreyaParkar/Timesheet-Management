import { NextRequest, NextResponse } from "next/server"
import { mockEntries } from "@/lib/mockdata"

type Context = {
  params: { weekId: string }
}

export async function GET(req: NextRequest, context: Context) {
  const { weekId } = context.params
  const entries = mockEntries[weekId] || []
  return NextResponse.json(entries)
}

export async function POST(req: NextRequest, context: Context) {
  const { weekId } = context.params
  const body = await req.json()
  const newEntry = { ...body, id: Date.now().toString() }
  mockEntries[weekId] = [...(mockEntries[weekId] || []), newEntry]
  return NextResponse.json({ success: true, entry: newEntry })
}

export async function PUT(req: NextRequest, context: Context) {
  const { weekId } = context.params
  const updated = await req.json()
  mockEntries[weekId] = (mockEntries[weekId] || []).map(entry =>
    entry.id === updated.id ? updated : entry
  )
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest, context: Context) {
  const { weekId } = context.params
  const { id } = await req.json()
  mockEntries[weekId] = (mockEntries[weekId] || []).filter(entry => entry.id !== id)
  return NextResponse.json({ success: true })
}