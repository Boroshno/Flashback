using FlashBackMaps.Utils.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashBackMaps.Utils.Concrete
{
    public class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("EFDbContext")
         { }
        public DbSet<PhotoPair> PhotoPairs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Database.SetInitializer(new EFDbContextInitializer());

            base.OnModelCreating(modelBuilder);
        }
    }

    public class EFDbContextInitializer : DropCreateDatabaseIfModelChanges<EFDbContext>
    {
        protected override void Seed(EFDbContext dbContext)
        {
            // seed data
            dbContext.Configuration.AutoDetectChangesEnabled = true;

            base.Seed(dbContext);
        }
    }
}
