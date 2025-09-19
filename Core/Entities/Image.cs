using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Image : BaseEntity
{
    [Required]
    [StringLength(100)]
    public required string FileName { get; set; }

    // Thumbnail version (200-300px)
    //[StringLength(100)]
    //public string ThumbnailName { get; set; }

    // Optional: Different sizes for different use cases
    //[StringLength(100)]
    //public string SmallThumbnailName { get; set; } // 100px for mobile

    //[StringLength(100)]
    //public string MediumThumbnailName { get; set; } // 400px for tablets

    [StringLength(100)]
    public string AltText { get; set; } = string.Empty;

    [Required]
    [StringLength(250)]
    public required string ImageUrl { get; set; }

    public required bool IsPrimary { get; set; }

    public string PublicId { get; set; }

    public long FileSize { get; set; }

    //[NotMapped]
    //public string ImageUrl => $"/uploads/products/ {FileName}";

    //[NotMapped]
    //public string ThumbnailUrl => $"/uploads/products/thumbnails/{ThumbnailName}";
}
