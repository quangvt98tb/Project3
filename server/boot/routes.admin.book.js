
module.exports = function (app) {
    var bookModel = app.models.Book
    var router = app.loopback.Router()

    router.get('api/manage-book/list-books', async function (req, res){
        listBook = await bookModel.find()
        return res.json(listBook.rows)
    })

    router.get('api/manage-book/:id', async function (req, res){
        book = await bookModel.findById(req.body.id)
        return res.json(book)
    })

    router.post('api/manage-book/:id/update', async function (req, res){
        const bookData = {}
        bookData.uid = req.body.uid
        bookData.name = req.body.name
        bookData.categoryId = req.body.categoryId
        bookData.description = req.body.description
        bookData.imgURL = req.body.imgURL
        bookData.publisher = req.body.publisher
        bookData.author = req.body.author
        bookData.quantity = req.body.quantity
        bookData.sellPrice = req.body.sellPrice
        bookData.publishedAt = req.body.publishedAt
        try{
            book = await bookModel.findByIdAndUpdate({id: req.body.id}, bookData)
            return res.json(book)
        } catch (error) {
            return res.status(400).json(error)
        }
    })

    router.post('/book/:id/deltete', async function (req, res){
        try{
            book = await bookModel.destroyById({id: req.body.id})
            return res.json(book)
        } catch (error) {
            return res.status(400).json(error)
        }
    })

    app.use(router)
}
