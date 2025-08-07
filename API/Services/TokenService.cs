using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using API.Entities;
using Microsoft.IdentityModel.Tokens;
using SQLitePCL;

namespace API.Services;

public class TokenService : ITokenService
{
    private IConfiguration _config;
    public TokenService(IConfiguration config)
    {
        this._config = config;
    }
    public string CreateToken(AppUser appUser)
    {
        var tokenKey = _config["TokenKey"] ?? throw new Exception("Could not retrieve token key.");
        if (tokenKey.Length < 64)
        {
            throw new Exception("the token key length should be >= 64");
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, appUser.Email),
            new Claim(ClaimTypes.NameIdentifier, appUser.Id)
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
        
    }
}
