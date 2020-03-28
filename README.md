# Antique store
ITSTEP graduate work. Antique store using ASP.NET Core 2.2 + React


Online shop selling rare or ancient artworks that are collectible and traded
___

#### Authorization and authentication:
JWT strategy
___
#### Roles of users in SPA

|NAME           | DESC              | 
| ------------- |:------------------| 
| Admin         | Full rights (CRUD for everything)    | 
| User          | CRUD for orders        |
___
#### Schemas for save to the PostgreSQL
___
|Schema name   | Fileds(Details)            | 
| -------------|:------------------         | 
| Product      | Name,  Description,  Price,  CategoryID, PhotoGalleryID    | 
| Category         | Name | 
| Gallery         | ProductID, PhotoID       |
|Photo       |ProductID, Path|
|Order       |Name,Surname,City, Number, Delivery, DeliveryNum, TotalPrice, isDone, Invoice|
|OrderItem          |OrderID, ProductID|
___

