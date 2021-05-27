import React from 'react';

function isClassComponent(component) {
  return (
    typeof component === 'function' && !!component.prototype.isReactComponent
  );
}

function isFunctionComponent(component) {
  return (
    typeof component === 'function' &&
    String(component).includes('return React.createElement')
  );
}

function isReactComponent(component) {
  return isClassComponent(component) || isFunctionComponent(component);
}

function isElement(element) {
  return React.isValidElement(element);
}

function isDOMTypeElement(element) {
  return isElement(element) && typeof element.type === 'string';
}

function isCompositeTypeElement(element) {
  return isElement(element) && typeof element.type === 'function';
}

export default (ListItem, type) => {
  let listItemComponent;

  if (isElement(ListItem) || isReactComponent(ListItem)) {
    listItemComponent = ListItem;
  } else if (ListItem.type === 'function') {
    listItemComponent = ListItem();
  } else if (Array.isArray(ListItem) && ListItem.length){
    listItemComponent = ListItem[type];
  }

  return listItemComponent;
};
