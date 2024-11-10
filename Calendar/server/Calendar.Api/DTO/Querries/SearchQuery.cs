namespace Calendar.Api.DTO.Querries
{
    public class SearchQuery
    {
        public string UserId { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
