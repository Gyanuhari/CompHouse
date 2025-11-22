namespace API.DTOs.BasketDtos;

public class BasketDto
{
    public required string BasketId { get; set; }

    public List<BasketItemDto> BasketItemDtos { get; set; }
}
