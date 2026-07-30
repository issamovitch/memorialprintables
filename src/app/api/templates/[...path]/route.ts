import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathSegments } = await params;
  const filePath = path.join(process.cwd(), 'src', 'templates', ...pathSegments);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath);
  const contentType = filePath.endsWith('.html') ? 'text/html' : 'image/png';
  
  return new NextResponse(fileContent, {
    headers: { 'Content-Type': contentType },
  });
}
