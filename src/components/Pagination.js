import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function Pagination(props) {

  function onClickPageNavigation(page) {
    var newParams = { ...props.viewParameters }
    newParams.page = page
    props.setViewParameters(newParams)
  }
  var pageNumbers = []
  if (props.products.totalPages) {
    for (var i = 1; i <= props.products.totalPages; i++) pageNumbers.push(i)
  }
  return (
    <React.Fragment>
      <ButtonGroup size="small" aria-label="small outlined button group">
        {
          pageNumbers.map(number => <Button onClick={e => onClickPageNavigation(number)}>{number}</Button>)}
        }
      </ButtonGroup>
    </React.Fragment>
  );
}