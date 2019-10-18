module.exports = function (app) {
    var router = app.loopback.Router()
    var ExportOrder = app.models.ExportOrder
    var OrderDetail = app.models.OrderDetail
    var Book = app.models.Book
    
    router.post('/api/order/create', async function(req, res){
        const data = {
            userId: req.body.userId,
            status: req.body.status,
            paymentMethod: req.body.paymentMethod,
            addressShip: req.body.addressShip,
            bookList: [],
            createAt: Date()
        }
        try {
            let i
            for (i = 0; i < req.body.bookList.length; i++){
                let bookId =  req.body.bookList[i].bookId
                let quantity = req.body.bookList[i].quantity
                let book = await Book.findById(bookId)
                if (book.quantity < quantity){
                    return res.status(400).json('Khong Du So Luong Sach Trong Kho')
                }
            }
            for (i = 0; i < req.body.bookList.length; i++){
                let orderData = {
                    bookId: req.body.bookList[i].bookId,
                    quantity: req.body.bookList[i].quantity,
                    price: req.body.bookList[i].price
                }
                try{
                    let order = await ExportOrder.create(orderData)
                    data.bookList.push(order)
                    let book = await Book.findById(bookId)
                    let newQuantity = book.quantity - orderData.quantity
                    let bookUpdate = await Book.upsertWithWhere(book.id, {quantity: newQuantity})
                } catch (error) {
                    console.log('create Order Detail', error)
                    return res.status(400).json(error)
                }
            }
            exportCreate = await OrderDetail.create(data)
            return res.json(exportCreate)
        } catch (error) {
            console.log('create Export Order', error)
            return res.status(400).json(error)
        }
    })

    router.post('/api/order/:id/cancel-order', async function(req, res){
        
    })

    router.get('/api/order/:id', async function(req, res){
        
    })

    router.get('/api/order/list', async function(req, res){
        
    })

    app.use(router)
}