using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionService.Entities;

namespace AuctionService.DTO
{
    public class AuctionDto
    {
         public Guid Id {get; set;}
        public int ReservePrice {get; set;}
        public string Seller {get; set;}
        public string Winner {get; set;}
        public int SoldAmount {get; set;}
        public int CurrentHidhBid {get; set;}
        public DateTime CreateAt {get; set;}
        public DateTime UpdatedAt {get; set;}
        public DateTime AuctionEnd {get; set;}
        public Status Status {get; set;}
         public string Make {get; set;}
        public string Model {get; set;}
        public int? Year {get; set;}
        public string Color {get; set;}
        public int? Mileage {get; set;}
        public string ImageUrl {get; set;}
    }
}