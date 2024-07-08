import { IAddProduct, IProduct, IUpdateProduct } from "./product.type";
// Fetch all products
export const findAllProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch product list");
  }
  return (await res.json()) as IProduct[];
};

export const findProductById = async (productId: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return (await res.json()) as IProduct;
};

export const createProduct = async (data: IAddProduct) => {
  console.log(data);
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("point_cost", data.point_cost.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("image", data.image.fileList[0].originFileObj);

  const res = await fetch(`http://localhost:3000/api/products`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const updateProduct = async (data: IUpdateProduct) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.point_cost)
    formData.append("point_cost", data.point_cost.toString());
  if (data.quantity) formData.append("quantity", data.quantity.toString());
  if (data.image)
    formData.append("image", data.image.fileList[0].originFileObj);

  const res = await fetch(`http://localhost:3000/api/products/${data.id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return { success: res.ok };
};
