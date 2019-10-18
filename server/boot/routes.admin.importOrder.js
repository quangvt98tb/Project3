module.exports = function (app) {
    var router = app.loopback.Router()
    var ImportOrder = app.models.ImportOrder
    var OrderDetail = app.models.OrderDetail
    var Book = app.models.Book
    
    router.post('/api/manage-import-order/create', async function(req, res){
        const data = {
            supplierId: req.body.supplierId,
            status: req.body.status,
            bookList: [],
            createAt: Date()
        }
        try {
            let i
            for (i = 0; i < req.body.bookList.length; i++){
                let orderData = {
                    bookId: req.body.bookList[i].bookId,
                    quantity: req.body.bookList[i].quantity,
                    price: req.body.bookList[i].price
                }
                let book = await Book.findById(orderData.bookId)
                try{
                    let order = await ImportOrder.create(orderData)
                    data.bookList.push(order)
                    let newQuantity = book.quantity + orderData.quantity
                    let bookUpdate = await Book.upsertWithWhere(book.id, {quantity: newQuantity})
                } catch (error) {
                    console.log('create Import Order Detail', error)
                    return res.status(400).json(error)
                }
            }
            importCreate = await OrderDetail.create(data)
            return res.json(importCreate)
        } catch (error) {
            console.log('create Import Order', error)
            return res.status(400).json(error)
        }
    })

    // router.delete('/api/manage-import-order/:id/delete', async function(req, res){
    //     try {
    //         importDelete = await ImportOrder.destroyById({id: req.params.id})
    //         return res.json(importDelete)
    //     } catch (err){
    //         console.log('delelte Import Order', err)
    //         return res.status(400).json(err)
    //     }
    // })

    app.use(router)
}