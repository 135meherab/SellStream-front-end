import { useEffect, useState } from 'react';
import { useAddCategoryMutation,
         useDeleteCategoryMutation,
         useGetCategoriesQuery,
         useUpdateCategoryMutation } from '../features/products/productsApi';
import CategoryModal from './modals/CategoryModal';
import { toast } from 'react-toastify';



function Categories() {
  //local state
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState([]);


  //redux
  const { data: categories, isLoading, isError, error: responseError } = useGetCategoriesQuery();
  const[addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  
  // console.log(categories)
  
  //initial error
  useEffect(() => {
    if (responseError) {
      setError(responseError.error);
    }
  }, [responseError, error]);

  useEffect(() => {
    const categoryfilter = () =>{
      if(!searchTerm.trim()){
      return categories?.results || [];
      }
      return categories?.results?.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      ) || [];
    };
    setFilteredCategory(categoryfilter());
  }, [searchTerm, categories]);

  // Handle modal open/close
  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  //handle close modal
  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };


  // Add category function
  const handleCategoryModalSubmit = async(formData) => {
    try{
     await addCategory(formData ).unwrap()
     toast.success(`Category ${formData.name} added Successfully!`);
     setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };

  const handleSearchCategory = async (e) => {
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

  //update category
  const handleUpdate = async() => {
   
   try{
    setEditRowId(null); 
      await updateCategory({id:currentEditValues.id, ...currentEditValues}).unwrap()
      toast.success(`Category updated Successfully!`)
     }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
     }
    
  };

  //delete category
  const handleDelete = async(id) => {
    try{
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!")
      setError('')
    }catch(err){
      setError(err.data.detail)
      toast.error(error)
      console.log(err.data.detail)
    }
  };
  const handleCancel = () => {
    setEditRowId(null);
  };

  let content = null;


  // how to render
  
  if (isLoading) {
    content = (
      <tr >
        <td className="text-green-500 bg-green-200 text-center my-5" colSpan="9">Loading....</td>
      </tr>
    );
  } 
  else if (!isLoading && isError) {
    content = (
      <tr>
        <td className="bg-red-200 mb-5 pb-5 text-center text-red-600 py-5 font-bold" colSpan="9">
          {error || 'Something went wrong'}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && filteredCategory.length === 0) {
    content = (
      <tr className="text-red-500 bg-red-200 text-center my-5" colSpan="9">
        <td>No data Found!</td>
      </tr>
    );
  } 
  else if (!isLoading && !isError && filteredCategory.length > 0) {
    content = filteredCategory.map((category, index) => (
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
            <td className="border px-4 py-2">{category.shop_name}</td>
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

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="categoryName"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Category Name"
              className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSearchCategory}
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

      <table className="w-full border-collapse mb-4 text-sm">
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
