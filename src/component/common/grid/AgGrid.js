
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AgGrid = props => {
  const { rowData , columns} = props;
  let columnsData = [];

    for (const [index, value] of columns.entries()) {
        columnsData.push(<AgGridColumn field={value} sortable={ true } filter={ true } ></ AgGridColumn>)
      }


    // chartOptions.series = data;
    // chartOptions.title.text = options.title;
    // chartOptions.yAxis.title.text = options.yLabel;
    // chartOptions.legend.enabled = options.legendEnable;


  return (


      <AgGridReact rowData={rowData}>
              {columnsData}
      </AgGridReact>


  );
};
/*
LineChart.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
  id: PropTypes.string
};

LineChart.defaultProps = {
  data: [],
  options: {},
  id: ""
};*/
export default AgGrid;