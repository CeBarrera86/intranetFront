import DataTable from 'datatables.net-dt';

alert('DataTables loaded');

let table = new DataTable('#tablaSolicitudes', {
    paging: true,
    searching: true,
    info: true,
});