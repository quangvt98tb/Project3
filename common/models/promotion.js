'use_strict'
let to = require('await-to-js').to;

module.exports = function(Promotion){
    const Promise = require('bluebird')

    Promotion.createPromotion = async function(reqData) {
        let PromotionData = {
            name: reqData.name,
            description: reqData.description,
            count: reqData.count,
            minus: reqData.minus,
            divide: reqData.divide,
            beginAt: reqData.beginAt,
            endAt: reqData.endAt,
            enable: reqData.enable
        }
        try {
            let promotion = await Promotion.create(PromotionData)
            return promotion
          } catch (err) {
            console.log('create Promotion', err)
            return []
          }
        }
  
    Promotion.updatePromotion = async function(reqData) {
        const data = {
            name: reqData.name,
            description: reqData.description,
            count: reqData.count,
            minus: reqData.minus,
            divide: reqData.divide,
            beginAt: reqData.beginAt,
            endAt: reqData.endAt, 
            enable: reqData.enable,
        }
        try {
          return await Promotion.upsertWithWhere(reqData.id, data)
        } catch (err) {
          console.log('update Promotion', err)
          return []
        }
    }

    Promotion.listEnablePromotionForUser = async function(userId) {
      const ExportOrder = app.models.ExportOrder
      try {
        let promotions = await Promotion.find({
          where: { 
            beginAt: {lt: Date.now()},
            endAt: {gt: Date.now()},
            enable: true
          }
        })
        let enablePromotions = []
        for (let i=0; i< promotions.length; i++){
          let orders = await ExportOrder.find({
            where: {
              userId: userId,
              promotionId: promotions[i].id,
              status: {inq: ["Confirmed", "Shipping", "Delivered"]}
            }
          })
          if (orders.length < promotions[i].count){
            enablePromotions.push(promotions[i])
          }
        }
        return enablePromotions
      } catch (err) {
        console.log('list Enable Promotion For User', err)
        throw err
      }
    }

    Promotion.remoteMethod('createPromotion', 
      {
        http: {path: '/createPromotion', verb: 'post'},
        accepts: {arg: 'reqData', type: 'object'},
        returns: { arg: 'data', root: true }
      }
    )

    Promotion.remoteMethod('updatePromotion', 
      {
        http: {path: '/updatePromotion', verb: 'post'},
        accepts: {arg: 'reqData', type: 'object'},
        returns: { arg: 'data', root: true },
      },
    )

    Promotion.remoteMethod('listEnablePromotionForUser', 
      {
        http: {verb: 'post', path: '/listEnablePromotionForUser' },
        accepts: { arg: 'userId', type: 'string', required: true},
        returns: { arg: 'data', root: true }
      }
    )
}