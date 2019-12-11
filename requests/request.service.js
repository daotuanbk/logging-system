const config = require('config.json');
const db = require('_helpers/db');
const Request = db.Request;

module.exports = {
  getById,
  create,
  update,
  delete: _delete,
  search
};

Request.createMapping((err, mapping) => {
  if (err) {
    console.log('error created mapping', err)
  } else {
    console.log('mapping created', mapping);
  }
});

var stream = Request.synchronize();
var count = 0;

stream.on('data', () => {
  count++;
})

stream.on('close', () => {
  console.log('Indexed ' + count + ' documents')
})

stream.on('error', (err) => {
  console.log('error', err);
})

async function getById(id) {
  return await Request.findById(id);
}

async function search(query) {
  const totalPromise = await Request
    .find(
      query.searchInput ? { title: { $regex: `${query.searchInput}`, $options: 'i' } } : {}
    )
    .countDocuments()
    .exec();
  const data = await Request
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
  const request = new Request(body);

  await request.save();
  request.on('es-indexed', (err, result) => {
    console.log('request indexed to elastic search');
  });
}

async function update(id, body) {
  const request = await Request.findById(id);
  Object.assign(request, body)

  return await Request
    .findOneAndUpdate({ _id: id }, { $set: request }, { new: true })
    .exec();
}

async function _delete(id) {
  await Request.findByIdAndRemove(id);
}