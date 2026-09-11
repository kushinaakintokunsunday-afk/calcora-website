import { NextResponse } from "next/server";

export function GET() {
  const content = `# ads.txt for calcora.website
google.com, pub-7585642142236720, DIRECT, f08c47fec0942fa0
# For more information, visit: https://www.ads-txt.org/
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}