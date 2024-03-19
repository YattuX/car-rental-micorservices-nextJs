FROM mcr.microsoft.com/dotnet/sdk:7.0 as build 
WORKDIR /src
EXPOSE 80

# copy qll .csproj files and restore as distincts layers. Use of the same COPY command 
#for every dockerfile in the project to take advantage of docker caching
COPY car-rental-micorservices-nextJs.sln car-rental-micorservices-nextJs.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/IdentityServer/IdentityServer.csproj src/IdentityServer/IdentityServer.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

#Restore package deps
RUN dotnet restore car-rental-micorservices-nextJs.sln

#Copy the app folders over
COPY src/NotificationService src/NotificationService
COPY src/Contracts src/Contracts
RUN dotnet publish -c Release src/NotificationService/NotificationService.csproj  -o /app/src/out

#build runtime image

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "NotificationService.dll" ]