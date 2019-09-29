module.exports = function (app) {
    var router = app.loopback.Router()

    router.get('/book', function (req, res){
        bookModel = app.models.Book
        listBook = await Book.listBook()
        return res.json(listBook.rows)
    })

    router.get('/:bookId', function (req, res){
        bookModel = app.models.Book
        book = await Book.showBook(req.body.bookId)
        return res.json(book)
    })

    app.use(router)
}
