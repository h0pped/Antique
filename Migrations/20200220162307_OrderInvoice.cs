using Microsoft.EntityFrameworkCore.Migrations;

namespace Antique.Migrations
{
    public partial class OrderInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Invoice",
                table: "tblOrders",
                nullable: true,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Invoice",
                table: "tblOrders");
        }
    }
}
