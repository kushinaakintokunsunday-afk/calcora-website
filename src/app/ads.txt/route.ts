import { NextResponse } from "next/server";

export function GET() {
  const content = `# ads.txt for calcora.website
# Replace YOUR_PUBLISHER_ID with your actual Google AdSense publisher ID
# Format: domain,AdSense account ID,relationship, certification authority ID
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
# For more information, visit: https://www.ads-txt.org/
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
