using Microsoft.EntityFrameworkCore.Migrations;

namespace Antique.Migrations
{
    public partial class longInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Invoice",
                table: "tblOrders",
                nullable: false,
                oldClrType: typeof(double));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Invoice",
                table: "tblOrders",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
