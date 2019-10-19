module.exports = function (app) {
    var router = app.loopback.Router()
    var Book = app.models.Book

    router.get('/api/listbook', async function (req, res){
        listBook = await Book.listBook(req.body.queryData, req.body.page, req.body.pageSize)
        return res.json(listBook)
    })

    router.get('/api/book/:id',async function (req, res){
        book = await Book.showBook(req.params.id)
        // book = await Book.showBook(req.body.id)
        return res.json(book)
    })
    
    app.use(router)
}
