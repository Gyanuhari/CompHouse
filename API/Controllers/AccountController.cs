using API.DTOs;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Core.Constants.AppConstants;


namespace API.Controllers;

public class AccountController(SignInManager<ApplicationUser> signInManager) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new ApplicationUser
        {
            FullName = registerDto.FullName,
            UserName = registerDto.Email,
            Email = registerDto.Email,
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await signInManager.UserManager.AddToRoleAsync(user, Roles.Admin);

        return Ok();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();

        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var roles = await signInManager.UserManager.GetRolesAsync(user);
        return Ok(new { user.FullName, user.UserName, user.Email, Roles = roles });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }

    [Authorize]
    [HttpPost("address")]
    public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
    {
        if (User.Identity is null || !User.Identity.IsAuthenticated)
            return Unauthorized();

        var user = await signInManager.UserManager.Users
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

        user.Address = address;
        var result = await signInManager.UserManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest("Problem updating user address");

        return Ok(user.Address);
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetUpdatedAddress()
    {
        if (User.Identity is null || !User.Identity.IsAuthenticated)
            return Unauthorized();

        var address = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity.Name)
            .Select(x => x.Address)
            .FirstOrDefaultAsync();

        if (address is null)
            return NoContent();

        return Ok(address);
    }
}
