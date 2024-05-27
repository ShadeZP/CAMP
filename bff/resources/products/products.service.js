const productsRepo = require('./products.repository');

function findProduct(id, list) {
  return list.find((product) => product.id === id);
}

function convertResponse(res) {
  return {
    results: res.items
      .filter(item => item.product_links.length)
      .map((item) => convertProduct(item.id, res.items)
      ),
    total: res.total_count,
    limit: res.search_criteria.page_size,
    offset: res.search_criteria.current_page,
  }
}

function createAttrObj(custom_attributes) {
  return custom_attributes.reduce((acc, cur) => ({
    ...acc,
    [cur.attribute_code]: cur.value
  }), {});
}

function imageMap(gallery) {
  return gallery.map((entry) => ({url: `https://magento.test/pub/media/catalog/product${entry.file}`}))
}

function convertProduct(id, items) {
  const product = findProduct(id, items);
  const attributes = createAttrObj(product.custom_attributes)
  const variants =  product.extension_attributes.configurable_product_links?.map((id) => createVariant(findProduct(id, items))) || [];

  return {
    id: product.id,
    name: product.name,
    description: attributes.description,
    slug: attributes.url_key,
    variants: variants,
    master_variant: variants[0]
  }
}

function createVariant(product) {
  const attributes = createAttrObj(product.custom_attributes);
  const [,sizeLabel, colorLabel] = product.sku.split('-');

  return {
    id: product.id,
    sku: product.sku,
    prices: [{
      value: {
        currencyCode: "USD",
        centAmount: product.price * 100
      }
    }],
    images: imageMap(product.media_gallery_entries),
    attributes: [
      {
        name: 'Color',
        value: {
          key: attributes.color,
          label: colorLabel
        }
      },
      {
        name: "Size",
        value: {
          key: attributes.size,
          label: sizeLabel
        }
      },
    ],
    slug: attributes.url_key,
    name: product.name,
  }
}

const getProducts = async ({categoryId, offset, limit}) => {
  const res = await productsRepo.getProducts({categoryId, offset, limit});
  return convertResponse(res);
}

module.exports = {getProducts};

