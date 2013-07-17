
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '荒野的呼唤-潘文石生物多样性基金会' });
};