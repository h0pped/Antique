using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Antique.Migrations
{
    public partial class orders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderID",
                table: "Products",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblOrders",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Number = table.Column<string>(nullable: true),
                    Delivery = table.Column<string>(nullable: true),
                    DeliveryNum = table.Column<string>(nullable: true),
                    TotalPrice = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblOrders", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_OrderID",
                table: "Products",
                column: "OrderID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_tblOrders_OrderID",
                table: "Products",
                column: "OrderID",
                principalTable: "tblOrders",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_tblOrders_OrderID",
                table: "Products");

            migrationBuilder.DropTable(
                name: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_Products_OrderID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "Products");
        }
    }
}
