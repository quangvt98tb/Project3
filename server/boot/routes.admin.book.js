
module.exports = function (app) {
    var bookModel = app.models.Book
    var router = app.loopback.Router()

    router.get('api/manage-book/list-books', async function (req, res){
        try{
            listBook = await bookModel.find()
            return res.json(listBook.rows)
        } catch (error) {
            console.log('list Book', err)
            return res.status(400).json(err)
        }
    })

    router.get('api/manage-book/:id', async function (req, res){
        try{
            book = await bookModel.findById(req.body.id)
            return res.json(book)
        } catch (error) {
            console.log('show Book', err)
            return res.status(400).json(err)
        }
        
    })

    router.post('/api/manage-book/create', async function(req, res){
        const bookData = {
            uid : req.body.uid,
            name : req.body.name,
            categoryId : req.body.categoryId,
            description : req.body.description,
            imgURL : req.body.imgURL,
            publisher : req.body.publisher,
            author : req.body.author,
            quantity : req.body.quantity,
            sellPrice : req.body.sellPrice,
            publishedAt : req.body.publishedAt
        }
        try {
            let [err, book] = await to(Book.findOne({where: {uid: req.body.uid}}))
            if (book != null) {
                return res.status(400).json(err)
            }
            bookCreate = await Book.create(bookData)
            return res.json(bookCreate)
        } catch (error) {
            console.log('create Book', error)
            return res.status(400).json(error)
        }
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

    router.post('/book/:id/delete', async function (req, res){
        try{
            book = await bookModel.destroyById({id: req.body.id})
            return res.json(book)
        } catch (error) {
            return res.status(400).json(error)
        }
    })

    app.use(router)
}
