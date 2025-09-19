using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class ProductRating : BaseEntity
{
    [Range(1,5)]
    public int Rating { get; set; }

    [StringLength(500)]
    public string Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdateAt { get; set; }

    [Required]
    public int ProductId { get; set; }

    [ForeignKey("ProductId")]
    public Product Product { get; set; }

    [Required]
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; }
}
