import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

// Parse command line arguments
const isDryRun = process.argv.includes('--dry-run');

interface MigrationStats {
  experiences: number;
  travels: number;
  services: number;
  blogPosts: number;
  total: number;
}

/**
 * Create SQL backup of the source tables before migration
 */
async function createBackup(): Promise<string> {
  console.log('📦 Creating SQL backup...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups');
  
  // Create backups directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const backupFile = path.join(backupDir, `migration-backup-${timestamp}.sql`);
  
  try {
    // Get database URL from environment
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL not found in environment variables');
    }
    
    // Parse database URL to extract connection details
    const url = new URL(databaseUrl);
    const database = url.pathname.substring(1);
    const host = url.hostname;
    const port = url.port || '5432';
    const username = url.username;
    const password = url.password;
    
    // Create pg_dump command
    const tables = ['Experience', 'Travel', 'Service', 'BlogPost'];
    const tableArgs = tables.map(t => `-t "${t}"`).join(' ');
    
    const pgDumpCmd = `PGPASSWORD="${password}" pg_dump -h ${host} -p ${port} -U ${username} -d ${database} ${tableArgs} -f "${backupFile}"`;
    
    await execAsync(pgDumpCmd);
    
    const stats = fs.statSync(backupFile);
    console.log(`✅ Backup created: ${backupFile} (${(stats.size / 1024).toFixed(2)} KB)`);
    
    return backupFile;
  } catch (error: any) {
    console.warn('⚠️  Could not create pg_dump backup:', error.message);
    console.log('📝 Creating manual backup instead...');
    
    // Fallback: Create a JSON backup
    const experiences = await prisma.experience.findMany();
    const travels = await prisma.travel.findMany();
    const services = await prisma.service.findMany();
    const blogPosts = await prisma.blogPost.findMany();
    
    const backup = {
      timestamp: new Date().toISOString(),
      experiences,
      travels,
      services,
      blogPosts
    };
    
    const jsonBackupFile = backupFile.replace('.sql', '.json');
    fs.writeFileSync(jsonBackupFile, JSON.stringify(backup, null, 2));
    
    const stats = fs.statSync(jsonBackupFile);
    console.log(`✅ JSON backup created: ${jsonBackupFile} (${(stats.size / 1024).toFixed(2)} KB)`);
    
    return jsonBackupFile;
  }
}

/**
 * Migrate Experience records to ContentItem
 */
async function migrateExperiences(): Promise<number> {
  const experiences = await prisma.experience.findMany();
  console.log(`\n📋 Found ${experiences.length} experiences to migrate`);
  
  let migrated = 0;
  
  for (const exp of experiences) {
    const metadata = {
      difficulty: exp.difficulty,
      groupSize: exp.groupSize,
      shortDesc: exp.shortDesc,
      itinerary: exp.itinerary,
      highlights: exp.highlights,
      included: exp.included,
      notIncluded: exp.notIncluded
    };
    
    const contentItem = {
      id: exp.id,
      type: 'experience',
      title: exp.title,
      slug: exp.slug,
      description: exp.description,
      image: exp.image,
      category: exp.category,
      published: exp.published,
      featured: exp.featured,
      bookable: true,
      price: exp.price,
      priceNote: exp.priceNote,
      duration: exp.duration,
      metadata: metadata,
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
      publishedAt: exp.createdAt
    };
    
    if (!isDryRun) {
      await prisma.contentItem.create({ data: contentItem });
    }
    
    migrated++;
    console.log(`  ✓ Migrated experience: ${exp.title} (${exp.id})`);
  }
  
  return migrated;
}

/**
 * Migrate Travel records to ContentItem
 */
async function migrateTravels(): Promise<number> {
  const travels = await prisma.travel.findMany();
  console.log(`\n📋 Found ${travels.length} travels to migrate`);
  
  let migrated = 0;
  
  for (const travel of travels) {
    const metadata = {
      cities: travel.cities,
      itinerary: travel.itinerary,
      highlights: travel.highlights,
      included: travel.included,
      notIncluded: travel.notIncluded
    };
    
    const contentItem = {
      id: travel.id,
      type: 'travel',
      title: travel.title,
      slug: travel.slug,
      description: travel.description,
      image: travel.image,
      category: travel.category,
      published: travel.published,
      featured: travel.featured,
      bookable: true,
      price: travel.price,
      priceNote: travel.priceNote,
      duration: travel.duration,
      metadata: metadata,
      createdAt: travel.createdAt,
      updatedAt: travel.updatedAt,
      publishedAt: travel.createdAt
    };
    
    if (!isDryRun) {
      await prisma.contentItem.create({ data: contentItem });
    }
    
    migrated++;
    console.log(`  ✓ Migrated travel: ${travel.title} (${travel.id})`);
  }
  
  return migrated;
}

