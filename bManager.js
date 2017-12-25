var inq=require("inquirer");
var sql=require("mysql");


var connection=sql.createConnection({
host:'localhost',
port:3306,
user:'root',
password:'root',
database:'Bamazon'

});


MainMenu();

function MainMenu()
{
inq.prompt([
{
type:'list',
message:"Hello manager,please make a selection"
choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
name:"MenuOption"
}
]).then(function(choice)
{
if(choice.MenuOption=="View Products for Sale")
{ShowInventory();}
else if(choice.MenuOption=="View Low Inventory")
{ShowLowInventory();}
else if(choice.MenuOption=="Add to Inventory")
{AddInventory();}
else if(choice.MenuOption=="Add new Product")
{createNewProduct();}

});
}


function ShowInventory()
{var q="Select * from products";
connection.query(q,function(err,data){

DrawTable(data);
});

}

function ShowLowInventory()
{
var q="Select * from products where StockQuantity <100";
connection.query(q,function(data){

DrawTable(data);

});

}



function AddInventory()
{}

function DrawTable(res)
{

console.table([
  Id: res[i].ItemID+'';
  name:productName=res[i].ProductName;
  deptName: departmentName=res[i].DepartmentName;
  price:'$'+res[i].Price.toFixed(2)+'';
  quantity:res[i].StockQuantity;
]);


}