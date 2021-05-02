import PropTypes from "prop-types";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AgGrid = props => {
  const { rowData , columns, id} = props;
  let columnsData = [];

    for (const [index, value] of columns.entries()) {
        columnsData.push(<AgGridColumn field={value} sortable={ true } filter={ true } key={"ag-grid-col-"+index}></ AgGridColumn>)
      }

  return (
      <AgGridReact rowData={rowData} id={id}>
              {columnsData}
      </AgGridReact>

  );
};

AgGrid.propTypes = {
  rowData: PropTypes.array,
  columns: PropTypes.array,
  id: PropTypes.string
};

AgGrid.defaultProps = {
  rowData: [],
  columns: [],
  id: ""
};
export default AgGrid;