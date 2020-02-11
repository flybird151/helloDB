 console.log('Testing Console');

 var request = window.indexedDB.open('EXAMPLE_DB',1);
// Creating Database


request.onsuccess = function(event){
  console.log("Database Created Successfully!");  
    
  var products =[
      {id:1,name:'Red Men T-Shirt',price:'$3.99'},
      {id:2,name:'Pink Women Shorts',price:'$5.99'},
      {id:3,name:'Nike white Shoes',price:'$300'}
  ];    
    
  var db = event.target.result;
    
  // create transaction from database
  var transaction = db.transaction ('products','readwrite');

  //add success event handler for transaction
  //you should also add onerror, onabort event handlers
  transaction.onsuccess = function(event){
      console.log('[Transaction] ALL DONE!');
  };
    
    
        
  var productsStore = transaction.objectStore('products');
    
    // put products data in productsStore
    
  products.forEach(function(product){
      
    var db_op_req = productsStore.add(product);
      
      db_op_req.onsuccess = function(event){
          
          console.log(event.target.result == product.id);
          //true
      }
    
    }
  );
};

request.onerror = function(event){
  console.log('[onerror]',request.error);  
};

request.onupgradeneeded = function(event){
    
    var db = event.target.result;
    var productsStore = db.createObjectStore('products',
    {keyPath: 'id'});
};