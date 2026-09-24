// app/api/gallery/[year]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { year: string } }
) {
  const year = params.year;
  const dirPath = path.join(process.cwd(), 'public', 'news', year);

  try {
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ images: [] });
    }

    // Folder ke saare files read karo
    const files = fs.readdirSync(dirPath);
    
    // Sirf valid image formats filter karo
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
    const imageFiles = files.filter((file) =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    // Automatic gallery items array banao
    const images = imageFiles.map((file, index) => ({
      id: `${year}-${index}`,
      title: `${year} Exhibition Archive ${index + 1}`,
      image: `/news/${year}/${file}`,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}