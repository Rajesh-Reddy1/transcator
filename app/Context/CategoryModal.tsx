// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface CategoryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddCategory: (newCategory: string) => void;
//   onEditCategory: (updatedCategory: { id: string; name: string }) => void;
//   onDeleteCategory: (categoryId: string) => void;
//   categories: { id: string; name: string }[];
//   editingCategory: { id: string; name: string } | null;
//   setEditingCategory: (category: { id: string; name: string } | null) => void;
// }

// const CategoryModal: React.FC<CategoryModalProps> = ({
//   isOpen,
//   onClose,
//   onAddCategory,
//   onEditCategory,
//   onDeleteCategory,
//   categories,
//   editingCategory,
//   setEditingCategory,
// }) => {
//   const [newCategoryName, setNewCategoryName] = useState("");

//   const handleAddNewCategory = () => {
//     if (newCategoryName.trim() !== "") {
//       onAddCategory(newCategoryName.trim());
//       setNewCategoryName("");
//     }
//   };

//   const handleEditCategory = () => {
//     if (editingCategory && editingCategory.name.trim() !== "") {
//       onEditCategory(editingCategory);
//       setEditingCategory(null);
//     }
//   };

//   const handleDeleteCategory = (categoryId: string) => {
//     onDeleteCategory(categoryId);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="translate-y-4 sm:translate-y-0 sm:scale-95"
//           enterTo="translate-y-0 sm:scale-100"
//           leave="ease-in duration-200"
//           leaveFrom="translate-y-0 sm:scale-100"
//           leaveTo="translate-y-4 sm:translate-y-0 sm:scale-95"
//         >
//           <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-0">
//             <div className="max-w-lg w-full relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-xl">
//               <div className="p-6">
//                 <div className="mt-3 text-center sm:mt-5">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg leading-6 font-medium text-gray-900"
//                   >
//                     {editingCategory ? "Edit Category" : "Add Category"}
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <Input
//                       type="text"
//                       placeholder="Enter category name"
//                       value={editingCategory ? editingCategory.name : newCategoryName}
//                       onChange={(e) => setNewCategoryName(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-4">
//                     <Button
//                       onClick={
//                         editingCategory ? handleEditCategory : handleAddNewCategory
//                       }
//                     >
//                       {editingCategory ? "Save Changes" : "Add Category"}
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex justify-end">
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setNewCategoryName("");
//                       setEditingCategory(null);
//                       onClose();
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Transition.Child>
//       </Dialog>
//     </Transition>
//   );
// };

// export default CategoryModal;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (newCategory: string) => void;
  onEditCategory: (updatedCategory: { id: string; name: string }) => void;
  onDeleteCategory: (categoryId: string) => void;
  categories: { id: string; name: string }[];
  editingCategory: { id: string; name: string } | null;
  setEditingCategory: (category: { id: string; name: string } | null) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  categories,
  editingCategory,
  setEditingCategory,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddNewCategory = () => {
    if (newCategoryName.trim() !== "") {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName("");
    }
  };

  const handleEditCategory = () => {
    if (editingCategory && editingCategory.name.trim() !== "") {
      onEditCategory(editingCategory);
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    onDeleteCategory(categoryId);
  };

  const handleEditClick = (category: { id: string; name: string }) => {
    setEditingCategory(category);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0 sm:scale-100"
          leaveTo="translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-0">
            <div className="max-w-lg w-full relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-xl">
              <div className="p-6">
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {editingCategory ? "Edit Category" : "Add Category"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Enter category name"
                      value={
                        editingCategory ? editingCategory.name : newCategoryName
                      }
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={
                        editingCategory ? handleEditCategory : handleAddNewCategory
                      }
                    >
                      {editingCategory ? "Save Changes" : "Add Category"}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewCategoryName("");
                      setEditingCategory(null);
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              {/* Category Listing Area */}
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Existing Categories
                </h3>
                <ul className="mt-2">
                  {categories.map((category) => (
                    <li key={category.id} className="mt-2">
                      <div className="flex justify-between">
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditClick(category)}
                        >
                          {category.name}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleEditClick(category)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default CategoryModal;