using System;

namespace API.DTOs;

public class UserDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }

    public required string name { get; set; }

    public string? imageUrl { get; set; }
    public required string token { get; set; }


}
