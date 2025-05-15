using LMS.Models;
using LMS.Repositories;
using LMS.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using LMS.Utilities;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtTokenHelper _jwtHelper;

        public AuthController(IUserRepository userRepository, JwtTokenHelper jwtHelper)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
        }

        // SignUp: User registration
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] Users users)
        {
            if (users == null)
            {
                return BadRequest(new { message = "User data is required" });
            }

            // Check if the user already exists
            var existingUser = await _userRepository.GetUserByUsernameAsync(users.Username);
            if (existingUser != null)
            {
                return Conflict(new { message = "Username already exists" });
            }

            // Hash the password before saving it to the database
            users.Password = HashPassword(users.Password);

            try
            {
                await _userRepository.AddUserAsync(users);
                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while registering the user", error = ex.Message });
            }
        }

        // Login: User authentication
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest(new { message = "Login data is required" });
            }

            var user = await _userRepository.GetUserByUsernameAsync(loginRequest.Username);

            if (user == null || !VerifyPassword(loginRequest.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var accessToken = _jwtHelper.GenerateAccessToken(user);
            var refreshToken = _jwtHelper.GenerateRefreshToken(user);

            return Ok(new
            {
                accessToken,
                refreshToken,
            });
        }

        // Hash password using SHA-256
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        // Verify password hash comparison
        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return HashPassword(enteredPassword) == storedHash;
        }
    }
}
