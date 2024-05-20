import { useEffect, useState } from 'react';
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../features/products/productsApi';
import CategoryModal from './modals/CategoryModal';
import {categoriyyy} from './data'



function Categories() {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const[data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  const { data: category, isLoading, isError, error: responseError } = useGetCategoriesQuery();
  const[addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  useEffect(() => {
    setData(categoriyyy)
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  // Handle modal open/close
  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleCategoryModalSubmit = (formData) => {
      addCategory(formData)
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    // Logic to add a shop
  };

  const handleEdit = (category) => {
    setEditRowId(category.id);
    setCurrentEditValues(category);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditValues({
      ...currentEditValues,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    const updatedCategory = data.map((category) =>
      category.id === editRowId ? currentEditValues : category
    );

    setCurrentEditValues(updatedCategory)
    setEditRowId(null);
    updateCategory(updatedCategory.id, updatedCategory)
  };

  const handleDelete = (id) => {
    deleteCategory(id)
  };
  const handleCancel = () => {
    setEditRowId(null);
  };

  let content = null;

  if (isLoading) {
    content = (
      <tr className="text-green-500 bg-green-200 text-center my-5">
        <td>Loading....</td>
      </tr>
    );
  } 
  // else if (!isLoading && isError) {
  //   content = (
  //     <tr>
  //       <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold">
  //         {error || 'Something went wrong'}
  //       </td>
  //     </tr>
  //   );
  // } else if (!isLoading && !isError && shops?.length === 0) {
  //   content = (
  //     <tr className="text-red-500 bg-red-200 text-center my-5">
  //       <td>No data Found!</td>
  //     </tr>
  //   );
  // } 
  else if (!isLoading) {
    content = data?.map((category, index) => (
      <tr key={category.id} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        {editRowId === category.id ? (
          <>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="name"
                value={currentEditValues.name}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="uom"
                value={currentEditValues.uom}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="shop"
                value={currentEditValues.shop}
                onChange={handleInputChange}
                className="w-[100px] border rounded px-2 py-1"
              />
            </td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={handleUpdate}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Cancel
                </button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="border px-4 py-2">{category.name}</td>
            <td className="border px-4 py-2">{category.uom}</td>
            <td className="border px-4 py-2">{category.shop}</td>
            <td className="border px-4 py-2">
              <div className="flex justify-center items-center mx-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-primary py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 py-1 px-2 mx-2 text-white border rounded-md hover:bg-opacity-80"
                >
                  Delete
                </button>
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category</h2>

      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleAddShop}
              className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
            >
              Search
            </button>
          </div>
        </div>
        <button
          onClick={handleOpenCategoryModal}
          className="bg-primary text-white py-2 px-4 rounded-md ml-2 hover:bg-opacity-80"
        >
          Add Category
        </button>
      </div>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">SL No</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Category Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">UOM</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Shop</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={handleCloseCategoryModal}
          onSubmit={handleCategoryModalSubmit}
        />
      )}
    </div>
  );
}

export default Categories;
