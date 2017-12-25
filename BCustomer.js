var inq= require('inquirer');
var mysql=require('mysql');
var tbl= require('console.table');

var connection=mysql.createConnection({

host:"localhost",
port:3306,
user:root,
password:"root",
database:Bamazon
});




connection.connect(function(err){
if(err) throw err;
console.log();

});
var itemID,itemQuatity;
ShowItems();

function ShowItems(){

connection.query('Select * from Products",function(err,res){

if (err)
throw err;


console.log('Check out our selection...\n');
for(var i=0;i<res.length;i++)
{

console.table([
  Id: res[i].ItemID+'';
  name:productName=res[i].ProductName;
  deptName: departmentName=res[i].DepartmentName;
  price:'$'+res[i].Price.toFixed(2)+'';
  quantity:res[i].StockQuantity;
]);

}
GetUserOrder();
}


function GetUserOrder()
{
inq.prompt([

{name:"buyItemId",
Message:"Enter product id"},
{
name:"Quantity",
Message:"Please Enter Quantity"
}

]).then(function(answer){
itemID=answer.buyItemID;
itemQuantity=answer.Quantity;
UpdateDatabase();

});
}

function UpdateDatabase(){
connection.query('Select StockQuantity,ItemPrice from Products WHERE?',[{Id:ItemID}],function(err,res){
if(err) throw err;

if(res[0]==undefined)
{
console.log(ItemID +"is unavailable");
connection.end();
}

else
{
var stockquantity=res[0].StockQuantity;

if(stockquantity >= itemQuantity )
{
  var newInven=parseInt(stockquantity)-parseInt(ItemQuantity);
connection.query("Update products set ? where ?",[{StockQuantity:newInven},{Id:itemID}],function(err,res){
if(err) throw err;
else
console.log("The total price of "itemQUantity+" of"+itemID +"is "+parseInt(StockQUantity)*parseInt(res[0].itemPrice));

});
}
}
}
