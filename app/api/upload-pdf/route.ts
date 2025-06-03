import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/dependencies/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `practice-tests/${timestamp}-${originalName}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Firebase Storage
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, buffer, {
      contentType: 'application/pdf',
    });

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return NextResponse.json({
      success: true,
      fileName,
      downloadURL,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 