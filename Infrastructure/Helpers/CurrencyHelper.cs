namespace Infrastructure.Helpers;

public static class CurrencyHelper
{
    private static readonly HashSet<string> ZeroDecimalCurrencies = new()
    {
        "CLP", "DJF", "GNF", "JPY",  "KRW",
        "PYG", "RWF", "UGX", "VND", "VUV", "ISk", "TWD",
    };

    private static readonly Dictionary<string, int> CurrencyDecimalPlaces = new()
    {
        ["USD"] = 2,
        ["EUR"] = 2,
        ["GBP"] = 2,
        ["AUD"] = 2,
        ["CAD"] = 2,
        ["JPY"] = 0,
    };

    public static long ConvertToSmallestUnit(decimal amount, string currencyCode)
    {
        if (amount < 0) throw new ArgumentException("Amount cannot be negative", nameof(amount));
        currencyCode = currencyCode.ToLower();
        var decimalPlaces = GetDecimalPlaces(currencyCode);
        if (decimalPlaces == 0)
            return (long)Math.Round(amount, MidpointRounding.AwayFromZero);

        var multiplier = (decimal)Math.Pow(10, decimalPlaces);
        var converted = amount * multiplier;

        if (converted % 1 != 0)
        {
            // This indicates the original amount had more decimal places than allowed
            throw new ArgumentException(
                $"Amount {amount} cannot be precisely converted to {currencyCode.ToUpper()}. " +
                $"Maximum decimal places allowed: {decimalPlaces}");
        }

        return (long)converted;
    }

    public static decimal ConvertFromSmallestUnit(long amount, string currencyCode)
    {
        currencyCode = currencyCode.ToLowerInvariant();
        int decimalPlaces = GetDecimalPlaces(currencyCode);

        if (decimalPlaces == 0)
            return amount;

        decimal divisor = (decimal)Math.Pow(10, decimalPlaces);
        return amount / divisor;
    }

    public static int GetDecimalPlaces(string currencyCode)
    {
        currencyCode = currencyCode.ToLower();
        if (CurrencyDecimalPlaces.TryGetValue(currencyCode, out int decimalPlaces))
            return decimalPlaces;

        // Default assumption: most currencies use 2 decimal places
        return ZeroDecimalCurrencies.Contains(currencyCode) ? 0 : 2;
    }

    public static long GetMinimumAmount(string currencyCode)
    {
        currencyCode = currencyCode.ToLowerInvariant();

        return currencyCode switch
        {
            "aud" => 50,      // $0.50 AUD
            "usd" => 50,      // $0.50 USD
            "eur" => 50,      // €0.50
            "gbp" => 30,      // £0.30
            "cad" => 50,      // C$0.50
            "jpy" => 50,      // ¥50
            _ => 50           // Default minimum
        };
    }

    public static void ValidateAmount(decimal amount, string currencyCode)
    {
        var stripeAmount = ConvertToSmallestUnit(amount, currencyCode);
        var minimumAmount = GetMinimumAmount(currencyCode);

        if (stripeAmount < minimumAmount)
        {
            throw new ArgumentException(
                $"Amount {amount} {currencyCode.ToUpper()} is too small. " +
                $"Minimum amount is {ConvertFromSmallestUnit(minimumAmount, currencyCode)} " +
                $"{currencyCode.ToUpper()}");
        }
    }
}
