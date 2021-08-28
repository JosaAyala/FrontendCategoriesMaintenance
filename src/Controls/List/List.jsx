import React from "react";
import PropTypes from "prop-types";
import { ListStyled } from "./ListStyled";
import { indexOf } from "lodash";

const List = ({ items, onRenderItem, onClickItem, itemSelected }) => {
  const onClick = (item) => {
    if (onClickItem) {
      onClickItem(item);
    }
  };

  const indexSelected = items && items.indexOf(itemSelected);

  return (
    <ListStyled>
      {items &&
        items.length > 0 &&
        items.map((item, index) => {
          return onRenderItem ? (
            <li
              onClick={() => {
                onClick(item);
              }}
              className={
                indexSelected > -1 && indexSelected === index
                  ? "ItemLiSelected"
                  : "ItemLi"
              }
              key={index}
            >
              {onRenderItem(item)}
            </li>
          ) : (
            <li
              className={
                indexSelected > -1 && indexSelected === index
                  ? "ItemLiSelected"
                  : "ItemLi"
              }
            >
              {item}
            </li>
          );
        })}
    </ListStyled>
  );
};

List.propTypes = {
  items: PropTypes.array,
  onRenderItem: PropTypes.any,
  onClickItem: PropTypes.func,
  itemSelected: PropTypes.any,
};

export default List;
