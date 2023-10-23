using AuctionService.DTO;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.RequestHelper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item).ReverseMap();
            CreateMap<Item, AuctionDto>();
            CreateMap<CreateAuctionDto, Item>();
            CreateMap<CreateAuctionDto, Auction>()
                .ForMember(d => d.Item, o => o.MapFrom(s => s));

            CreateMap<Auction, UpdateAuctionDto>().IncludeMembers(x => x.Item).ReverseMap();
            CreateMap<Item, UpdateAuctionDto>();
            
            CreateMap<AuctionDto, AuctionCreated>();
            CreateMap<UpdateAuctionDto, AuctionUpdated>();
        }
    }
}