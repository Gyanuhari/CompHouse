namespace Core.Interfaces;

public interface IConcurrencyToken
{
    byte[] RowVersion {get; set;}
}
