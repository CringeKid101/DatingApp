using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string email { get; set; } = "";

    [Required]
    public string displayName { get; set; } = "";

    [Required]
    [MinLength(4)]
    public string password { get; set; } = "";

}
