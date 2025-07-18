import { NextResponse } from "next/server"
import { mockTimesheets } from "@/lib/mockdata"

export async function GET() {
  return NextResponse.json(mockTimesheets)
}

export async function POST(req: Request) {
  const newSheet = await req.json()
  mockTimesheets.push(newSheet)
  return NextResponse.json({ success: true })
}