using FlashBackMaps.Utils.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashBackMaps.Utils.Abstract
{
    public interface IPhotoPairRepository
    {
        IEnumerable<PhotoPair> PhotoPairs { get; }
        void AddOrUpdatePhotoPair(PhotoPair php);
        void DeletePhotoPair(PhotoPair php);
    }
}
