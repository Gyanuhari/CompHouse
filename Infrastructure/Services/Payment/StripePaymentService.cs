using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services.Payment;

public class StripePaymentService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateorUpdatePaymentIntent(string paymentIntentId, long amount)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
        var service = new PaymentIntentService();
        var intent = new PaymentIntent();

        if (string.IsNullOrEmpty(paymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = "aud",
                PaymentMethodTypes = ["card"],
            };
            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = amount,
            };
            await service.UpdateAsync(paymentIntentId, options);
        }

        return intent;
    }
}
