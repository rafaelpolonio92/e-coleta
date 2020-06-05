import knex from '../db/connection';
import { isEmpty } from 'ramda';

const postPoints = async ({
  name, email, whatsapp, latitude, longitude, city, uf, items,
}) => {
  const trx = await knex.transaction();;
  const upperUF = uf.toUpperCase();

  const createPoint = await trx('points').insert({
    image: 'image', name, email, whatsapp, latitude, longitude, city, uf: upperUF,
  })
  const point_id = createPoint[0];
  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id,
    }
  });

  await trx('point_items').insert(pointItems);

  const newPoint = await trx('points')
  .select('*')
  .where('id', createPoint[0]);
  
  await trx.commit();
  return newPoint;
}

const getPointId = async ({ id }) => {
  const point = await knex('points')
    .select('*')
    .where('id', id).first();
  if (!point) {
    return 'Point Id Not Found';
  }
  const items = await knex('items')
    .join('point_items', 'items.id', '=', 'point_items.item_id')
    .where('point_items.point_id', id);

  return { point, items };
}

const getAllPoints = async () => (
  await knex('points').select('*')
);

const getFilteredPoints = async (filter) => {
  console.log(filter)
  const { city, uf, items } = filter;
  const parsedItems = String(items).split(',').map((item) => Number(item.trim()));
  console.log(city)
  const filteredPoints = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .modify((queryFunction) => {
      items ? queryFunction.whereIn('point_items.item_id', parsedItems) : ''
    })
    .modify((queryFunction) => {
      city ? queryFunction.where('city', String(city)) : ''
    })
    .modify((queryFunction) => {
      uf ? queryFunction.where('uf', String(uf).toUpperCase()) : ''
    })
    .distinct()
    .select('points.*')

    return filteredPoints;
}

const getPoints = async (filter: Object) => {
  return isEmpty(filter) ? getAllPoints() : getFilteredPoints(filter)
};

export { postPoints, getPointId, getPoints, getAllPoints };