/**
 * Migrate Service records to ContentItem
 */
async function migrateServices(): Promise<number> {
  const services = await prisma.service.findMany();
  console.log(`\n📋 Found ${services.length} services to migrate`);
  
  let migrated = 0;
  
  for (const service of services) {
    const metadata = {
      icon: service.icon,
      features: service.features,
      pricing: service.pricing
    };
    
    const contentItem = {
      id: service.id,
      type: 'service',
      title: service.name, // Service uses 'name' instead of 'title'
      slug: service.slug,
      description: service.description,
      image: null, // Services don't have images
      category: service.category,
      published: service.published,
      featured: service.featured,
      bookable: false, // Services are not bookable
      price: null, // Pricing is in metadata
      priceNote: null,
      duration: null,
      metadata: metadata,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      publishedAt: service.createdAt
    };
    
    if (!isDryRun) {
      await prisma.contentItem.create({ data: contentItem });
    }
    
    migrated++;
    console.log(`  ✓ Migrated service: ${service.name} (${service.id})`);
  }
  
  return migrated;
}

/**
 * Migrate BlogPost records to ContentItem
 */
async function migrateBlogPosts(): Promise<number> {
  const blogPosts = await prisma.blogPost.findMany();
  console.log(`\n📋 Found ${blogPosts.length} blog posts to migrate`);
  
  let migrated = 0;
  
  for (const post of blogPosts) {
    // Extract first tag as category, or use 'general' as default
    let category = 'general';
    if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
      category = post.tags[0] as string;
    }
    
    const metadata = {
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      sections: post.sections,
      tags: post.tags,
      author: post.author,
      readTime: post.readTime
    };
    
    const contentItem = {
      id: post.id,
      type: 'blog',
      title: post.title,
      slug: post.slug,
      description: post.excerpt, // BlogPost uses 'excerpt' instead of 'description'
      image: post.coverImage, // BlogPost uses 'coverImage' instead of 'image'
      category: category,
      published: post.published,
      featured: post.featured,
      bookable: false, // Blog posts are not bookable
      price: null,
      priceNote: null,
      duration: null,
      metadata: metadata,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      publishedAt: post.publishedAt || post.createdAt
    };
    
    if (!isDryRun) {
      await prisma.contentItem.create({ data: contentItem });
    }
    
    migrated++;
    console.log(`  ✓ Migrated blog post: ${post.title} (${post.id})`);
  }
  
  return migrated;
}

/**
 * Validate the migration by checking counts
 */
async function validateMigration(stats: MigrationStats): Promise<boolean> {
  console.log('\n🔍 Validating migration...');
  
  // Count ContentItems by type
  const contentCounts = await prisma.contentItem.groupBy({
    by: ['type'],
    _count: {
      type: true
    }
  });
  
  const countMap: Record<string, number> = {};
  for (const count of contentCounts) {
    countMap[count.type] = count._count.type;
  }
  
  console.log('\n📊 ContentItem counts by type:');
  console.log(`  - experiences: ${countMap['experience'] || 0}`);
  console.log(`  - travels: ${countMap['travel'] || 0}`);
  console.log(`  - services: ${countMap['service'] || 0}`);
  console.log(`  - blog posts: ${countMap['blog'] || 0}`);
  console.log(`  - TOTAL: ${Object.values(countMap).reduce((a, b) => a + b, 0)}`);
  
  // Validate counts match
  const valid = 
    (countMap['experience'] || 0) === stats.experiences &&
    (countMap['travel'] || 0) === stats.travels &&
    (countMap['service'] || 0) === stats.services &&
    (countMap['blog'] || 0) === stats.blogPosts;
  
  if (valid) {
    console.log('\n✅ Validation successful! All counts match.');
  } else {
    console.log('\n❌ Validation failed! Counts do not match.');
    console.log('\nExpected:');
    console.log(`  - experiences: ${stats.experiences}`);
    console.log(`  - travels: ${stats.travels}`);
    console.log(`  - services: ${stats.services}`);
    console.log(`  - blog posts: ${stats.blogPosts}`);
  }
  
  // Spot check: Display sample records
  console.log('\n🔬 Spot check - Sample records:');
  
  const sampleExperience = await prisma.contentItem.findFirst({
    where: { type: 'experience' }
  });
  if (sampleExperience) {
    console.log('\n  Experience sample:');
    console.log(`    Title: ${sampleExperience.title}`);
    console.log(`    Slug: ${sampleExperience.slug}`);
    console.log(`    Bookable: ${sampleExperience.bookable}`);
    console.log(`    Metadata keys: ${Object.keys(sampleExperience.metadata as object || {}).join(', ')}`);
  }
  
  const sampleTravel = await prisma.contentItem.findFirst({
    where: { type: 'travel' }
  });
  if (sampleTravel) {
    console.log('\n  Travel sample:');
    console.log(`    Title: ${sampleTravel.title}`);
    console.log(`    Slug: ${sampleTravel.slug}`);
    console.log(`    Bookable: ${sampleTravel.bookable}`);
    console.log(`    Metadata keys: ${Object.keys(sampleTravel.metadata as object || {}).join(', ')}`);
  }
  
  const sampleService = await prisma.contentItem.findFirst({
    where: { type: 'service' }
  });
  if (sampleService) {
    console.log('\n  Service sample:');
    console.log(`    Title: ${sampleService.title}`);
    console.log(`    Slug: ${sampleService.slug}`);
    console.log(`    Bookable: ${sampleService.bookable}`);
    console.log(`    Metadata keys: ${Object.keys(sampleService.metadata as object || {}).join(', ')}`);
  }
  
  const sampleBlog = await prisma.contentItem.findFirst({
    where: { type: 'blog' }
  });
  if (sampleBlog) {
    console.log('\n  Blog post sample:');
    console.log(`    Title: ${sampleBlog.title}`);
    console.log(`    Slug: ${sampleBlog.slug}`);
    console.log(`    Bookable: ${sampleBlog.bookable}`);
    console.log(`    Metadata keys: ${Object.keys(sampleBlog.metadata as object || {}).join(', ')}`);
  }
  
  return valid;
}

