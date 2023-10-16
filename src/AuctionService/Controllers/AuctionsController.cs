using System.Threading;
using System.Threading.Tasks;
using AuctionService.Data;
using AuctionService.DTO;
using AuctionService.Entities;
using AutoMapper;
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

        public AuctionsController(AuctionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAuctionsList()
        {
            try
            {
                 var auctions = await _context.Auctions
                                    .Include(x => x.Item)
                                    .OrderBy(x => x.Item.Make)
                                    .ToListAsync();

                return _mapper.Map<List<AuctionDto>>(auctions);
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

            await  _context.Auctions.AddAsync(auction);

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

            var result = await _context.SaveChangesAsync() > 0;

            if(!result) return BadRequest("Problem save changes");

            return Ok();
        }
    }
}