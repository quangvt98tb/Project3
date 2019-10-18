module.exports = function (app) {
    var router = app.loopback.Router()
    var ExportOrder = app.models.ExportOrder
    var OrderDetail = app.models.OrderDetail
    var Book = app.models.Book
    
    router.get('/api/manage-export-order/list', async function(req, res){
        
    })

    router.get('/api/order/:id', async function(req, res){
        
    })

    router.post('/api/order/:id/updateStatus', async function(req, res){
        if (req.body.status == "Chap nhan"){
            let order = await ExportOrder.findById(req.params.id)
            let i
            for (i = 0; i < order.bookList.length; i++){
                let bookId =  order.bookList[i].bookId
                let quantity = order.bookList[i].quantity
                let book = await Book.findById(bookId)
                if (book.quantity < quantity){
                    ExportOrder.upsertWithWhere(req.params.id, {status: "Huy vi Khong Du Sach"})
                    return res.status(400).json('Khong Du So Luong Sach Trong Kho')
                }
            }
            for (i = 0; i < order.bookList.length; i++){
                bookId = order.bookList[i].bookId
                quantity = order.bookList[i].quantity
                try{
                    let book = await Book.findById(bookId)
                    let newQuantity = book.quantity - orderData.quantity
                    let bookUpdate = await Book.upsertWithWhere(book.id, {quantity: newQuantity})
                } catch (error) {
                    console.log('create Order Detail', error)
                    return res.status(400).json(error)
                }
            }
        }
        let exportUpdate = await ExportOrder.upsertWithWhere(req.params.id, {status: req.body.status})
        return res.json(exportUpdate)
    })

    app.use(router)
}