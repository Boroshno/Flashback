using FlashBackMaps.Utils.Abstract;
using FlashBackMaps.Utils.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Migrations;

namespace FlashBackMaps.Utils.Concrete
{
    public class EFPhotoPairRepository : IPhotoPairRepository
    {
        public EFPhotoPairRepository()
        {

        }

        private EFDbContext context = new EFDbContext();

        public IEnumerable<PhotoPair> PhotoPairs
        {
            get
            {
                IEnumerable<PhotoPair> phps;
                phps = context.PhotoPairs.SqlQuery("SELECT * FROM PhotoPairs").ToList();
                return phps;
            }
        }

        public void AddOrUpdatePhotoPair(PhotoPair php)
        {
            context.PhotoPairs.AddOrUpdate(p => p.PhotoPairId, php);
            context.SaveChanges();
        }

        public void DeletePhotoPair(PhotoPair php)
        {
            PhotoPair deletedPhotoPair = context.PhotoPairs.First(p => p.PhotoPairId == php.PhotoPairId);
            context.PhotoPairs.Remove(deletedPhotoPair);
            context.SaveChanges();
        }
    }
}
