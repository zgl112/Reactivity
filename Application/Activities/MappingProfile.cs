using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
            .ForMember(x => x.Username, o => o.MapFrom(m => m.AppUser.UserName))
            .ForMember(x => x.Displayname, o => o.MapFrom(m => m.AppUser.DisplayName));
        }
    }
}