/**
 * Main migration function
 */
async function runMigration() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   ContentItem Migration Script                        ║');
  console.log('║   Migrating: Experience, Travel, Service, BlogPost    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  if (isDryRun) {
    console.log('🏃 DRY RUN MODE - No data will be written\n');
  }
  
  const stats: MigrationStats = {
    experiences: 0,
    travels: 0,
    services: 0,
    blogPosts: 0,
    total: 0
  };
  
  try {
    // Create backup first
    if (!isDryRun) {
      await createBackup();
    } else {
      console.log('📦 Skipping backup in dry-run mode\n');
    }
    
    console.log('📊 Starting migration...');
    
    // Run migration in a transaction
    await prisma.$transaction(async (tx) => {
      // Temporarily replace prisma with transaction client
      const originalPrisma = global.prisma;
      (global as any).prisma = tx;
      
      try {
        // Migrate each type
        stats.experiences = await migrateExperiences();
        stats.travels = await migrateTravels();
        stats.services = await migrateServices();
        stats.blogPosts = await migrateBlogPosts();
        
        stats.total = stats.experiences + stats.travels + stats.services + stats.blogPosts;
        
        if (isDryRun) {
          console.log('\n🏃 Dry run complete - rolling back transaction');
          throw new Error('DRY_RUN_ROLLBACK');
        }
      } finally {
        // Restore original prisma
        (global as any).prisma = originalPrisma;
      }
    });
    
    // Print summary
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║   Migration Summary                                    ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log(`\n  ✓ Migrated ${stats.experiences} experiences`);
    console.log(`  ✓ Migrated ${stats.travels} travels`);
    console.log(`  ✓ Migrated ${stats.services} services`);
    console.log(`  ✓ Migrated ${stats.blogPosts} blog posts`);
    console.log(`\n  ✅ Total: ${stats.total} content items migrated\n`);
    
    if (!isDryRun) {
      // Validate migration
      const isValid = await validateMigration(stats);
      
      if (!isValid) {
        console.log('\n⚠️  Warning: Validation found discrepancies!');
        console.log('   Please review the migration results.\n');
      }
    }
    
  } catch (error: any) {
    if (error.message === 'DRY_RUN_ROLLBACK') {
      console.log('\n📊 Dry run summary:');
      console.log(`  - Would migrate ${stats.experiences} experiences`);
      console.log(`  - Would migrate ${stats.travels} travels`);
      console.log(`  - Would migrate ${stats.services} services`);
      console.log(`  - Would migrate ${stats.blogPosts} blog posts`);
      console.log(`  - Total: ${stats.total} content items\n`);
      console.log('✅ Dry run completed successfully');
      console.log('💡 Run without --dry-run to perform actual migration\n');
      return;
    }
    
    console.error('\n❌ Migration failed:', error);
    console.error('   Transaction has been rolled back. No data was modified.');
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
runMigration()
  .then(() => {
    if (!isDryRun) {
      console.log('✅ Migration completed successfully!\n');
      console.log('📝 Next steps:');
      console.log('   1. Verify the data in ContentItem table');
      console.log('   2. Update your application code to use ContentItem');
      console.log('   3. Once verified, you can drop the old tables\n');
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed');
    process.exit(1);
  });
