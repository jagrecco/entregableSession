import { faker as _faker } from '@faker-js/faker/locale/es_MX'

const prodsFake=[]

const prods = function(){
    let p={}
    return p={
        nombre: _faker.commerce.productName(),
        precio: _faker.commerce.price(50,250, 2,"$"),
        foto: _faker.image.image(100, 100, true)
    }
}

for (let i=0; i<5; i++){
    prodsFake.push(prods())
}

export default prodsFake;