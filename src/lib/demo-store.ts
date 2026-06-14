import type {
  Cart,
  Collection,
  Money,
  PageInfo,
  Product,
} from "@/lib/shopify/types";

const currencyCode = "USD";

const money = (amount: string): Money => ({ amount, currencyCode });

const image = (id: string, altText: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`,
  altText,
  width: 900,
  height: 900,
});

const buildProduct = ({
  handle,
  title,
  description,
  price,
  compareAtPrice = "0",
  vendor,
  tags,
  collection,
  imageId,
}: {
  handle: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  vendor: string;
  tags: string[];
  collection: string;
  imageId: string;
}): Product => {
  const featuredImage = image(imageId, title);
  const variantId = `demo-variant-${handle}`;

  return {
    id: `demo-product-${handle}`,
    handle,
    availableForSale: true,
    title,
    description,
    descriptionHtml: `<p>${description}</p><p>这是本地演示数据，部署后无需连接后端即可浏览前端页面。</p>`,
    options: [
      {
        id: `demo-option-${handle}`,
        name: "Size",
        values: ["Standard"],
      },
    ],
    priceRange: {
      maxVariantPrice: money(price),
      minVariantPrice: money(price),
    },
    compareAtPriceRange: {
      maxVariantPrice: money(compareAtPrice),
    },
    variants: [
      {
        id: variantId,
        title: "Standard",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "Standard" }],
        price: money(price),
      },
    ],
    featuredImage,
    images: [featuredImage, image(imageId, `${title} detail`)],
    seo: {
      title,
      description,
    },
    tags,
    updatedAt: new Date("2026-06-01").toISOString(),
    vendor,
    collections: {
      nodes: [{ handle: collection, title: collectionTitle(collection) }],
    },
  };
};

const collectionTitle = (handle: string) =>
  handle
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const demoProducts: Product[] = [
  buildProduct({
    handle: "cloud-runner-sneaker",
    title: "Cloud Runner Sneaker",
    description: "轻量缓震运动鞋，适合日常通勤与周末短途出行。",
    price: "89.00",
    compareAtPrice: "119.00",
    vendor: "Northline",
    tags: ["sneaker", "featured", "new"],
    collection: "footwear",
    imageId: "photo-1542291026-7eec264c27ff",
  }),
  buildProduct({
    handle: "canvas-daypack",
    title: "Canvas Daypack",
    description: "耐磨帆布双肩包，提供笔记本隔层和快速取物口袋。",
    price: "64.00",
    vendor: "Field Goods",
    tags: ["bag", "travel"],
    collection: "accessories",
    imageId: "photo-1553062407-98eeb64c6a62",
  }),
  buildProduct({
    handle: "linen-overshirt",
    title: "Linen Overshirt",
    description: "亚麻混纺外套衬衫，版型宽松，适合多季节叠穿。",
    price: "72.00",
    compareAtPrice: "96.00",
    vendor: "Atelier Co",
    tags: ["shirt", "featured"],
    collection: "apparel",
    imageId: "photo-1523381210434-271e8be1f52b",
  }),
  buildProduct({
    handle: "ceramic-cup-set",
    title: "Ceramic Cup Set",
    description: "手感温润的陶瓷杯套装，适合咖啡、茶饮和桌面陈列。",
    price: "38.00",
    vendor: "Home Studio",
    tags: ["home", "gift"],
    collection: "home-living",
    imageId: "photo-1514228742587-6b1558fcca3d",
  }),
];

export const demoPageInfo: PageInfo = {
  hasNextPage: false,
  hasPreviousPage: false,
  endCursor: "",
};

export const demoCollections: Collection[] = [
  "footwear",
  "accessories",
  "apparel",
  "home-living",
].map((handle) => {
  const products = demoProducts.filter(
    (product) => product.collections.nodes[0].handle === handle,
  );
  const image = products[0]?.featuredImage;

  return {
    handle,
    title: collectionTitle(handle),
    description: `${collectionTitle(handle)} demo collection`,
    seo: {
      title: collectionTitle(handle),
      description: `${collectionTitle(handle)} demo collection`,
    },
    updatedAt: new Date("2026-06-01").toISOString(),
    path: `/products?c=${handle}`,
    image,
    products: {
      edges: products.map((product) => ({ node: product })),
    },
  } as unknown as Collection;
});

export const demoCart: Cart = {
  id: "demo-cart",
  checkoutUrl: "/products",
  cost: {
    subtotalAmount: money("0.00"),
    totalAmount: money("0.00"),
    totalTaxAmount: money("0.00"),
  },
  lines: [],
  totalQuantity: 0,
};

export const getDemoProducts = (query?: string) => {
  if (!query) {
    return demoProducts;
  }

  const normalizedQuery = query.toLowerCase();

  return demoProducts.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.vendor.toLowerCase().includes(normalizedQuery) ||
      product.tags.some((tag) => normalizedQuery.includes(tag.toLowerCase()))
    );
  });
};
