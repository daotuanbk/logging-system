const config = require('config.json');
const db = require('_helpers/db');
const Error = db.Error;

module.exports = {
  getById,
  create,
  update,
  delete: _delete,
  search
};

async function getById(id) {
  return await Error.findById(id);
}

async function search(query) {
  const totalPromise = await Error
    .find(
      query.searchInput ? { title: { $regex: `${query.searchInput}`, $options: 'i' } } : {}
    )
    .countDocuments()
    .exec();
  const data = await Error
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
  const error = new Error(body);

  await error.save();
}

async function update(id, body) {
  const error = await Error.findById(id);
  Object.assign(error, body)
  
  return await Error
  .findOneAndUpdate({ _id: id }, { $set: error }, { new: true })
  .exec();
}

async function _delete(id) {
  await Error.findByIdAndRemove(id);
}