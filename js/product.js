var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var inputs=document.getElementsByClassName("form-control");
var addButton = document.getElementById('add');
var productContainer;
var currentIndex=0;

// Local Storage
if (localStorage.getItem("products") == null) {
   productContainer = []
} else {
   productContainer=JSON.parse(localStorage.getItem("products"))
   displayProduct()
}
// Add , display, update Product
addButton.onclick=function()
{
  if(addButton.innerHTML=="Add product") //add mode
  {
    addproduct();
  }
  else{   //update mode
    updateproduct()
  }

  displayProduct();
  clearform()
}
function addproduct() {
     var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
     }
     productContainer.push(product)
     localStorage.setItem("products",JSON.stringify(productContainer))
}
function displayProduct() {
   var total =`` ;
   for (var i=0; i<productContainer.length ; i++){
      total +=`<tr>
      <td>${i}</td>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].desc}</td>
      <td><button onclick="getProductInfo(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteproduct(${i})" class="btn btn-danger">Delete</button></td>
      </tr>`
      
      document.getElementById('values').innerHTML= total;
   }
}
function updateproduct() {
   var product = {
      name:productNameInput.value,
      price:productPriceInput.value,
      category:productCategoryInput.value,
      desc:productDescInput.value
   }
   productContainer[currentIndex].name = product.name;
   productContainer[currentIndex].price = product.price;
   productContainer[currentIndex].category = product.category;
   productContainer[currentIndex].desc = product.desc;
   localStorage.setItem("products",JSON.stringify(productContainer))
 

}
function getProductInfo(index){
   currentIndex=index;//0

   var product = productContainer[index];
   console.log(productContainer[index]);
   productNameInput.value=product.name;
     productPriceInput.value=product.price;
     productCategoryInput.value=product.category;
     productDescInput.value = product.desc; 
   addButton.innerHTML="update product";

}
// Clear form and delete Product
function clearform (){
   for(var i=0;i<inputs.length;i++){
      inputs[i].value=""
    }
}
function deleteproduct(index){
   productContainer.splice(index,1);
   displayProduct();
   localStorage.setItem("products",JSON.stringify(productContainer))
}
