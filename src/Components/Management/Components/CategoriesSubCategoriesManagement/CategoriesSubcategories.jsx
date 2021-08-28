import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { CategoriesSubcategoriesStyled } from "./CategoriesSubcategoriesStyled";
import { restClient } from "../../../../Helpers/restClient";
import List from "../../../../Controls/List/List";
import {
  ActionButton,
  ComboBox,
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogType,
  IconButton,
  Label,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { isNull } from "lodash";
import { toast } from "react-toastify";
import { AppContext } from "../../../Contexts/AppContext";
// import "react-toastify/dist/ReactToastify.css";

const CategoriesSubcategories = (props) => {
  const context = useContext(AppContext);
  const { userLogged } = context;
  const [itemsCategories, setitemsCategories] = useState([]);
  const [itemsSubcategories, setitemsSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isEditSubcategory, setIsEditSubcategory] = useState(false);

  const [isNewCategogry, setisNewCategogry] = useState(false);
  const [isNewSubCategogry, setisNewSubCategogry] = useState(false);

  const [categoryToProcess, setCategoryToProcess] = useState({
    categoryId: "",
    description: "",
  });
  const [subcategoryToProcess, setSubcategoryToProcess] = useState({
    subcategoryId: "",
    description: "",
    categoryId: "",
    cost: 0.0,
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    restClient.httpGet("category-event/get-all", {}).then((response) => {
      console.log(response);
      setitemsCategories(response);
      setSelectedCategory({});
      setSelectedSubcategory({});
    });
  };

  const onSelectedCategory = (item) => {
    setSelectedCategory(item);
    setSelectedSubcategory({});
    onGetSubcategoriesByCategoryId(item);
  };

  const onGetSubcategoriesByCategoryId = (category) => {
    restClient
      .httpGet("subcategory-event/by-id-category", {
        CategoryId: category.categoryId,
      })
      .then((response) => {
        console.log(response);
        setitemsSubcategories(response);
        setSelectedSubcategory({});
      });
  };

  const onChangeFieldCategory = (field, newValue) => {
    setCategoryToProcess({
      ...categoryToProcess,
      [field]: newValue,
    });
  };
  const onChangeFieldSubCategory = (field, newValue) => {
    setSubcategoryToProcess({
      ...subcategoryToProcess,
      [field]: newValue,
    });
  };
  const onRenderCategory = (category) => (
    <div>
      <Label>Category Id: {category.categoryId}</Label>
      <Label>Description: {category.description}</Label>
      <div>
        <ActionButton
          iconProps={{ iconName: "Edit" }}
          onClick={() => {
            setIsEditCategory(true);
            setCategoryToProcess({ ...category });
          }}
          disabled={userLogged === null || userLogged.roleId !== "Admin"}
        >
          Edit
        </ActionButton>
        {" | "}|
        <ActionButton
          disabled={userLogged === null || userLogged.roleId !== "Admin"}
          iconProps={{ iconName: "Cancel" }}
          onClick={onDeleteCategory}
        >
          Remove
        </ActionButton>
      </div>
    </div>
  );

  const onRenderSubcategory = (subcategory) => (
    <div>
      <Label>SubCategory Id: {subcategory.subcategoryId}</Label>
      <Label>Description: {subcategory.description}</Label>
      <Label>Cost: $ {subcategory.cost}</Label>
      <div>
        <ActionButton
          iconProps={{ iconName: "Edit" }}
          onClick={() => {
            setIsEditSubcategory(true);
            setSubcategoryToProcess({ ...subcategory });
          }}
          disabled={userLogged === null || userLogged.roleId !== "Admin"}
        >
          Edit
        </ActionButton>{" "}
        |
        <ActionButton
          disabled={userLogged === null || userLogged.roleId !== "Admin"}
          iconProps={{ iconName: "Cancel" }}
          onClick={onDeleteSubCategory}
        >
          Remove
        </ActionButton>
      </div>
    </div>
  );

  const onSaveChangesCategory = () => {
    if (isNewCategogry || isNewSubCategogry) {
      setisNewCategogry(false);
      setisNewSubCategogry(false);

      restClient
        .httpPost("category-event", {
          Description: categoryToProcess.description,
        })
        .then((response) => {
          if (response && !isNull(response.errorMessage)) {
            toast.warn(response.errorMessage, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return;
          }
          if (response && !isNull(response.successMessage)) {
            toast.success(response.successMessage, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setitemsCategories([]);
            getCategories();
            setSubcategoryToProcess({});
            setCategoryToProcess({ categoryId: "", description: "" });
            return;
          }
        });
      return;
    }

    setIsEditCategory(false);
    setIsEditSubcategory(false);

    restClient
      .httpPut("category-event", {
        CategoryId: categoryToProcess.categoryId,
        Description: categoryToProcess.description,
      })
      .then((response) => {
        if (response && !isNull(response.errorMessage)) {
          toast.warn(response.errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return;
        }
        if (response && !isNull(response.successMessage)) {
          toast.success(response.successMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setitemsCategories([]);
          getCategories();
          setSubcategoryToProcess({});
          setCategoryToProcess({ categoryId: "", description: "" });
          return;
        }
      });
  };

  const onSaveChangesSubcategory = () => {
    if (isNewCategogry || isNewSubCategogry) {
      setisNewCategogry(false);
      setisNewSubCategogry(false);
      restClient
        .httpPost("subcategory-event", {
          CategoryId: subcategoryToProcess.categoryId,
          Description: subcategoryToProcess.description,
          Cost: subcategoryToProcess.cost,
        })
        .then((response) => {
          if (response && !isNull(response.errorMessage)) {
            toast.warn(response.ErrorMessage, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return;
          }
          if (response && !isNull(response.SuccessMessage)) {
            toast.success(response.successMessage, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setitemsSubcategories([]);
            onGetSubcategoriesByCategoryId(selectedCategory);
            setSubcategoryToProcess({
              subcategoryId: "",
              description: "",
              categoryId: "",
              cost: 0.0,
            });
            return;
          }
        });
      return;
    }
    setIsEditCategory(false);
    setIsEditSubcategory(false);

    restClient
      .httpPut("subcategory-event", {
        SubcategoryId: subcategoryToProcess.subcategoryId,
        CategoryId: subcategoryToProcess.categoryId,
        Description: subcategoryToProcess.description,
        Cost: subcategoryToProcess.cost,
      })
      .then((response) => {
        if (response && !isNull(response.errorMessage)) {
          toast.warn(response.ErrorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return;
        }
        if (response && !isNull(response.SuccessMessage)) {
          toast.success(response.successMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setitemsSubcategories([]);
          onGetSubcategoriesByCategoryId(selectedCategory);
          setSubcategoryToProcess({
            subcategoryId: "",
            description: "",
            categoryId: "",
            cost: 0.0,
          });
          return;
        }
      });
  };

  const onDeleteSubCategory = () => {
    restClient
      .httpDelete("subcategory-event", {
        SubcategoryId: selectedSubcategory.subcategoryId,
      })
      .then((response) => {
        if (response && !isNull(response.errorMessage)) {
          toast.warn(response.ErrorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return;
        }
        if (response && !isNull(response.SuccessMessage)) {
          toast.success(response.successMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setitemsSubcategories([]);
          onGetSubcategoriesByCategoryId(selectedCategory);
          setSubcategoryToProcess({
            subcategoryId: "",
            description: "",
            categoryId: "",
            cost: 0.0,
          });
          return;
        }
      });
  };

  const onDeleteCategory = () => {
    restClient
      .httpDelete("category-event", { CategoryId: selectedCategory.categoryId })
      .then((response) => {
        if (response && !isNull(response.errorMessage)) {
          toast.warn(response.ErrorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return;
        }
        if (response && !isNull(response.SuccessMessage)) {
          toast.success(response.successMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setitemsSubcategories([]);
          getCategories();
          setSubcategoryToProcess({
            subcategoryId: "",
            description: "",
            categoryId: "",
            cost: 0.0,
          });
          return;
        }
      });
  };

  return (
    <CategoriesSubcategoriesStyled>
      {/* <ToastContainer style={{ zIndex: "2000" }} /> */}
      <div className="ContainerLists">
        <div>
          <h2 className="">Categories</h2>
          <PrimaryButton onClick={() => setisNewCategogry(true)}>
            New Category
          </PrimaryButton>
          <List
            items={itemsCategories}
            onRenderItem={onRenderCategory}
            itemSelected={selectedCategory}
            onClickItem={onSelectedCategory}
          />
        </div>
        <div>
          <h2 className="">Subcategories</h2>
          <PrimaryButton onClick={() => setisNewSubCategogry(true)}>
            New Subcategory
          </PrimaryButton>
          <List
            items={itemsSubcategories}
            onRenderItem={onRenderSubcategory}
            itemSelected={selectedSubcategory}
            onClickItem={(item) => setSelectedSubcategory(item)}
          />
        </div>
      </div>
      {(isEditCategory || isEditSubcategory) && (
        <Dialog
          hidden={!isEditCategory && !isEditSubcategory}
          onDismiss={() => {
            setisNewCategogry(false);
            setisNewSubCategogry(false);
          }}
          dialogContentProps={{
            type: DialogType.normal,
            title: isEditCategory ? "Editing Category" : "Editing Subcategory",
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { maxWidth: 450 } },
          }}
        >
          <DialogContent>
            {isEditCategory ? (
              <div>
                <TextField
                  label="Category Id"
                  disabled
                  value={categoryToProcess.categoryId}
                />
                <TextField
                  label="Description"
                  value={categoryToProcess.description}
                  onChange={(ev, nv) => {
                    onChangeFieldCategory("description", nv);
                  }}
                />
              </div>
            ) : (
              <div>
                <TextField
                  label="Subcategory Id"
                  disabled
                  value={selectedSubcategory.subcategoryId}
                />
                <TextField
                  label="Description"
                  value={selectedSubcategory.description}
                  onChange={(ev, nv) => {
                    onChangeFieldSubCategory("description", nv);
                  }}
                />
                <TextField
                  label="Category"
                  disabled
                  value={selectedCategory.description}
                />
                <TextField
                  label="Cost"
                  value={selectedSubcategory.cost}
                  onChange={(ev, nv) => {
                    onChangeFieldSubCategory("cost", nv);
                  }}
                />
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <PrimaryButton
              onClick={
                isEditCategory
                  ? onSaveChangesCategory
                  : onSaveChangesSubcategory
              }
              text="Save"
            />
            <DefaultButton
              onClick={() => {
                setIsEditCategory(false);
                setIsEditSubcategory(false);
              }}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      )}
      {(isNewCategogry || isNewSubCategogry) && (
        <Dialog
          hidden={!isNewCategogry && !isNewSubCategogry}
          onDismiss={() => {
            setIsEditCategory(false);
            setIsEditSubcategory(false);
          }}
          dialogContentProps={{
            type: DialogType.normal,
            title: isNewCategogry ? "New Category" : "New Subcategory",
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { maxWidth: 450 } },
          }}
        >
          <DialogContent>
            {isNewCategogry ? (
              <div>
                <TextField
                  label="Category Id"
                  disabled
                  value={categoryToProcess.categoryId}
                />
                <TextField
                  label="Description"
                  value={categoryToProcess.description}
                  onChange={(ev, nv) => {
                    onChangeFieldCategory("description", nv);
                  }}
                />
              </div>
            ) : (
              <div>
                <TextField label="Subcategory Id" disabled value="" />
                <TextField
                  label="Description"
                  value={subcategoryToProcess.description}
                  onChange={(ev, nv) => {
                    onChangeFieldSubCategory("description", nv);
                  }}
                />
                <ComboBox
                  label="Category"
                  selectedKey={subcategoryToProcess.categoryId}
                  options={
                    itemsCategories &&
                    itemsCategories.map((x) => ({
                      key: x.categoryId,
                      text: x.description,
                    }))
                  }
                  onChange={(ev, opt) => {
                    onChangeFieldSubCategory("categoryId", opt.key);
                  }}
                />
                <TextField
                  label="Cost"
                  value={subcategoryToProcess.cost}
                  onChange={(ev, nv) => {
                    onChangeFieldSubCategory("cost", nv);
                  }}
                />
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <PrimaryButton
              onClick={
                isNewCategogry
                  ? onSaveChangesCategory
                  : onSaveChangesSubcategory
              }
              text="Save"
            />
            <DefaultButton
              onClick={() => {
                setisNewCategogry(false);
                setisNewSubCategogry(false);
              }}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      )}
    </CategoriesSubcategoriesStyled>
  );
};

CategoriesSubcategories.propTypes = {};

export default CategoriesSubcategories;
