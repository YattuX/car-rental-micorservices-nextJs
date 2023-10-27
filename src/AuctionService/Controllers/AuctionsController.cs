using System.Threading;
using System.Threading.Tasks;
using AuctionService.Data;
using AuctionService.DTO;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [ApiController]
    [Route("Api/Auctions")]
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAuctionsList(string date)
        {
            try
            {
                var query = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

                if(!string.IsNullOrEmpty(date))
                {
                    query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
                }

                return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuction(Guid id)
        {
            try
            {
                var auction = await _context.Auctions
                                    .Include(x => x.Item)
                                    .FirstOrDefaultAsync(x => x.Id == id);
                if (auction == null) return NotFound();
                return _mapper.Map<AuctionDto>(auction);
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuction)
        {
            var auction = _mapper.Map<Auction>(createAuction);

            auction.Seller = User.Identity.Name;

            await  _context.Auctions.AddAsync(auction);

            var newAuction = _mapper.Map<AuctionDto>(auction);
            
            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

            var result = _context.SaveChanges() > 0;

            if(!result) return BadRequest("Could not be change value to the DB");
            return CreatedAtAction(nameof(GetAuction), new {auction.Id}, _mapper.Map<AuctionDto>(auction));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuction)
        {
            var auction =  await _context.Auctions.Include(x => x.Item )
                                            .FirstOrDefaultAsync(x => x.Id == id);
            
            if(auction == null) return NotFound();

            auction.Item.Model = updateAuction.Model ?? auction.Item.Model;
            auction.Item.Color = updateAuction.Color ?? auction.Item.Color;
            auction.Item.Make = updateAuction.Make ?? auction.Item.Make;
            auction.Item.Mileage = updateAuction.Mileage ?? auction.Item.Mileage;
            auction.Item.Year = updateAuction.Year ?? auction.Item.Year;

            var auctionToUpdate = _mapper.Map<UpdateAuctionDto>(auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auctionToUpdate));

            var result = await _context.SaveChangesAsync() > 0;

            if(!result) return BadRequest("Problem Saving Changes");

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction(Guid id)
        {
            var auction =  await _context.Auctions.FindAsync(id);
            
            if(auction == null) return NotFound();

            _context.Auctions.Remove(auction);

            await _publishEndpoint.Publish<AuctionDeleted>(new {Id = auction.Id.ToString()});

            var result = await _context.SaveChangesAsync() > 0;

            if(!result) return BadRequest("Problem save changes");

            return Ok();
        }
    }
}