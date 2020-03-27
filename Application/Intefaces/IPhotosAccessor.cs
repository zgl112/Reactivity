using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Intefaces
{
    public interface IPhotosAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);
    }
}