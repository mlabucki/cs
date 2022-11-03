import AddNewProduct from "../components/products/AddNewProduct"



const NewProduct = () => {

    const addProductHandler = async (enteredProductData) => {
        const response = await fetch('/api/products',{
            method: 'POST',
            body: JSON.stringify(enteredProductData),
            header:{
                'Contant-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }
    return (
        
        <AddNewProduct onAddProduct={addProductHandler}/>
        
    )
}

export default NewProduct;