import { getItems } from '../services/items';

const getItemsController = async (req, res) => {
  try {
    const items = await getItems()
    res.status(200).json(items);
  } catch (error) {
    return res.status(500).send('Error')
  }
}

export { getItemsController };