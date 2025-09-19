namespace Core.Interfaces;

public interface IAuditable
{
    DateTime CreatedAt { get; set; }
    long? CreatedBy { get; set; }
    DateTime? UpdatedAt { get; set; }
    long? UpdatedBy { get; set; }
}
