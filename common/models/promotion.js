'use_strict'
let to = require('await-to-js').to;

module.exports = function(Promotion){
    const Promise = require('bluebird')
    Promotion.createPromotion = async function(
        name, 
        description, 
        minus,
        divide,
        beginAt,
        endAt) {

        const PromotionData = {
            name: name,
            description: description,
            minus: minus,
            divide: divide,
            beginAt: beginAt,
            endAt: endAt,
            createdAt: new Date()
        }
        try {
            const data = await Promotion.create(PromotionData)
            return data
          } catch (err) {
            console.log('create Promotion', err)
            throw err
          }
        }
    
    //read Promotion
    Promotion.readPromotion = async function(id) {
        try {
            const data = await Promotion.findOne({where: {id: id}});
            if (data == null)
                return [200, "Not exsited Id Promotion"]
            else
                return data;
        } catch (err) {
            console.log('read Promotion', err)
            throw err
        }
    }

    //update Promotion
    Promotion.updatePromotion = async function(
        id, 
        name, 
        description, 
        minus,
        divide,
        beginAt,
        endAt) {
    	
        const PromotionData = {
            name: name,
            description: description,
            minus: minus,
            divide: divide,
            beginAt: beginAt,
            endAt: endAt,
            updatedAt: new Date(),
            enable: 1
        }

        try {
            const data = await Promotion.upsertWithWhere(
              {
                id: Promotion.id
              },
              PromotionData
            )
            return data
          } catch (err) {
            console.log('update Promotion', err)
            throw err
          }
    }

    //delete Promotion 
    Promotion.deletePromotion = async function(id) {
        let [err, promo] = await to(Promotion.findOne({where: {id: id}}))
        if (promo == null) {
            return [200, 'can not find supplier']
        }
        Promotion.destroyById(promo.id)
        return [200, 'delete supplier sucess']
    }

    // list Promotions paganation(10)
    Promotion.listPromotion = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Promotion.find({
              where: {
                enable: 1
              },
              fields: {
                name: true,
                description: true,
                minus: true,
                divide: true,
                beginAt:true,
                endAt: true
              }
            }),
            Promotion.count({
              enable: 1
            })
          ])

          return {
            rows: data,
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list Promotion', err)
          throw err
        }
    }
    
    Promotion.remoteMethod('createPromotion', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
          {arg: 'uid', type: 'string', required: true},
          {arg: 'name', type: 'string', required: true},
          {arg: 'description', type: 'string', required: true},
          {arg: 'minus', type: 'number', required: true},
          {arg: 'divide', type: 'number', required: true},
          {arg: 'beginAt', type: 'date', required: false},
          {arg: 'endAt', type: 'date', required: false},
        ],
        returns: { arg: 'data', root: true }
      }
    )

    Promotion.remoteMethod('readPromotion', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data', root: true }
      },
    )

    Promotion.remoteMethod('updatePromotion', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'name', type: 'string', required: false},
          {arg: 'description', type: 'string', required: false},
          {arg: 'minus', type: 'number', required: false},
          {arg: 'divide', type: 'number', required: false},
          {arg: 'beginAt', type: 'date', required: false},
          {arg: 'endAt', type: 'date', required: false},
        ],
        returns: { arg: 'data', root: true },
      },
    )

    Promotion.remoteMethod('deletePromotion', 
      {
        http: {path: '/delete', verb: 'delete'},
        accepts: [
            {arg: 'id', type: 'string', required: true}
        ],
        returns: [
            {arg: 'status', type: 'number'},
            {arg: 'message', type: 'string'}]
      }
    )

    Promotion.remoteMethod('listPromotion', 
      {
        http: {verb: 'post', path: '/list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data', root: true }
      }
    )
}