namespace API.Extensions;

public static class StringExtensions
{
    /// <summary>
    /// Converts the string into a list of trimmed, lowercase values separated by commas.
    /// Handles null or empty strings safely and removes empty entries from the result.
    /// </summary>
    /// <param name="str">The input string to convert.</param>
    /// <returns>A list of trimmed, lowercase string values obtained by splitting the input on comma.</returns>
    public static List<string> ToList(this string str)
    {
        if (string.IsNullOrWhiteSpace(str))
            return [];

        return [.. str.ToLower().Split(",", StringSplitOptions.TrimEntries)];
    }
}
