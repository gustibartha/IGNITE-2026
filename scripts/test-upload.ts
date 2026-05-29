import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
  try {
    const bucket = 'analisa-resiko';
    const filePath = 'test-user-id/test-file-123.pdf';
    
    // Create a dummy buffer of 10 bytes
    const buffer = Buffer.alloc(10, 'a');
    
    console.log(`Uploading to bucket: ${bucket}, path: ${filePath}`);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) {
      console.error("Upload Error:", error);
    } else {
      console.log("Upload Success:", data);
    }
  } catch (err) {
    console.error("Exception:", err);
  }
}

testUpload();
