const config = require('config.json');
const db = require('_helpers/db');
const Response = db.Response;

module.exports = {
  getById,
  create,
  update,
  delete: _delete,
  search
};

async function getById(id) {
  return await Response.findById(id);
}

async function search(query) {
  const totalPromise = await Response
    .find(
      query.searchInput ? { title: { $regex: `${query.searchInput}`, $options: 'i' } } : {}
    )
    .countDocuments()
    .exec();
  const data = await Response
    .find({
      $or: [
        query.searchInput ? { title: { $regex: `${query.searchInput}`, $options: 'i' } } : {},
      ]
    })
    .sort((query.asc) === 'true' ? query.sortBy : `-${query.sortBy}`)
    .skip((query.pageNumber - 1) * query.pageSize)
    .limit(Number(query.pageSize))
    .exec();
  return {
    data,
    total: totalPromise
  }
}

async function create(body) {
  const response = new Response(body);

  await response.save();
}

async function update(id, body) {
  const response = await Response.findById(id);
  Object.assign(response, body)
  
  return await Response
  .findOneAndUpdate({ _id: id }, { $set: response }, { new: true })
  .exec();
}

async function _delete(id) {
  await Response.findByIdAndRemove(id);
}