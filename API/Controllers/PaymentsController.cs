using API.DTOs.BasketDtos;
using API.Extensions;
using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Helpers;
using Infrastructure.Services.Payment;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController(StripePaymentService paymentService, CompContext context) : BaseApiController
{
    [HttpPost()]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basketId = Request.Cookies["basketId"];
        if (string.IsNullOrEmpty(basketId)) return BadRequest("Problem with the basketId");

        var basket = await context.Baskets.AsQueryable<Basket>().GetBasketWithItems(basketId);
        if (basket == null) return BadRequest("Problem with the basket");

        // Converts decimal to long
        var amount = CurrencyHelper.ConvertToSmallestUnit(basket.GetTotal(), "AUD");

        var intent = await paymentService.CreateorUpdatePaymentIntent(basket.PaymentIntentId, amount);
        if (intent == null) return BadRequest("Problem creating payment intent");

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        if (context.ChangeTracker.HasChanges() && !(await context.SaveChangesAsync() > 0))
            return BadRequest("Problem updating basket with intent");

        return basket.ToDto();
    }
}