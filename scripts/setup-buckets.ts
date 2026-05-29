import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupBuckets() {
  const buckets = ['analisa-resiko', 'foto-inovasi', 'ecp'];
  
  for (const bucketName of buckets) {
    console.log(`Checking bucket: ${bucketName}...`);
    const { data: bucket, error: getError } = await supabase.storage.getBucket(bucketName);
    
    if (getError && getError.message.includes('not found')) {
      console.log(`Creating bucket: ${bucketName}...`);
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: bucketName === 'foto-inovasi' ? ['image/jpeg', 'image/png', 'image/webp'] : ['application/pdf'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (error) {
        console.error(`Failed to create bucket ${bucketName}:`, error);
      } else {
        console.log(`Bucket ${bucketName} created successfully.`);
      }
    } else if (getError) {
      console.error(`Error checking bucket ${bucketName}:`, getError);
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
      
      // Ensure it's public
      if (!bucket.public) {
         console.log(`Updating bucket ${bucketName} to be public...`);
         await supabase.storage.updateBucket(bucketName, {
            public: true,
         });
      }
    }
  }
}

setupBuckets().then(() => console.log('Done.')).catch(console.error);
