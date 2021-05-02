
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AgGrid = props => {
  const { rowData , columns} = props;
  let columnsData = [];

    for (const [value] of columns.entries()) {
        columnsData.push(<AgGridColumn field={value} sortable={ true } filter={ true } ></ AgGridColumn>)
      }


  return (


      <AgGridReact rowData={rowData}>
              {columnsData}
      </AgGridReact>


  );
};

AgGrid.propTypes = {
  rowData: PropTypes.array,
  columnsData: PropTypes.object
};

AgGrid.defaultProps = {
  rowData: [],
  columnsData: []
};
export default AgGrid;