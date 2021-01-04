import React, { useEffect, useState, forwardRef } from 'react';
import Link from '@material-ui/core/Link';
import { listUser } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from "material-table";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


function ProductList(props) {
  const userList = useSelector(state => state.userList);
  const { loading, users, error } = userList;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser());
    return () => {
      //
    };
  }, []);

  const columns = [
    {field: '_id', title: 'User ID'},
    {field: 'name', title: 'Name'},
    {field: 'email', title: 'Email'},
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return loading ? <div>Loading...</div> :
    <div className="content content-margined">
        <div className="back-to-result">
            <Link href="../profile" style={{cursor:'pointer', textDecoration: 'none'}}> 
              <Grid container style={{width: '15rem'}}>
                <Grid item xs={2}><ArrowBackIcon/></Grid>
                <Grid item xs={10}>Back to profile</Grid>
              </Grid>
            </Link>
        </div>

        <MaterialTable
          icons={tableIcons}
          title={"User List"}
          columns={columns}
          data={users}
          options={{
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#FFF'
            }
          }}
        />
    </div>
}
export default ProductList;