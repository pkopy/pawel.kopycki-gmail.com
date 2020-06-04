import React from 'react';
import Paper from '@material-ui/core/Paper';
import dict from '../dictionary'
import {Grid, Table, TableHeaderRow} from '@devexpress/dx-react-grid-material-ui';
import {createStyles, withStyles, WithStyles, Theme} from '@material-ui/core/styles';

const styles = (Theme) => createStyles({
    row: {

    }
});

const columns = [
    {name: 'type', title: 'Typ'},
    {name: 'name', title: 'Nazwa'},
    {name: 'state', title: 'Status'},
    {name: 'station', title: 'Stacja'},
    {name: 'level', title: 'Poziom'},
    {name: 'nextAction', title: 'Data następnej akcji'},
    {name: 'time', title: 'Przewidywany czas'},

];
const rows = [
    {type: 0, name: 'DevExtreme', state: 'DevExpress'},
    {type: 0, name: 'DevExtreme', state: 'DevExpress'},
    {type: 0, name: 'DevExtreme', state: 'DevExpress'},
    {type: 0, name: 'DevExtreme', state: 'DevExpress'},
    {type: 0, name: 'DevExtreme', state: 'DevExpress'},
    // {type: 1, product: 'DevExtreme Reactive', owner: 'DevExpress'},{type: 0, product: 'DevExtreme', owner: 'DevExpress'},
    // {type: 1, product: 'DevExtreme Reactive', owner: 'DevExpress'},{type: 0, product: 'DevExtreme', owner: 'DevExpress'},
    // {type: 1, product: 'DevExtreme Reactive', owner: 'DevExpress'},{type: 0, product: 'DevExtreme', owner: 'DevExpress'},
    // {type: 1, product: 'DevExtreme Reactive', owner: 'DevExpress'},
];

const TableRow = ({row, ...restProps}) => (
    <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => alert(JSON.stringify(row))}

        style={{
            cursor: 'pointer',
            height: '15px',
            padding: 0
        }}
    />
);



export default function OrdersDevExpress() {
    return (

        <Paper>
            <Grid

                rows={rows}
                columns={columns}
            >
                <Table rowComponent={TableRow}/>
                <TableHeaderRow/>
            </Grid>
        </Paper>
    )


}
