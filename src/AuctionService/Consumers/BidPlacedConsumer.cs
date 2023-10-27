using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly AuctionDbContext _dbContext;

        public BidPlacedConsumer(AuctionDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine("---> Consuming Bid placed");

            var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);

            if(auction.CurrentHidhBid == null || context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > auction.CurrentHidhBid)
            {
                auction.CurrentHidhBid = context.Message.Amount;
            } 
        }
    }
}