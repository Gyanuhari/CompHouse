using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; }
    public DateOnly DateOfBirth { get; set; }

    public int? AddressId { get; set; }
    public Address Address { get; set; }
}
