using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashBackMaps.Utils.Models
{
    public class PhotoPair
    {
        [Key]
        public int PhotoPairId { get; set; }
        public string Name { get; set; }
        public string PhotoOrigAuthor { get; set; }
        public string PhotoOrigSource { get; set; }
        public string PhotoOrigYear { get; set; }
        public string PhotoOldAuthor { get; set; }
        public string PhotoOldSource { get; set; }
        public string PhotoOldYear { get; set; }

        public string xCoord { get; set; }
        public string yCoord { get; set; }
        public int Direction { get; set; }
        public string Text { get; set; }
        public string ArticleId { get; set; }
    }
}
