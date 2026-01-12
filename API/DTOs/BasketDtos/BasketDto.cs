namespace API.DTOs.BasketDtos;

public class BasketDto
{
    public required string BasketId { get; set; }
    public string PaymentIntentId { get; set; }
    public string ClientSecret { get; set; }
    public List<BasketItemDto> Items { get; set; }
}
