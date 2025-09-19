using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Core.Entities;

public class KeyValue : BaseEntity
{
    [Required]
    [StringLength(255)]
    public required string Key { get; set; }

    [StringLength(int.MaxValue)]
    public string Value { get; set; }

    [StringLength(150)]
    public required string Type { get; set; }

    public DateTime CreatedAt { get; set; }

    [Timestamp]
    public byte[] Rowversion { get; set; }

    public T GetValue<T>()
    {
        return Value != null ? JsonSerializer.Deserialize<T>(Value) : default(T);
    }

    public void SetValue<T>(T value)
    {
        if (value != null)
            Value = JsonSerializer.Serialize(value);
    }
}
