import knex from '../db/connection';

const getItems = async () => {
  const items =  await knex('items').select('*');
  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://llocalhost:3001/uploads/${item.image}`
    }
  })
  return serializedItems;
}

export { getItems };