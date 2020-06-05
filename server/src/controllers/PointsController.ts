import { getPointId, postPoints, getPoints, } from '../services/points';

const postPoint = async (req, res) => {
  const {
    name, email, whatsapp, latitude, longitude, city, uf, items,
  } = req.body

  const newPoint = await postPoints({
    name, email, whatsapp, latitude, longitude, city, uf, items,
  })
  return res.status(200).json(newPoint)
};

const pointId = async (req, res) => {
  const { id } = req.params;
  const pointID = await getPointId({ id })
  return res.status(200).json(pointID)
};

const getFilteredPoints = async (req, res) => {
  const points = await getPoints(req.query)
  return res.status(200).json(points);
}
export { pointId, postPoint, getFilteredPoints };