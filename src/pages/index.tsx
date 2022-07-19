import Header from "@/components/Header";
import useProducts from "@/hooks/product";
import { Product } from "@/types/product";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

const Home: NextPage = () => {
  const [formId, setFormId] = useState(0);
  const [formTitle, setFormTitle] = useState("Product Form");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Product>({
    defaultValues: {
      id: 0,
      name: "",
      price: 0,
      category: "",
    },
  });
  const {
    data: products,
    error,
    create,
    remove,
    getById,
    update,
  } = useProducts();
  if (!products) return <div>Loading...</div>;
  if (error) return <div>Load products failed</div>;

  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log(data);
    if (formId !== 0)
      update(formId, {
        name: data.name,
        price: data.price,
        category: data.category,
      });
    create(data);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const getProductId = async (id: number) => {
    const product = await getById(id);
    reset(product);
    setFormId(id);
    setFormTitle("Editing...");
  };
  return (
    <>
      <div className="container mx-auto mt-[2rem] grid grid-cols-12 gap-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-8 col-span-4">
          <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between ">
              <h1 className="text-2xl font-bold text-blue-800 mb-4">
                {formTitle}
              </h1>
              {formTitle !== "Product Form" && formId != 0 && (
                <button
                  className="mb-4 text-gray-400 text-sm"
                  onClick={() => {
                    reset({
                      name: "",
                      price: 0,
                      category: "",
                    }),
                      setFormId(0);
                    setFormTitle("Add new");
                  }}
                >
                  New product +
                </button>
              )}
            </div>
            <hr />
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Name is required
                </p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="2000"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Price is required
                </p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="cate"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="cate"
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cate 4"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Category is required
                </p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-800 text-white py-2 px-6 rounded-xl "
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-8 col-span-8">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">List:</h1>
          <hr />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product name
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item: Product) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-600 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="py-4 px-6">{item.category}</td>
                  <td className="py-4 px-6">${item.price}</td>
                  <td className="py-4 px-6">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                      onClick={() => getProductId(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delele
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
