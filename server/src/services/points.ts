import knex from '../db/connection';
import { isEmpty } from 'ramda';

const postPoints = async ({
  name, email, whatsapp, latitude, longitude, city, uf, items, image
}) => {
  console.log(name);
  const trx = await knex.transaction();;
  const upperUF = uf.toUpperCase();

  const createPoint = await trx('points').insert({
    image, name, email, whatsapp, latitude, longitude, city, uf: upperUF,
  })
  const point_id = createPoint[0];
  const pointItems = items
    .split(',')
    .map((item: string) => Number(item.trim()))
    .map((item_id: number) => {
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
  };

  const serializedPoint = {
      ...point,
      image_url: `${process.env.NEW_URL}/uploads/${point.image}`
  };

  const items = await knex('items')
    .join('point_items', 'items.id', '=', 'point_items.item_id')
    .where('point_items.point_id', id);

  return { point: serializedPoint, items };
}

const getAllPoints = async () => (
  await knex('points').select('*')
);

const getFilteredPoints = async (filter) => {
  const { city, uf, items } = filter;
  const parsedItems = String(items).split(',').map((item) => Number(item.trim()));
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
  
  const serializedPoints = filteredPoints.map((point) => {
    return {
      ...point,
      image_url: `${process.env.NEW_URL}/uploads/${point.image}`
    }
  });

  return serializedPoints;
}

const getPoints = async (filter: Object) => {
  return isEmpty(filter) ? getAllPoints() : getFilteredPoints(filter)
};

export { postPoints, getPointId, getPoints, getAllPoints };