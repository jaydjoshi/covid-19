import PropTypes from "prop-types";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const AgGrid = props => {
  const { rowData , columns, id} = props;
  let columnsData = [];

    for (const [index, value] of columns.entries()) {
        if(value === "state"){
            columnsData.push(<AgGridColumn field={value} sortable={ true } filter={ true } resizable={true} key={"ag-grid-col-"+index}></ AgGridColumn>)
        }else{
            columnsData.push(<AgGridColumn field={value} sortable={ true } filter={ true } resizable={true} valueFormatter={numberFormatter} key={"ag-grid-col-"+index}></ AgGridColumn>)
        }
      }

    function numberFormatter(params) {
         return params.value.toLocaleString('en-IN');
    }

    function onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();

      };
  return (


      <AgGridReact rowData={rowData} id={id} onGridReady={onGridReady}>
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