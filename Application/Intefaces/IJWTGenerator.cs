using Domain;

namespace Application.Intefaces
{
    public interface IJWTGenerator
    {
        string CreateToken(AppUser user);
    }
}